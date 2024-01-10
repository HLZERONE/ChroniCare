// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const deflaultConfig = getDefaultConfig(__dirname);
deflaultConfig.resolver.assetExts.push('cjs')

module.exports = deflaultConfig;
