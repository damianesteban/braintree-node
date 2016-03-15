'use strict';
const co = require('co');
const _ = require('lodash');
const assert = require('assert');
const config = require('./config');
const gateway = require('./')(config);

describe('braintree wrapper', function() {

  it('generates a clientToken', done => co(function*() {
    const response = yield gateway.generateClientToken();
    console.log(clientTokenResponse);
    assert.ok(response.success);
    assert.ok(_.isString(response.clientToken));
    done();
  }).catch(done));


});
