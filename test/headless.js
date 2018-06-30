global.window = global;
global.assert = require('chai').assert;
require('../src/js/main');
require('./socialnetwork.spec.js');