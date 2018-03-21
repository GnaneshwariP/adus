// new angular routes
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

// angular register
router.post('/register', (req, res, next) => {
  let newUser = new User ({
    name: req.body.name,
   username: req.body.username,
   email: req.body.email,
    password: req.body.password,
    password2: req.body.password2,
    security: req.body.security,
    answer:req.body.answer
  });

  User.addUser(newUser, (err, user) => {
    if(err) {
      res.json({success: false, msg: 'Failed to register user'});
    } else {
      res.json({success: true, msg: 'User registered'});
    }
  });
});



// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user) {
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch) {
        const token = jwt.sign({ data: user }, config.secret, {
          expiresIn: 604800 // 1 week
        });
        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            security:user.security,
            answer:user.answer
          }
        })
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});



router.post('/add_customer', (req, res, next) => {
  let newUser = new User1 ({
     customername: req.body.customername,
     DeviceName: req.body.DeviceName,
     DeviceId: req.body.DeviceId,
     Dop: req.body.Dop,
    totalamount: req.body.totalamount,
    balanceamount: req.body.balanceamount,
    chargepd: req.body.chargepd
  });

  User.addUser1(newUser, (err, user1) => {
    if(err) {
      res.json({success: false, msg: 'Failed to add customer'});
    } else {
      res.json({success: true, msg: 'customer is added',
      token: 'JWT '+token,
      user1: {
        id: user._id,
        
        customername: user1.customername,
        Devicename: user1.Devicenamename,
        DeviceId: user1.DeviceId,
        Dop: user1.Dop,
        totalamount: user1.totalamount,
        balanceamount: user1.balanceamount,
        chargepd: user1.chargepd
      }
    });
    }
  });
});




//login
router.get('/login', (req, res, next) => {
  res.send('login');
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});


module.exports = router;

























