var mongoose=require('mongoose');
var bcrypt=require('bcryptjs');
var mongoose=require('mongoose');

var UserSchema= mongoose.Schema({
    customername:{
      type:String,
      index:true
    },
    DeviceName:{
       type:String
        
    },
    DeviceId:{
        type:String
    },
    Dop:{
        type:String
    },
   totalamount:{
      type:String
    },
    balanceamount:{
      type:String
    },
     chargepd:{
      type:String
    }

});

var User1=module.exports=mongoose.model('User1',UserSchema);



module.exports.createUser=function(newUser,callback){
           newUser.save(callback);
        };

