var mongoose=require('mongoose');
var bcrypt=require('bcryptjs');
var mongoose=require('mongoose');


var UserSchema = mongoose.Schema({
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

module.exports.createUser1=function(newUser,callback){
    newUser.save(callback);
 };