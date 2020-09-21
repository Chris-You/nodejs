const fs = require('fs');
const readline = require('readline');
const request = require("request");
const path = require("path");


var mysql = require("mysql");

var connection = mysql.createConnection({
     host:"sunwoori.cafe24app.com",
     port:3306,
     user:"sunwoori",
     password:"zaq1XSW@",
     database:"sunwoori"
});
connection.connect();

exports.getShortUrl = async function(origin_url)
{
     //console.log(origin_url);

     return new Promise(resolve => {
          // randum  select 없으면 등록 후 응답           
          var url = randomString(7);

          //console.log(url);

          connection.query("select * from shortUrl  where url = '"+ url +"' " , function(err, rows){
               if(err) throw err;
               else{
                    if( !rows[0]){    
                         var params = [url, origin_url];
                         connection.query("insert into shortUrl(url, origin, cnt, reg_dt) values(?, ?, 0, now() );" , params, async function(err, rows){
                              if(err) throw err;
                                                 
                              console.log("ins shortUrl : "  + url);
                              resolve(url);         
                         });
                    }
               }
          });
     });
}


function randomString(string_length) {
     var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
     var randomstring = '';
     for (var i=0; i<string_length; i++) {
          var rnum = Math.floor(Math.random() * chars.length);
          randomstring += chars.substring(rnum,rnum+1);
     }
     //document.randform.randomfield.value = randomstring;
     return randomstring;
     }