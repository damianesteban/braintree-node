#braintree-js - promisifies the braintree node.js SDK with extra helper utilities

#Setup

1. Run the following:
`npm install --save braintree-js`

2. instantiate the gateway, passing in a configuration object. In lieu of `braintree.Environment.Production` or `braintree.Environment.Production`, just set the environment property on your configuration object to the string of the environment you want, like so:

```
var config = {
  environment: 'Environment',
  publicKey: yourPublicKey,
  privateKey: yourPrivateKey,
  merchantId: yourMerchantId
};
var gateway = require('braintree-js')(config);

gateway.createCustomer(...)
```
##Customers

