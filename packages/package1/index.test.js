const assert = require('assert');
const getHead = require('./index');

assert.deepEqual(getHead(), '我来组成头部');
