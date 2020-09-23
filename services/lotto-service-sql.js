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

// 추첨 회차 
exports.getLottoDate = async function()
{
     var sql  = "select  * from lotto order by no desc limit 10;"

     return new Promise(resolve => {
          connection.query(sql , function(err, rows){
               if(err) throw err;
               if(rows[0]){
                    resolve(rows);
               }
          });
     });
}

// 회차별 추첨정보
exports.getLottoPrize = function(queryno,querydate){

     var sql  = "";
     if(queryno !== undefined  && queryno != "")
     {
          sql  = "select * from lotto where no=" +queryno;
     }
     else if(querydate !== undefined  && querydate != "")
     {
          sql  = "select * from lotto where replace(in_date, '-', '') = '" +querydate + "';";
     }
     else{
          sql  = "select  * from lotto order by no desc limit 1;"
     }



     return new Promise(resolve => {
          connection.query(sql , function(err, rows){
               if(err) throw err;
               if(rows[0]){
                    resolve(rows[0]);
               }
          });
     });

}

function pushNumber(num)
{

}

//  추천번호
exports.getLottoRandom = async function(cnt, fixNum){

     return new Promise (resolve => {     
          // 파일조회
          var numbers = new Array();
          // 당첨 순서 
          if(cnt  >  0)
          {
               numbers = new Array();
               
               var sql  = "select  * from lottoStat ;";
               connection.query(sql , function(err, rows){
                    if(err) throw err;
                    if(rows[0]){
                         var nums = new Array();          
                         for(var i = 1; i<=45; i++)
                         {
                              var tmpAr = [i+1, eval('rows[0].no' + i)];
                              nums.push(tmpAr );
                         }
                        
                         nums = nums.sort(function(a,b) {
                              return  b[1] - a[1];
                         });
                         //console.log(nums);
                         for(var i=0; i< cnt; i++)
                         {
                              numbers[i] = nums[i][0];
                         }
                         if(fixNum != "")
                         {
                              console.log("fixNum :"+ fixNum);
                              var nums = fixNum.split(',');
                              //console.log(nums.length);
                              for(var i=0; i< nums.length; i++)
                              {
                                   if(nums[i] != undefined && nums[i]!= "")
                                   {
                                        if( numbers.indexOf(nums[i]) == -1 && numbers.length <= 6)
                                        {
                                             numbers.push(parseInt(nums[i]));
                                        }
                                   }
                              }
                         }                    

                         while(numbers.length<6)
                         {
                              var no1 = Math.floor(Math.random() * 45) + 1;
                              if(numbers.indexOf(no1) == -1)
                              {
                                   numbers.push(no1);
                              }
                         }
                         numbers.sort(function(a, b){
                              return a-b;
                         });

                         console.log("num cnt:"+ cnt);
                         resolve(numbers);
                    }
               });
          }
          else if(fixNum != "")
          {

               var nums = fixNum.split(',');
               console.log(nums.length);
               for(var i=0; i< nums.length; i++)
               {
                    if(nums[i] != undefined && nums[i]!= "")
                    {
                         numbers.push(parseInt(nums[i]));
                    }
               }

               while(numbers.length<6)
               {
                    var no1 = Math.floor(Math.random() * 45) + 1;
                    if(numbers.indexOf(no1) == -1)
                    {
                         numbers.push(no1);
                    }
               }
               console.log("fix num:"+ fixNum);
               resolve(numbers);
          }
          else
          {
               while(numbers.length<6)
               {
                    var no1 = Math.floor(Math.random() * 45) + 1;
                    if(numbers.indexOf(no1) == -1)
                    {
                         numbers.push(no1);
                    }
               }
               numbers.sort(function(a, b){
                    return a-b;
               });
     
     
               console.log("all random");
               resolve(numbers);
          }
          
     });
}

// 회차 정보 저장
exports.setLottoDBSql = async function(start, end){

     for  (var i=start; i<=end; i++)
     {
          var result = await insertNumber(i);             
          //console.log("result");
     }

    console.log("done");
};



