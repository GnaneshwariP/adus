var express=require('express');
var exec=require('exec');
var router=express.Router();
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;
var User=require('../models/user');
var User1=require('../models/add');
var User2=require('../models/payhis');
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
//to show the past payments
router.get('/payment',ensureAuthenticated, function(req,res,next){
  User2.find(function(err,docs){
    
   res.render('payment',{
    title:'Payment history',
    published:true,
    newUser:docs
   });
    });
});



router.get('/profile',ensureAuthenticated,function(req,res)
{
    res.render('profile');
});

//router for report
router.get('/report',ensureAuthenticated,function(req,res)
{
  User1.device_sum(function(err,user3){
    if(err) throw err;
    User1.cust_name(function(err,result){
      if(err) throw err;

console.log(result);
    var n1 = user3;
console.log(n1);
res.render('report',{
  sum:n1,
  cust:result
});
  });
});

});


//retreive the amount paid and update it in balance
router.post('/otp',function(req,res){

var dt = datetime.create();
var my_date = dt.format('m-d-Y');
var paidamount=req.body.paidamount;
  var p1=req.body.dev1;
  console.log(p1);
  console.log(paidamount);

  var newUser=new User2({
    paidamount:paidamount,
    DeviceId:p1,
    date:my_date
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
        nod:num_of_days
    });
});

});



//retreive the selected device
router.post('/pay',function(req,res)
{
var selected1 = req.body.payment;
   
   console.log(selected1);
  
  User1.find({DeviceId:selected1},function(err,docs){
  
res.render('pay',{
    content: 'CURRENT DEVICE LIST',
    published: true,
    newUser:docs
    });
console.log(docs);
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
    content: 'CURRENT DEVICE LIST',
    published: true,
    newUser:deviceChunks
    });
    });
});

//register
router.post('/register',function(req,res)
{
   var name=req.body.name;
   var email=req.body.email;
   var username=req.body.username;
   var password=req.body.password;
   var password2=req.body.password2;
   
req.checkBody('name','name is req').notEmpty();
req.checkBody('email','email is req').notEmpty();
req.checkBody('email','email is not valid').isEmail();
req.checkBody('username','username req').notEmpty();
req.checkBody('password','pwd is req').notEmpty();
req.checkBody('password2','pwd dosnt match').equals(req.body.password);
var errors=req.validationErrors();
if(errors)
{
res.render('register',{
    errors:errors
});
    
}
else
{
    var newUser=new User({
        name:name,
        email:email,
        username:username,
        password:password
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

//add device
router.post('/add_device',function(req,res)
{
  var customername=req.body.customername;
   var customerid=req.body.customerid;
   var DeviceName=req.body.DeviceName;
   var DeviceId=req.body.DeviceId;
   var Dop=req.body.Dop;
 var totalamount=req.body.totalamount;
   var balanceamount=req.body.balanceamount;
   var chargepd=req.body.chargepd;
 
req.checkBody('customername','customername is req').notEmpty();
req.checkBody('customerid','customerid dosnt match').notEmpty();  
req.checkBody('DeviceName','name is req').notEmpty();
req.checkBody('DeviceId','id is req').notEmpty();
req.checkBody('Dop','dop is req').notEmpty();
req.checkBody('totalamount','amount is req').notEmpty();
req.checkBody('balanceamount','balanceamount is req').notEmpty();
req.checkBody('chargepd','chargepd is req').notEmpty();

var errors=req.validationErrors();
if(errors)
{
res.render('add_device',{
    errors:errors
});
    
}
else
{
    var newUser=new User1({
        customername:customername,
        customerid:customerid,
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

  
module.exports=router;
