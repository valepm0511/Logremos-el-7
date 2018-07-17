global.window = global;
global.assert = require('chai').assert;
require('../src/js/controller');
require('./controller.spec.js');