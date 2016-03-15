'use strict';
const braintree = require('braintree');
/**
 * Module returns an instance of the braintree gateway
 * @param {config} config, must contain the environment,
 *   merchantId, publicKey, and privateKey
 * @return {gateway}
 */
module.exports = function(config) {
  // handle no config
  if (!config) {
    throw new Error('You must pass in a configuration object to instantiate the braintree gateway');
  }
  if (!config.environment) {
    throw new Error(`Configuration object requires environment`);
  }
  if (!config.merchantId) {
    throw new Error(`Configuration object requires merchantId`);
  }
  if (!config.publicKey) {
    throw new Error(`Configuration object requires publicKey`);
  }
  if (!config.privateKey) {
    throw new Error(`Configuration object requires privateKey`);
  }

  /*
  ----------------------------------------------------------------
  */

  config.environment = braintree.Environment[handleEnv(config.environment)];
  // instantiate gateway object with configuration
  const gateway = braintree.connect(config);
  gateway.generateClientToken = function() {
    return new Promise((resolve, reject) => {
      this.clientToken.generate({}, function(error, result) {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  };

  function handleEnv(environment) {
    return environment[0].toUpperCase() + environment.slice(1).toLowerCase();
  }

  return gateway;
};