// 전체 Summary
exports.setLottoSumSql= async function(){
     // 전체 통계를 구하기 위해 기존 데이터는 삭제

     return new Promise(resolve => {
          connection.query("delete from lottoStat " , function(err, rows){
               if(err) throw err;
               else{
                    connection.query("select * from lotto;" , async function(err, rows){
                         if(err) throw err;
                         if(rows[0]){    
                              var result = await insertTotal(rows);         
                              resolve(result);
                         }
                    });
               }
          });
     });
}


function insertNumber(idx)
{
     var geturl ="https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo="+ idx;
          console.log(geturl);
          request.get(
          {
               url:geturl
          }, 
          function(error, response, body)
          {
               try
               {
                    if(body !=undefined){
                         var json = JSON.parse(body);
                         var bnusNo =json.bnusNo;
                         var drwNo = json.drwNo;
                         var drwDate = json.drwNoDate;
                         var firstPrzwnerCo = json.firstPrzwnerCo;
                         var firstWinamnt = json.firstWinamnt;
                         var no1 = parseInt(json.drwtNo1);
                         var no2=  parseInt(json.drwtNo2);
                         var no3=  parseInt(json.drwtNo3);
                         var no4=  parseInt(json.drwtNo4);
                         var no5=  parseInt(json.drwtNo5);
                         var no6=  parseInt(json.drwtNo6);

                         var query = connection.query("select * from lotto where no=" +drwNo , function(err, rows){
                              if(err) throw err;
                              if(rows[0]){
                                   console.log("exist No" +drwNo)
                              }
                              else
                              {
                                   var insQurey = "insert into lotto(no, in_date, no1,no2,no3,no4,no5,no6,bonus,win_count, win_amt) values";
                                   insQurey +="('"+drwNo+"','"+drwDate+"','"+no1+"','"+no2+"','"+no3+"','"+no4+"','"+no5+"','"+no6+"','"+bnusNo+"','"+firstPrzwnerCo+"','"+firstWinamnt+"')";
                                   var ins = connection.query(insQurey, function(err,rows){
                                        console.log('insert:' + drwNo);
                                   });
                              }                    
                         });
                    }
                    else
                    {
                         console.log("none response data : " + idx);
                    }                    
               }
               catch(e){
                    console.log(body);
               }

          });
}

function insertTotal(rows)
{
     var lottoSummary = new Array(45);
     for(var i=0; i<45; i++)
     {
          lottoSummary[i] = 0;
     }
     console.log(rows.length);
     for(var i=0; i<rows.length; i++ )
     {
          ++lottoSummary[rows[i].no1-1];
          ++lottoSummary[rows[i].no2-1];
          ++lottoSummary[rows[i].no3-1];
          ++lottoSummary[rows[i].no4-1];
          ++lottoSummary[rows[i].no5-1];
          ++lottoSummary[rows[i].no6-1];
          ++lottoSummary[rows[i].bonus-1];
     }

     var sql = "insert into lottoStat(no1,no2,no3,no4,no5,no6,no7,no8,no9,no10";
     sql += "     ,no11,no12,no13,no14,no15,no16,no17,no18,no19,no20";
     sql += "     ,no21,no22,no23,no24,no25,no26,no27,no28,no29,no30";
     sql += "     ,no31,no32,no33,no34,no35,no36,no37,no38,no39,no40";
     sql += "     ,no41,no42,no43,no44,no45";
     sql += "     ,reg_dt) values";
     sql += "(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, now());";
     console.log(sql);

     return new Promise(resolve => {
          connection.query(sql, lottoSummary, function(err,rows, fields){
               if(err) console.log(err);
               else
               {
                    console.log("ins lottoStat");
                    resolve("end");
               }
          });
     });
}

function  getLotto(lotto)
{
     console.log(lotto);
     var a = lotto.split(',');
     var drno = new Array(6);
     var idx = 0;
     for(var i=1; i<=46;i++)
     {
          if(a[i] == "1")
          {
               drno[idx++] = i;
          }
     }

     var result = {
          "date": a[0], "n1":drno[0], "n2":drno[1], "n3":drno[2], "n4":drno[3], "n5":drno[4], "n6":drno[5], "bonus":a[46]
          , "count":a[48], "unitAmount":a[49], "times":a[47]
          };

     return result;
}

function isNumber(value) {

     var num = parseInt(value); // 정수 변환
       if (isNaN(num)) { // 값이 NaN 이면 숫자 아님.
         return false;
     }
     return true;
 }