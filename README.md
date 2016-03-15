#braintree-js - promisifies the braintree node.js SDK with extra helper utilities

##Setup

1. Run the following:
`npm install --save braintree-js`

2. instantiate the gateway, passing in a configuration object. In lieu of `braintree.Environment.Sandbox` or `braintree.Environment.Production`, just set the environment property on your configuration object to the string of the environment you want, like so:

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

Most methods take the same parameters as the current Node.js SDK methods, except for the callback. Instead, you can `.then` off of the gateway methods or `yield` them if you are using generators (or `await`, if you're transpiling ES7 down with babel).

Example:

```
var customer = { id: 'roondog', firstName: 'roonie' };
gateway.createCustomer(customer)
  .then(function(response) {
    // handle successful response...
  })
  .catch(function(error) {
    // handle rejection...
  })
```
#API

##Customers

###.createCustomer(user)

You can create a customer like so:

```
app.post('/createBraintreeUser', function(req, res) {
  gateway.createCustomer(req.body)
    .then(function(response) {
      res.json({user: response.customer});
    })
    .catch(function(error) {
      res.status(400).send({error: error});
    });
});
```

###.deleteCustomer(id)
Deletes the braintree user with the given id.

```
app.del('/deleteBraintreeUser', function(req, res) {
  var theID = req.body;
  gateway.deleteCustomer(theID)
    .then(response => {...})
    .catch(error => {...});
});
```

###.findCustomer(id)

Finds the braintree user with the given id. Resolves with the customer object (unlike most other methods which resolve with the http response from braintree).

```
app.get('/findBraintreeUser', function(req, res) {
  var theID = req.body;
  gateway.findCustomer(theID)
    .then(function(response) {
      res.json({firstName: response.firstName});
    })
    .catch(function(error) {
      res.status(400).json({error: error});
    });
})
```

