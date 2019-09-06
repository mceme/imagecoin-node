'use strict';

var path = require('path');

/**
 * Will return the path and default axecore-node configuration on environment variables
 * or default locations.
 * @param {Object} options
 * @param {String} options.network - "testnet" or "livenet"
 * @param {String} options.datadir - Absolute path to Axe database directory
 */
function getDefaultBaseConfig(options) {
  if (!options) {
    options = {};
  }

  var datadir = options.datadir || path.resolve(process.env.HOME, '.imagecoin');

  return {
    path: process.cwd(),
    config: {
      network: options.network || 'livenet',
      port: 3003,
      services: ['ImageCoind', 'web'],
      servicesConfig: {
        ImageCoind: {
          spawn: {
            datadir: datadir,
            exec: path.resolve(__dirname, datadir, 'ImageCoind')
          }
        }
      }
    }
  };
}

module.exports = getDefaultBaseConfig;
