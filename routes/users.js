const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const User1 = require('../models/addcustomer');

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
  


  User1.createUser(newUser, (err, user1) => {
    if(err) {
      res.json({success: false, msg: 'Failed to add customer'});
    } else {
     
    

      res.json({success: true, msg: 'customer is added',
     
      user1: {
        id: user1._id,        
        customername: user1.customername,
        Devicename: user1.Devicename,
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









  router.get('/view_edit_customer', function(req,res){
    console.log('Get request for all videos');
    User1.find({})
    .exec(function(err,user1){
      if(err){
        console.log("error retrieving user1");
      } else{
        res.json(user1);
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
