// SPDX-License-Identifier: GPL-3.0-only
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

// Let Metro see and transpile the workspace package @companion/core (TS source).
config.watchFolders = [workspaceRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

// packages/core uses NodeNext-style "./x.js" specifiers that point at "./x.ts".
// Retry relative ".js" imports without the extension so Metro finds the TS file.
const defaultResolve = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  const resolve = defaultResolve ?? context.resolveRequest;
  if (/^\.\.?\//.test(moduleName) && moduleName.endsWith(".js")) {
    try {
      return resolve(context, moduleName, platform);
    } catch {
      return resolve(context, moduleName.slice(0, -3), platform);
    }
  }
  return resolve(context, moduleName, platform);
};

module.exports = config;
