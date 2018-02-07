

var mongoose=require('mongoose');
var bcrypt=require('bcryptjs');
var mongoose=require('mongoose');
var mongo=require('mongodb');
var MongoClient = require('mongodb').MongoClient;

var permission=mongoose.connect('mongodb://localhost:27017/contact',{
    useMongoClient:true,
});
var url = "mongodb://localhost:27017/";



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
   totalamount:{
      type:Number
    },
    balanceamount:{
      type:Number
    },
     chargepd:{
      type:String
    }

});

var User1=module.exports=mongoose.model('User1',UserSchema);



module.exports.createUser=function(newUser,callback){
           newUser.save(callback);
        };

   //update the balance amount when paid
module.exports.update_doc=function(dev,pd_amt,callback){
  var query={DeviceId:dev}
              User1.update(query,{$inc:{balanceamount:-pd_amt}},callback);
}


//device name and their revenue
module.exports.device_sum=function(callback){
User1.aggregate([{$group:{"_id":"$DeviceName",sum:{$sum:{$subtract:["$totalamount","$balanceamount"]}}}}],callback);
}

//customername and payment
module.exports.cust_name=function(callback){
User1.aggregate([{$project:{"_id":"$customername","cid":"$customerid",sum1:{$sum:{$subtract:["$totalamount","$balanceamount"]}}}}],callback);
}





