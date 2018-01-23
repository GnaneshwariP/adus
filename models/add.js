var mongoose=require('mongoose');
var bcrypt=require('bcryptjs');
var mongoose=require('mongoose');
var mongo=require('mongodb');
var MongoClient = require('mongodb').MongoClient;

var permission=mongoose.connect('mongodb://localhost:27017/contact',{
    useMongoClient:true,
});
var url = "mongodb://localhost:27017/";




MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("contact");
   var myobj = [
    
    { devicename: 'abc', amount: '10000', emi:'2000'},
    { devicename: 'def', amount: '15000', emi:'3000'},
    { devicename: 'ijk', amount: '20000', emi:'4000'},
    { devicename: 'xyz', amount: '10000', emi:'2000'},
    { devicename: 'pqr', amount: '15000', emi:'3000'},
    { devicename: 'mno', amount: '10000', emi:'4000'},


   
  ];
  dbo.collection("pre").insertMany(myobj, function(err, res) {
    //if (err) throw err;
    //console.log("Number of documents inserted: " );
    db.close();
  });
});




var UserSchema= mongoose.Schema({
    customername:{
      type:String,
      index:true
    },
    customerid:{
      type:String
    },
    DeviceName:{
       type:String,
        index:true
    },
    DeviceId:{
        type:String
    },
    Dop:{
        type:String
    },
    balance:{
      type:String
    },
    emi:{
      type:String
    }

});

var User1=module.exports=mongoose.model('User1',UserSchema);



module.exports.createUser=function(newUser,callback){
           newUser.save(callback);
        };

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("contact");
  
  var result= dbo.collection("user1").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});



