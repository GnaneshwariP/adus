

const express  = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');


//connect to database
mongoose.connect(config.database);

//on connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database'+config.database);
});

//on error
mongoose.connection.on('error', (err) => {
  console.log('Database error'+err);
});

const app = express();

const users = require('./routes/users');

//Port number
const port = 4000;

//CORS Middleware
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));



//Body Parser Middleware
app.use(bodyParser.json());



// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

//passport Middleware
app.use(passport.initialize());
app.use(passport.session());


app.get('/login', (req, res) => {
  res.send('login');
});


//index route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

//start server
app.listen(port, () => {
  console.log('Server started on port '+port);
});


/* old app.js non angular
var express=require('express');
var path=require('path');
var cookieParser=require('cookie-parser');
var bodyParser=require('body-parser');
var exphbs=require('express-handlebars');
var expressValidator=require('express-validator');
var flash=require('connect-flash');
var session=require('express-session');
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;
const config = require('./config/database');
var mongoose=require('mongoose');


mongoose.connection.on('connected', () => {
    console.log('Connected to Database '+config.database);
  });
  // On Error
  mongoose.connection.on('error', (err) => {
    console.log('Database error '+err);
  });

var jwt=require('jsonwebtoken');


var db=mongoose.connection;


var routes=require('./routes/index');
var users=require('./routes/users');
var pay=require('./routes/pay');

var app=express();

app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',exphbs({defaultLayout:'layout'}));
app.set('view engine','handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname,'public')));

app.use(session({
    secret:'secret',
    saveUninitialized:true,
    resave:true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(expressValidator({
    errorFormatter:function(param,msg,value){
        var namespace=param.split('.')
        ,root=namespace.shift()
        ,formParam=root;
        while(namespace.length)
        {
            formParam+='['+namespace.shift()+']';

        }
        return{
            param:formParam,
            msg:msg,
            value:value
        };

    }
}));





app.use(flash());

app.use(function(req,res,next)
{
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error=req.flash('error');
    res.locals.user=req.user||null;
    res.locals.add=req.add||null;
    next();
});
app.use('/',routes);
app.use('/users',users);

app.set('port',(process.env.PORT||3000));
app.listen(app.get('port'),function(){
    console.log('server started on port '+app.get('port'));
});

*/