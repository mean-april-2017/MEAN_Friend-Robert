console.log("///Friend.js (MODEL) file ready to go///")

var mongoose = require('mongoose');
var FriendSchema = mongoose.Schema({
  name: String,
  favoriteLanguage:String
});

mongoose.model('Friend', FriendSchema)
