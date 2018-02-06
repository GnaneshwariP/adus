var mongoose=require('mongoose');
var bcrypt=require('bcryptjs');
var mongoose=require('mongoose');
var mongo=require('mongodb');
var MongoClient = require('mongodb').MongoClient;

var permission=mongoose.connect('mongodb://localhost:27017/contact',{
    useMongoClient:true,
});


var UserSchema= mongoose.Schema({
    transactionid:{
        type:String,
        index:true
    },
    date:{
        type:String
    },
    DeviceId:{
        type:String
    },
   
    paidamount:{
        type:Number
    }
});

var User2=module.exports=mongoose.model('User2',UserSchema);

module.exports.createUser=function(newUser,callback){
    newUser.save(callback);
 };

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


MongoClient.connect(url, function(err, db) {
if (err) throw err;
var dbo = db.db("contact");


});

