// SPDX-License-Identifier: GPL-3.0-only
import { View } from "react-native";
import { H2, P } from "../ui";
import { DISCLAIMER } from "../format";

export function AboutScreen() {
  return (
    <View>
      <H2>About</H2>
      <P>{DISCLAIMER}</P>
      <P>All data stays on this device. There are no accounts, no ads, no analytics, and no network access.</P>
      <P>Free and open source (GPL-3.0-only).</P>
    </View>
  );
}
