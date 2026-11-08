// SPDX-License-Identifier: GPL-3.0-only
import { H2, P, Panel } from "../ui";
import { ArtImage } from "../ArtImage";
import { useWindowDimensions } from "react-native";
import { BLIZZARD_ATTRIBUTION, DISCLAIMER } from "../format";
import { FEATURE_BATTLENET } from "../config";

export function AboutScreen() {
  const { width } = useWindowDimensions();
  const heroW = Math.max(200, width - 32);
  return (
    <>
    <ArtImage art="aboutHero" width={heroW} height={Math.round((heroW * 3) / 8)} style={{ borderRadius: 8, marginBottom: 8 }} />
    <Panel padding={16}>
      <H2>About</H2>
      <P>{DISCLAIMER}</P>
      <P>All data stays on this device. There are no accounts, no ads, no analytics, and no network access.</P>
      {FEATURE_BATTLENET ? <P>{BLIZZARD_ATTRIBUTION}</P> : null}
      <P>Free and open source (GPL-3.0-only).</P>
    </Panel>
    </>
  );
}
