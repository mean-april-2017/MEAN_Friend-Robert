console.log("///Mongoose.js file ready to go///")
var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');

mongoose.connect('mongodb://localhost/friendsDB');
require('../models/friend.js')
