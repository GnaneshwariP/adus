var express=require('express');
var exec=require('exec');
var router=express.Router();
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;
var User=require('../models/user');
var User1=require('../models/add');
var User2=require('../models/payhis');
var datetime = require('node-datetime');

router.get('/',ensureAuthenticated,function(req,res)
{
  User1.find().count(function(err,docs){
    if(err) throw err;
    res.render('index',{
      num_of_cust:docs
    });
  });

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
