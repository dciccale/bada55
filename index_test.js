'use strict';

const assert = require('assert');
const bada55 = require('./');

// Test valid hex color with a length of 6
assert.ok(/^[0-9A-F]{6}$/i.test(bada55().hex));
console.log('Passed ✔\n');

// Test valid hex color with a length of 3
assert.ok(/^[0-9A-F]{3}$/i.test(bada55({length: 3}).hex));
console.log('Passed ✔');
