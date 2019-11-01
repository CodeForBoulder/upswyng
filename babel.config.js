module.exports = function(api) {
  api.cache(true);
  return {
    // Disabling now because it's interfering with the Sapper build
    // presets: ['babel-preset-expo'],
  };
};
