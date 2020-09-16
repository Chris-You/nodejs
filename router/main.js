
module.exports = function(app) {



     var logger = function(req,res, next){
          console.log("logged");
          next();
     }

     app.use(logger);


     app.get("/",  function (req,res) {
          res.sendFile(__dirname + "/public/form.html")
     });

     app.get("/test",  function (req,res) {
          res.send("ok")
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