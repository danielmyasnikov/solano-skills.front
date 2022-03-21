// TODO: temp

const path = require('path');

const resolvePath = (p) => path.resolve(__dirname, p);

module.exports = {
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      '@components': resolvePath('src/components/'),
      '@assets': resolvePath('src/assets/'),
      '@store': resolvePath('src/store/'),
      '@src': resolvePath('src/'),
    },
  },
};
