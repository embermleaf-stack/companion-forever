// SPDX-License-Identifier: GPL-3.0-only
import { H2, P, Panel } from "../ui";
import { DISCLAIMER } from "../format";

export function AboutScreen() {
  return (
    <Panel padding={16}>
      <H2>About</H2>
      <P>{DISCLAIMER}</P>
      <P>All data stays on this device. There are no accounts, no ads, no analytics, and no network access.</P>
      <P>Free and open source (GPL-3.0-only).</P>
    </Panel>
  );
}
