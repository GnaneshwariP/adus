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
    Deviceid:{
        type:String
    },
    amount:{
        type:String
   },
    paidamount:{
        type:String
    }
});

var User2=module.exports=mongoose.model('User2',UserSchema);

        
