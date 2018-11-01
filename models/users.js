var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    email:String,
    password:String,
    created_at:{type : Date,default : Date.now},
    updated_at:{type : Date,default : Date.now}},{strict: false});

  module.exports = mongoose.model('Users', UserSchema);
