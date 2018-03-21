var mongoose=require('mongoose');
var bcrypt=require('bcryptjs');
var mongoose=require('mongoose');
var UserSchema= mongoose.Schema({
     username:{
        type:String,
        index:true
    },
    password:{
        type:String
    },
    email:{
        type:String
    },
    name:{
        type:String
    },
    security:{
       type:String
    },
    answer:{
        type:String
    },
    newpassword:{
      type:String
    }

});

var User=module.exports=mongoose.model('User',UserSchema);
module.exports.addUser=function(newUser,callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
           newUser.password=hash;
           newUser.save(callback);
        });
    });

}
module.exports.getUserByUsername=function(username,callback){
    var query={username:username};
    User.findOne(query,callback);
}
module.exports.getUserById=function(id,callback){
    User.findById(id,callback);
}

module.exports.comparePassword=function(candidatePassword,hash,callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if(err) throw err;
        callback(null,isMatch);

    });
}


module.exports.createUser1=function(newUser1,callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser1.newpassword, salt, function(err, hash) {
           newUser1.newpassword=hash;
           newUser1.save(callback);
        });
    });

}






module.exports.changepassword=function(username,newpassword,callback){
  var query={username:username}
              User.update(query,{ $set: {password:newpassword } },callback);
}
