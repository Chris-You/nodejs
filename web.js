
var bodyparser = require("body-parser");
var path = require("path");
var express = require('express');
var ejs = require('ejs');
var expressLayouts = require('express-ejs-layouts');


var app = express();
var port = 8001;

app.use(bodyparser.json());	
app.use(bodyparser.urlencoded({exteneded:true}));

//app.use("/db/", express.static('lottoDB'));

app.use(express.static('public'))
app.use('/js', express.static('public/js'))
app.use('/js', express.static(path.join(__dirname,  'node_modules', 'bootstrap', 'dist', 'js')));
app.use('/css', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')));


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')	;
app.engine('html', require('ejs').renderFile);
app.use(expressLayouts);


//route value
var routerlotto = require('./router/lotto-router');
var routermain = require('./router/main-router')(app);
//var routermain = require('./router/main')(app);
app.use("/lotto", routerlotto);




var server =  app.listen(port, function(){
     console.log('App listing as http://localhost:', port);
     
});



/*



app.get("/main",  function (req,res) {
     console.log('/main')
	res.sendFile(__dirname + "/public/main.html")
	});


app.post("/email_post",  function (req,res) {
	
	console.log("post >" + req.body.email);
     //res.send(req.body.email);
     res.render('email.ejs', {
          'email':req.body.email,
          'name':req.body.name,
          });	
     });

     app.post("/ajax_send_email",  function (req,res) {
	
          console.log('ajax=>' + req.body.email);
          //console.log("post");
          //res.send(req.body.email);
          var responseData = {"result":"ok", "email":req.body.email};
          res.json(responseData);
          
     });	

*/