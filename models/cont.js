var mongoose=require('mongoose');
var bcrypt=require('bcryptjs');
var mongoose=require('mongoose');
var mongo=require('mongodb');
var MongoClient = require('mongodb').MongoClient;

var permission=mongoose.connect('mongodb://localhost:27017/contact',{
    useMongoClient:true,
});


var UserSchema= mongoose.Schema({
    firstname:{
        type:String,
        index:true
    },
    lastname:{
        type:String
    },
    email:{
        type:String
    },
   
    phonenumber:{
        type:Number
    },
    message:{
        type:String
    }
});

var Contus=module.exports=mongoose.model('Contus',UserSchema);

module.exports.createUser=function(newUser,callback){
    newUser.save(callback);
 };