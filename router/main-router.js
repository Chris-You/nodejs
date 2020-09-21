var path = require("path");

module.exports = function(app) {

     var logger = function(req,res, next){
          console.log("logged");
          next();
     }

     //app.use(logger);
     app.get("/",  function (req,res) {
          //res.sendFile(path.join( __dirname ,  "../views/index.html"));

          var admin = req.query.admin;
          var json = {"adm":admin};
          
          res.render("index", json);
          //res.render("common/email.ejs", {"email":"sunwoo@hotmail.com", "name": "sunwoo"});
     });




     app.get("/:short",  function (req,res) {         

          var url = req.params.short;

          // url  요청시 select  target >> redirect >> 
          // count ++;

          // 없으면 404  리턴
          res.redirect()
          res.redirect(200, "naver.co.kr");
          res.send("ok:" + url);
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