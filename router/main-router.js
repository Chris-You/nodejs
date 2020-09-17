var path = require("path");
var mysql = require("mysql");

var connection = mysql.createConnection({
     host:"sunwoori.cafe24app.com",
     port:3306,
     user:"sunwoori",
     password:"zaq1XSW@",
     database:"sunwoori"
});
connection.connect();


module.exports = function(app) {

     var logger = function(req,res, next){
          console.log("logged");
          next();
     }

     app.use(logger);


     app.get("/",  function (req,res) {
          res.sendFile(path.join( __dirname ,  "../public/form.html"));
     });

     app.get("/test",  function (req,res) {         
          res.send("ok")
     });
     
     app.get("/mysql",  function (req,res) {
          //console.log(connection);
          var response = {};
          var query = connection.query("select * from lotto", function(err, rows){
               if(err) throw err;
               if(rows[0]){
                    response = rows;
               }

               res.json(response);
          });
     });



     app.post('/ajax_send_email', function(req,res){
          //console.log(req.body)
          console.log(req.body.email)
          res.json(req.body);
          //res.send("welcome! " + req.body.email)
          })
                    
     
     


     app.get("/example",  function (req,res, next) {

               var val=1;
               console.log("main 1");
               //res.sendFile(__dirname + "/public/main.html")
               next();
          }, function(req, res, next)
          {
               console.log("main 2");
               next();
          }, function(req, res, next)
          {
               console.log("main 3");
               res.send("ok");
          }
          
     );



}