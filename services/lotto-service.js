const fs = require('fs');
const readline = require('readline');
const request = require("request");
const path = require("path");


exports.getLottoPrize = async function(queryno,querydate){

     //var file =  __dirname + '/DB/lottoDB.txt';
     var file = path.join( __dirname ,  '../DB/lottoDB.txt');
     //console.log(file)
     var rl = readline.createInterface({
          input: fs.createReadStream(file),
          output: process.stdout,
          terminal: false
     });
     
     return new Promise(resolve => {
          var result;
          rl.on('line', function (line) {
               //console.log(line) // print the content of the line on each linebreak
               var arLine = line.split(',');
               var dbDate = line.substring(0, 10).replace(/-/gi, '');
               
               if(queryno !== undefined  && queryno != "")
               {
                    if(arLine[47] === queryno)
                    {
                         result = getLotto(line);
                         rl.close();
                    }
               }
               else
               {
                    if(querydate === dbDate)
                    {
                         result = getLotto(line);                      
                         rl.close();
                    }
               }     
          });

          rl.on('close', _ => {
               resolve(result)
          });
     });
     
}

exports.getLottoRandum = async function(cnt, fixNum){

     // 파일조회

     //var file =  __dirname + '/DB/lottoSumDB.txt';
     var file = path.join( __dirname ,  '../DB/lottoSumDB.txt');
     var rl = readline.createInterface({
          input: fs.createReadStream(file),
          output: process.stdout,
          terminal: false
     });

     return new Promise (resolve => {

          var numbers = new Array();

          if(cnt  >  0)
          {
               var nums = new Array();

               rl.on('line', function (line) {
                    //console.log(line);
                    //console.log("first count:" + cnt);
                         var arSum =  line.split(',');
                         for(var i=0; i< arSum.length; i++)
                         {
                              var tmpAr = [i+1, arSum[i]];
                              if( isNumber(arSum[i]) )        
                              {        
                                   nums.push(tmpAr );
                              }
                         }
                         nums = nums.sort(function(a,b) {
                              return  b[1] - a[1];
                         });

                         for(var i=0; i< cnt; i++)
                         {
                              numbers[i] = nums[i][0];
                         }

                         while(numbers.length<6)
                         {
                              var no1 = Math.floor(Math.random() * 45) + 1;
                              if(numbers.indexOf(no1) == -1)
                              {
                                   numbers.push(no1);
                              }
                         }
                         numbers = numbers.sort(function(a,b) {
                              return  a-b;
                         });
                         //console.log(numbers)
               });
               rl.on('close', _ => {
                    resolve(numbers)
               });
          }
          else if( fixNum != "")
          {               
               //console.log(fixNum);
                    var nums = fixNum.split(',');
                    //console.log(nums.length);
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

                    numbers.sort(function(a, b){
                         return a-b;
                    });

                    //console.log(numbers);
                    resolve(numbers);
          }
          else
          {
               console.log("all random");

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

               //console.log(numbers);
               resolve(numbers);
          }
     });
}


exports.setLottoDB = async function(start,end){
    
          for(var i=start; i<=end; i++)
          {
               var idx = i;
               var geturl ="https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo="+ idx;
               console.log(geturl);
               request.get(
               {
                    url:geturl
               }, 
               function(error, response, body)
               {
                    var lottoSummary = new Array(50);
                    for(var i=1; i<=46; i++)
                    {
                         lottoSummary[i] = 0;
                    }
     
                    var json = JSON.parse(body);
                    
                    var no1 = parseInt(json.drwtNo1);
                    var no2=  parseInt(json.drwtNo2);
                    var no3=  parseInt(json.drwtNo3);
                    var no4=  parseInt(json.drwtNo4);
                    var no5=  parseInt(json.drwtNo5);
                    var no6=  parseInt(json.drwtNo6);
     
                    lottoSummary[0] = json.drwNoDate;
                    lottoSummary[no1] =  1;
                    lottoSummary[no2] =  1;
                    lottoSummary[no3] =  1;
                    lottoSummary[no4] =  1;
                    lottoSummary[no5] =  1;
                    lottoSummary[no6] =  1;
                    lottoSummary[46] = json.bnusNo;
                    lottoSummary[47] = json.drwNo;
                    lottoSummary[48] = json.firstPrzwnerCo;
                    lottoSummary[49] = json.firstWinamnt;
                    
                    var file = path.join( __dirname ,  '../DB/lottoDB.txt');
                    fs.appendFile(file,lottoSummary + "\n",function(err){
                         if(err){
                             console.log('Error : '+err);
                         }
                         //console.log("write file");
                     })
               });
          }
     
}

exports.setLottoSumDB= async function(){

     //var file = __dirname + '/DB/lottoDB.txt';
     var file = path.join( __dirname ,  '../DB/lottoDB.txt');
     var rl = readline.createInterface({
          input: fs.createReadStream(file),
          output: process.stdout,
          terminal: false
     });

     var lottoSummary = new Array(45);
     for(var i=0; i<45; i++)
     {
          lottoSummary[i] = 0;
     }

     var idx = 0;
     rl.on('line', function (line) {
          //console.log(line) // print the content of the line on each linebreak
          idx++;
          var arlotto = line.split(",");
          for(var i=1; i< 47; i++){
               if(arlotto[i]=="1")
               {
                    ++lottoSummary[i-1];
               }
               if(arlotto[46] == i) { ++lottoSummary[i-1];}
          }

          console.log(idx);
          var fileSum= path.join( __dirname ,  '../DB/lottoSumDB.txt');
          fs.writeFileSync(fileSum,lottoSummary + "\n", 'utf-8',function(err){
               if(err){
               console.log('Error : '+err);
               }
               //console.log("write file");
          })

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