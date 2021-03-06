const path = require('path');
module.exports = {
  plugins: [
    {
      plugin: require('craco-less'),
    },
  ],
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@store': path.resolve(__dirname, 'src/store/'),
      '@src': path.resolve(__dirname, 'src/'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.d.ts'],
  },
};
