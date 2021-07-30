const assert = require('assert');
const getBody = require('./index');

assert.deepEqual(getBody(), '我来组成身体');
