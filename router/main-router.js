var path = require("path");

const shortController = require("../controller/short-controller");

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


     app.get("/undefined",  function (req,res) {
          res.send("undefined");          
     });



     app.get("/:shorturl",  async function (req,res) {         

          var url = req.params.shorturl;
          //console.log(url.length);
          console.log(" referer: "+req.headers.referer);

          var lastChar = url.substring(url.length-1, url.length);
          //console.log(lastChar);
          if(lastChar == "+")
          {
               url = url.substring(0, url.length-1);
               // 접속 통계
          }


          var result = await shortController.getOriginUrl(url);
          //console.log("router");
          //console.log(result);

          if(result != "" && result.origin != "")
          {
               if(lastChar == "+")
               {
                    res.send("access cnt:" + result.cnt);
               }
               else
               {
                    await shortController.setAccessCnt(url);

                    //console.log("redirct");
                    var redirectUrl = result.origin;
                    if(result.origin.indexOf("http://") == -1 )
                    {
                         redirectUrl = "http://" + result.origin
                    }              
     
                    res.redirect(redirectUrl);
               }
          }
          else
          {
               console.log("404 Error");
               res.sendFile(path.join( __dirname ,  "../views/404.html"));
          }
     

          
         

          // url  요청시 select  target >> redirect >> 
          // count ++;

          // 없으면 404  리턴

          //res.redirect("http://naver.co.kr");
          
     });
     




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