/*


//old routes non angular
var express=require('express');
var exec=require('exec');
var router=express.Router();
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;
var User=require('../models/user');
var User1=require('../models/add');
var User2=require('../models/payhis');
var Contus=require('../models/cont');
var datetime=require('node-datetime');

router.get('/register',function(req,res)
{
    res.render('register');
});
router.get('/aboutus',function(req,res)
{
    res.render('aboutus');
});
router.get('/contactus',function(req,res)
{
    res.render('contactus');
});
router.get('/forgot',function(req,res)
{
    res.render('forgot');
});

router.get('/forgot1',function(req,res)
{
    res.render('forgot1');
});

router.get('/forgot2',function(req,res)
{
    res.render('forgot2');
});

//to get security question
router.post('/forgot1',function(req,res)
{

  var username=req.body.username;

  User.findOne({username:username},function(err,docs){
  //  console.log(username);
  if(docs){
      var question=docs.security;

      res.render('forgot1',{
        question:question,
        user_name:username
      });
    }
    else{
      req.flash('error_msg',"Username not found");
      res.redirect('/users/forgot');
    }
  });


});
router.post('/forgot2',function(req,res)
{
    //var question = "hello";
    var answer=req.body.answer;
    var a1=req.body.ans;
  console.log(a1);

    req.checkBody('answer','Answer is required').notEmpty();
    var errors=req.validationErrors();
  //  if(errors)
    //{

        User.findOne({username:a1},function(err,docs){
          var answer1=docs.answer;
        //  console.log(answer1);
          var q1=docs.security;
          //console.log(q1);
          if(answer1==answer){
            res.render('forgot2',{
              user_name:a1
            });
          }
          else{

            req.flash('error_msg',"Answer is not matched");
            res.redirect('/users/forgot');


          }
        });
// }

});

router.post('/pwdch',function(req,res){
  var newpassword=req.body.newpassword;
  var confirmpassword=req.body.confirmpassword;
  var u=req.body.pwd;
  console.log(u);
  console.log(newpassword);
  req.checkBody('newpassword','password is required').notEmpty();
  req.checkBody('confirmpassword','password is not matched').equals(req.body.newpassword);
 var errors=req.validationErrors();
  if(errors)
  {
  res.render('forgot2',{
      errors:errors
  });

  }
  else
  {
      var newUser1=new User({
          username:u,
          password:newpassword

      });
  User.createUser(newUser1,function(err,user)
  {
      if(err) throw err;
      console.log(user.password);
      User.changepassword(u,user.password,function(err,user){
          if(err) throw err;
          console.log(user);
       });

  });
  req.flash('success_msg',"password is changed");
  res.redirect('/users/login');
}
});


/*router.post('/changepwd',
  passport.authenticate('local',{successRedirect:'/',failureRedirect:'/users/changepwd',failureFlash:true}),
  function(req, res) {
    res.redirect('/');
  });

router.get('/changepwd',function(req,res){
res.render('changepwd');
});


router.get('/changedp',function(req,res){
res.render('changedp');
});


router.get('/register',function(req,res)
{
    res.render('register');
});
router.get('/aboutus',function(req,res)
{
    res.render('aboutus');
});
router.get('/contactus',function(req,res)
{
    res.render('contactus');
});



//to show the past payments
router.get('/payment',ensureAuthenticated, function(req,res,next){
  User2.find(function(err,docs){

   res.render('payment',{

    published:true,
    newUser:docs
   });
    });
});



router.get('/profile',ensureAuthenticated,function(req,res)
{
    res.render('profile');
});

//retreive the amount paid and update it in balance
router.post('/otp',function(req,res){

var dt = datetime.create();
var my_date = dt.format('m-d-Y I:M:S p');
var paidamount=req.body.paidamount;
var p1=req.body.dev1;

req.checkBody('paidamount','Paidamount is required').notEmpty();
var errors=req.validationErrors();
if(errors)
{
    User1.find({DeviceId:p1},function(err,docs){
        res.render('pay',{
            errors:errors,
            published:true,
            newUser:docs
        });
    });


}
else{

    var val = Math.floor(100000000000000 + Math.random() * 900000000000000);


  var newUser=new User2({
    paidamount:paidamount,
    DeviceId:p1,
    date:my_date,
    otp:val
  });
  User2.createUser(newUser,function(err,user)
  {
    if(err) throw err;

  });

  //update the balance amount when paid
 User1.update_doc(p1,paidamount,function(err,user1){
    if(err) throw err;

});

User1.findOne({DeviceId:p1},function(err,docs){
    var num_of_days=(paidamount)/(docs.chargepd);
    res.render('otp',{
        nod:num_of_days,
        otp:val
    });
});

}

});


//route for report
router.get('/report',ensureAuthenticated,function(req,res)
{

    User1.cust_name(function(err,result){
      if(err) throw err;


res.render('report',{

  cust:result
});
  });
});


router.get('/report1',ensureAuthenticated,function(req,res)
{
  User1.device_sum(function(err,user3){
    if(err) throw err;



    var n1 = user3;

res.render('report1',{
  sum:n1
});
  });
});







//retreive the selected device
router.post('/pay',function(req,res)
{
var selected1 = req.body.payment;




  User1.find({DeviceId:selected1},function(err,docs){

res.render('pay',{

    published: true,
    newUser:docs
    });

    });



});





// add customer page
router.get('/add_device',ensureAuthenticated,function(req,res)
{
    res.render('add_device');
});



router.get('/login',function(req,res)
{
    res.render('login');
});



router.get('/currentdevice',ensureAuthenticated, function(req,res){
  User1.find(function(err,docs){
  var deviceChunks = [];
  chunkSize = 3;
  for(var i = 0; i<docs.length; i+=chunkSize)
{
  deviceChunks.push(docs.slice(i,i+chunkSize));
}
res.render('currentdevice',{

    published: true,
    newUser:deviceChunks
    });
    });
});
//
router.get('/error',function(req,res){
    res.render('error');
});
//register
router.post('/register',function(req,res)
{
   var name=req.body.name;
   var email=req.body.email;
   var username=req.body.username;
   var password=req.body.password;
   var password2=req.body.password2;
   var security=req.body.security;
   var answer=req.body.answer;

req.checkBody('name','name is required').notEmpty();
req.checkBody('email','email is required').notEmpty();
req.checkBody('email','email is not valid').isEmail();
req.checkBody('username','username required').notEmpty();
req.checkBody('password','password is required').notEmpty();
req.checkBody('password2','password dose not match').equals(req.body.password);
req.checkBody('security','security question is required').notEmpty();
req.checkBody('answer','answer is required').notEmpty();

var errors=req.validationErrors();
if(errors)
{
res.render('register',{
    errors:errors
});

}
else
{

        User.findOne({username:req.body.username},function(err,docs){
            if(docs){
                req.flash('error_msg',"user name already exists");
                res.redirect('/users/register');
            }


else
{
    var newUser=new User({
        name:name,
        email:email,
        username:username,
        password:password,

        security:security,
        answer:answer

    });

    User.createUser(newUser,function(err,user)
{
    if(err) throw err;
    console.log(user);
});

req.flash('success_msg',"reg n can login");
res.redirect('/users/login');
}
});
}

});
passport.use(new LocalStrategy(
    function(username, password, done) {
    User.getUserByUsername(username,function(err,user)  {
if(err) throw err;
if(!user)
{
    return done(null,false,{message:'unknown user'});
}
User.comparePassword(password,user.password,function(err,isMatch){
    if(err) throw err;
    if(isMatch){
        return done(null,user);
    }
    else
    {
        return done(null,false,{message:'invalid password'});
    }
});
    });
    }));
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });

      passport.deserializeUser(function(id, done) {
        User.getUserById(id, function(err, user) {
          done(err, user);
        });
      });


router.post('/login',
  passport.authenticate('local',{successRedirect:'/',failureRedirect:'/users/login',failureFlash:true}),
  function(req, res) {
    res.redirect('/');
  });
  router.get('/logout',function(req,res){
      req.logout();
      req.flash('success_msg','you have logged out');
      res.redirect('/users/login');

  });


  router.post('/changepwd',passport.authenticate('local',{successRedirect:'/users/changedp',failureRedirect:'/users/changepwd',failureFlash:true}),function(req,res)
  {

     res.redirect('/');

  });

  router.post('/changedp',function(req,res){

    var newpassword=req.body.newpassword;
    var confirmpassword=req.body.confirmpassword;
    var u=req.user.username;
 console.log(u);

  req.checkBody('newpassword','New password is required').notEmpty();
  req.checkBody('confirmpassword','Confirm password is not matched').equals(req.body.newpassword);
  var errors=req.validationErrors();
   if(errors)
   {
   res.render('changedp',{
       errors:errors
   });

   }
   else
   {
       var newUser1=new User({
           username:u,
           password:newpassword

       });
   User.createUser(newUser1,function(err,user)
   {
       if(err) throw err;
       console.log(user.password);
       User.changepassword(u,user.password,function(err,user){
           if(err) throw err;
           console.log(user);
        });

   });
   req.flash('success_msg',"password is changed");
   res.redirect('/');
 }







});



//add device
router.post('/add_device',function(req,res)
{
  var customername=req.body.customername;

   var DeviceName=req.body.DeviceName;
   var DeviceId=req.body.DeviceId;
   var Dop=req.body.Dop;
 var totalamount=req.body.totalamount;
   var balanceamount=req.body.balanceamount;
   var chargepd=req.body.chargepd;

req.checkBody('customername','customername is required').notEmpty();
req.checkBody('DeviceName','name is required').notEmpty();
req.checkBody('DeviceId','id is required').notEmpty();
req.checkBody('DeviceId','Enter a valid number').isNumeric();
req.checkBody('Dop','Date of purchase is required').notEmpty();
req.checkBody('totalamount','amount is required').notEmpty();
req.checkBody('balanceamount','balanceamount should match with total amount').equals(req.body.totalamount);
req.checkBody('chargepd','charge per day is required').notEmpty();

var errors=req.validationErrors();
if(errors)
{
res.render('add_device',{
    errors:errors
});

}
else
{

    User1.findOne({DeviceId:DeviceId},function(err,docs){
        if(docs){
            console.log(DeviceId);
            req.flash('error_msg',"Device Id already registered");
            res.redirect('/users/add_device');
        }
        else
        {

    var newUser=new User1({
        customername:customername,
        DeviceName:DeviceName,
        DeviceId:DeviceId,
        Dop:Dop,
        totalamount:totalamount,
        balanceamount:balanceamount,
        chargepd:chargepd
    });
    User1.createUser(newUser,function(err,user1)
{
    if(err) throw err;
    console.log(user1);
});
req.flash('success_msg',"device added");
res.redirect('/users/add_device');
}
});
}
});


router.post('/contactus',function(req,res)
{
  var firstname=req.body.firstname;
   var lastname=req.body.lastname;
   var email=req.body.email;
   var phonenumber=req.body.phonenumber;
   var message=req.body.message;
req.checkBody('firstname','firstname is req').notEmpty();
req.checkBody('email','email is required').notEmpty();
req.checkBody('email','invalid email').isEmail();
req.checkBody('phonenumber','phonenumber is req').notEmpty();
req.checkBody('message','enter the message').notEmpty();

var errors=req.validationErrors();
if(errors)
{
res.render('contactus',{
    errors:errors
});

}
else
{
    var newUser=new Contus({
        firstname:firstname,
        lastname:lastname,
        email:email,
        phonenumber:phonenumber,
        message:message

    });
    Contus.createUser(newUser,function(err,contus)
{
    if(err) throw err;
    console.log(contus);
});
req.flash('success_msg',"Your request is sent");
res.redirect('/users/contactus');
}
});

function ensureAuthenticated(req,res,next){
    if(req.isAuthenticated())
    {
        return next();
    }
    else
    {
        //req.flash('error_msg','you are not logged in');
        res.redirect('/users/login');
    }
}
module.exports=router;*/

