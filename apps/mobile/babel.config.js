// SPDX-License-Identifier: GPL-3.0-only
module.exports = function (api) {
  api.cache(true);
  return { presets: ["babel-preset-expo"] };
};
