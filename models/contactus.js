var mongoose=require('mongoose');
var bcrypt=require('bcryptjs');
var mongoose=require('mongoose');


var UserSchema = mongoose.Schema({
   DeviceId:{
        type:String,
        index:true
    },
    device_name:{
        type:String
    },
    AgentUsername:{
        type:String
    },
    message:{
        type:String
    }
});

var Contus=module.exports=mongoose.model('Contus',UserSchema);

module.exports.createUser1=function(newUser,callback){
    newUser.save(callback);
 };
