const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const User1 = require('../models/addcustomer');
const Contus = require('../models/contactus');
var aesjs = require('aes-js');

var crc32 = require('crc32');

var converter = require('hex2dec');
var fnv = require('fnv-plus');

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


  //contactus storing data
  router.post('/contactus', (req, res, next) => {
    let newUser = new Contus ({
       firstname: req.body.firstname,
      lastame: req.body.lastame,
       email: req.body.email,
       phonenumber: req.body.phonenumber,
       message: req.body.message

    });


    Contus.createUser1(newUser, (err, contus) => {
      if(err) {
        res.json({success: false, msg: 'Failed to add customer'});
      } else {


        res.json({success: true, msg: 'your request is sent',

        contus: {
          id: contus._id,
          firstname: contus.firstname,
          lastname: contus.lastname,
          email: contus.email,
          phonenumber: contus.phonenumber,
          message: contus.message

        }
      });
    }
    });

    });


router.get('/generate_access_code',(req,res,next) => {
  User1.find(function(err,tasks){
    if(err){
      res.send(err);
    }
    res.json(tasks);
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

router.get('/aes',function(req,res){
  // An example 128-bit key (16 bytes * 8 bits/byte = 128 bits)
  var key = [ 18, 22, 35, 45, 55, 65, 75, 85, 96, 10, 11, 12, 13, 14, 15, 16 ];
var DeviceId = "abc";
var duration = "034";
var counter = 3;


  // Convert text to bytes
  var text = DeviceId+duration+counter;
  var textBytes = aesjs.utils.utf8.toBytes(text);
  console.log(text);

  // The counter is optional, and if omitted will begin at 1
  var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  var encryptedBytes = aesCtr.encrypt(textBytes);

  // To print or store the binary data, you may convert it to hex
  var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
  console.log(encryptedHex);
  var h=crc32(encryptedHex);
  console.log(h);
  var hex = converter.hexToDec(h);
  console.log(hex);
  var n = hex.toString();

  var Hd = n.concat(duration);
  console.log(Hd);
    var z =[];
  for(i=0;i<Hd.length;i++)
  {
    var res=Hd.charAt(i);
    console.log(res);
    var nn=Number(res);
    var a = Math.pow(nn,7);
    var x= a%10;
    var y = x.toString();

    z.push(y);
    }

    var gna = "";
  for(j=0;j<z.length;j++)
  {
    gna += z[j]+ "";
  }
console.log(gna);


astring = 'abc034fogpirewncvoehfoiwehufdiewlncdiewxewqr4r543t45teq1qaazsxc3';
  ahash32 = fnv.hash(astring);
  tomo = ahash32.dec();
console.log(tomo);
});




module.exports = router;
