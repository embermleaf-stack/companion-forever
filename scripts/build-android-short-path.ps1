# SPDX-License-Identifier: GPL-3.0-only
<#
.SYNOPSIS
  Build a release APK from a short-path copy of the repo (Windows MAX_PATH / CMake limits), optionally install it.
.DESCRIPTION
  Syncs the repo to C:\cfb (excluding .git, node_modules, android/, icons-and-imagery/staging), runs
  `npx expo prebuild --platform android` there if apps/mobile/android is missing, makes sure
  externalNativeBuild.cmake.buildStagingDirectory points at C:/b, runs `gradlew assembleRelease` for one ABI and
  copies the APK to icons-and-imagery/staging/ (git-ignored).
  -InstallSerial only runs `adb -s <serial> install -r <apk>`. The script NEVER launches the app.
.PARAMETER Abi
  arm64-v8a (physical phones) or x86_64 (emulator). Default x86_64.
.PARAMETER InstallSerial
  Optional adb serial (e.g. emulator-5554 or 192.168.1.144:42549). Installs only; never starts the app.
.PARAMETER ShortRoot
  Short build root. Default C:\cfb.
#>
param(
  [ValidateSet("arm64-v8a", "x86_64")][string]$Abi = "x86_64",
  [string]$InstallSerial = "",
  [string]$ShortRoot = "C:\cfb"
)
$ErrorActionPreference = "Stop"
$repo = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$app = Join-Path $ShortRoot "apps\mobile"
$android = Join-Path $app "android"

$env:JAVA_HOME = "C:\Program Files\Microsoft\jdk-21.0.12.101-hotspot"
$env:ANDROID_HOME = Join-Path $env:LOCALAPPDATA "Android\Sdk"
$env:CI = "0"
$env:Path = "$env:JAVA_HOME\bin;$env:ANDROID_HOME\platform-tools;$env:Path"

Write-Host "== Sync $repo -> $ShortRoot"
New-Item -ItemType Directory -Force $ShortRoot | Out-Null
# /MIR purges files not in source, but never inside excluded directories (so android/ and node_modules survive).
robocopy $repo $ShortRoot /MIR /XD .git node_modules android staging build dist .gradle .expo /XF *.apk *.log /R:2 /W:1 /NFL /NDL /NJH /NJS /NP | Out-Null
if ($LASTEXITCODE -ge 8) { throw "robocopy failed ($LASTEXITCODE)" }
# robocopy excludes `staging` by name only; also keep icons-and-imagery/staging out of the copy.
$stagingCopy = Join-Path $ShortRoot "icons-and-imagery\staging"
if (Test-Path $stagingCopy) { Remove-Item -Recurse -Force $stagingCopy }

# Install deps when node_modules is missing or package-lock.json changed since the last install here.
$lock = Join-Path $ShortRoot "package-lock.json"
$stamp = Join-Path $ShortRoot "node_modules\.cfb-lock-hash"
$hash = (Get-FileHash $lock).Hash
if (-not (Test-Path $stamp) -or (Get-Content $stamp) -ne $hash) {
  Write-Host "== npm install in $ShortRoot (node_modules missing or lockfile changed)"
  # Gradle daemons lock files under node_modules (EBUSY); stop them first.
  if (Test-Path (Join-Path $android "gradlew.bat")) { Push-Location $android; .\gradlew.bat --stop | Out-Null; Pop-Location }
  Push-Location $ShortRoot; npm install --no-audit --no-fund; if ($LASTEXITCODE) { throw "npm install failed" }; Pop-Location
  Set-Content $stamp $hash
}

# Regenerate android/ when app.json changed (scheme/intent filters, plugins, allowBackup live in the
# generated manifest; a stale android/ silently ships without them, e.g. no companionforever:// filter).
$cfgStamp = Join-Path $ShortRoot "node_modules\.cfb-appjson-hash"
$cfgHash = (Get-FileHash (Join-Path $app "app.json")).Hash
if ((Test-Path $android) -and ((-not (Test-Path $cfgStamp)) -or (Get-Content $cfgStamp) -ne $cfgHash)) {
  Write-Host "== app.json changed since last prebuild; regenerating android/"
  if (Test-Path (Join-Path $android "gradlew.bat")) { Push-Location $android; .\gradlew.bat --stop | Out-Null; Pop-Location }
  Remove-Item -Recurse -Force $android
}
if (-not (Test-Path $android)) {
  Write-Host "== expo prebuild (android/ missing)"
  Push-Location $app; npx expo prebuild --platform android; if ($LASTEXITCODE) { throw "expo prebuild failed" }; Pop-Location
  Set-Content $cfgStamp $cfgHash
}

# app.json userInterfaceStyle is "automatic" (follow the system light/dark setting); keep an already-prebuilt android/ in sync.
$uiStr = Join-Path $android "app\src\main\res\values\strings.xml"
if (Test-Path $uiStr) {
  $t = Get-Content -Raw $uiStr
  $n = $t -replace '(name="expo_system_ui_user_interface_style"[^>]*>)[^<]*', '${1}automatic'
  if ($n -ne $t) { Set-Content -NoNewline -Encoding UTF8 $uiStr $n }
}

$gradle = Join-Path $android "app\build.gradle"
$text = Get-Content -Raw $gradle
if ($text -notmatch "buildStagingDirectory") {
  Write-Host "== adding externalNativeBuild cmake buildStagingDirectory = C:/b"
  $block = "`r`n    externalNativeBuild {`r`n        cmake {`r`n            buildStagingDirectory = file(`"C:/b`")`r`n        }`r`n    }`r`n"
  # Insert inside the top-level `android {` block, right after its opening line.
  $text = [regex]::Replace($text, "(?m)^android\s*\{\s*\r?\n", { param($m) $m.Value + $block }, 1)
  if ($text -notmatch "buildStagingDirectory") { throw "could not patch $gradle; add the block manually" }
  Set-Content -NoNewline -Encoding UTF8 $gradle $text
}

Write-Host "== gradlew assembleRelease ($Abi)"
Push-Location $android
.\gradlew.bat assembleRelease "-PreactNativeArchitectures=$Abi" --no-parallel
$rc = $LASTEXITCODE
Pop-Location
if ($rc) { throw "gradle failed ($rc)" }

$apk = Join-Path $android "app\build\outputs\apk\release\app-release.apk"
$stage = Join-Path $repo "icons-and-imagery\staging"
New-Item -ItemType Directory -Force $stage | Out-Null
$out = Join-Path $stage "companion-forever-$Abi-release.apk"
Copy-Item -Force $apk $out
Write-Host "== APK: $out"

if ($InstallSerial) {
  Write-Host "== adb -s $InstallSerial install -r (install only; app is NOT launched)"
  adb -s $InstallSerial install -r $out
  if ($LASTEXITCODE) { throw "adb install failed" }
}
