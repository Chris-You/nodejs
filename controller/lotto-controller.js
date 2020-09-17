// oncoroller.js

const fs = require('fs');
const readline = require('readline');
const request = require("request");


const lottoService = require("../services/lotto-service");

exports.getTest  = function (req,res){

     console.log(req.query);
     console.log(req.body);
     console.log("====");
     res.send("ok");
};


exports.getLottoView  = function (req,res){

     res.render('lotto/lottoPrize');
};

exports.getLottoPrize = async function(req, res){

     //console.log(req.body);
     var querydate = "";
     
     var queryno = req.body.no;
     //console.log(queryno);
     //console.log(queryno);

     if(queryno === undefined || queryno == "")
     {
          querydate = req.body.date;
          //console.log(querydate);
          if(querydate != undefined || querydate != "")
          {
               querydate = querydate.replace(/-/gi,'');
          }
     }

     if(querydate == undefined )
     {
          var week = getPreviusWeek(-7);
          //console.log(week);
          querydate = week[6].replace(/-/gi,'');
     }

     //console.log(querydate);

     var result = await lottoService.getLottoPrize(queryno, querydate);
     //console.log("====");
     //console.log(result);
     res.json(result);
     //res.send(result);
     //res.render('lotto/lottoPrize', { data : result});
     
}


exports.getLottoPrizeByApi = function(req, res){
     //var queryno = req.query.id;
     var routeno = req.params.id;
     //console.log(req.params);
     var no = "";
     if(routeno != undefined)
     {
          no = routeno;
     }
     var geturl ="https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo="+ no;
    
     request.get(
          {
               url:geturl
          }, 
          function(error, response, body)
          {
               res.json(JSON.parse(body) );
          }
     );
     //res.json(response);
}

// 로또 API회차조회하여 저장
exports.setLottoDB = async function(req,res){

     var start= req.params.start;
     var end= req.params.end;

     var result = await lottoService.setLottoDB(start, end);
     //console.log("====");
     //console.log(result);

     res.send("end")           
}


exports.setLottoDBSort = function(req,res){

     var file = '/lottoDB/lottoDB.txt';
     var rl = readline.createInterface({
          input: fs.createReadStream(file),
          output: process.stdout,
          terminal: false
     });

     var lottoSummary = new Array();

     rl.on('line', function (line) {
          //console.log(line) // print the content of the line on each linebreak
          lottoSummary.push(line + "\n");

          lottoSummary.sort();

          fs.writeFileSync('/lottoDBSort.txt',lottoSummary , 'utf-8',function(err, data){
               if(err){
                   console.log('Error : '+err);
               }
           })

     });

     res.send("ok")

}

exports.setLottoSumDB= async function(req,res){
     //전체 통계
     var result = await lottoService.setLottoSumDB();
     //console.log("====");
     //console.log(result);
     res.send("ok");

}


exports.getLottoNumView  = function (req,res){

     res.render('lotto/lottoNumber');
};


exports.getLottoNum = async function(req,res){

     // 상위  몇개까지  가능
     var cnt = req.body.no;
     var fixNum = req.body.fixnum;

     if(cnt === undefined || cnt== "") cnt = 0;
     console.log(cnt);
     console.log(fixNum);
     var result = await lottoService.getLottoRandum(cnt, fixNum);
     console.log(result);
     res.json(result);
     //res.render('lotto/lottoRandom', { data : result});

}

function getPreviusWeek(addDay)
{
     var sDate = new Date();  
     
     var y = parseInt(sDate.getFullYear(), 10);
     var m = parseInt(sDate.getMonth(), 10);
     var d = parseInt(sDate.getDate(), 10);

     var currentDay = new Date(y, m, d + addDay);  

     var theYear = currentDay.getFullYear();
     var theMonth = currentDay.getMonth();
     var theDate  = currentDay.getDate();
     var theDayOfWeek = currentDay.getDay();
      
     var thisWeek = [];
      
     for(var i=0; i<7; i++) {
          var resultDay = new Date(theYear, theMonth, theDate + (i - theDayOfWeek));
          var yyyy = resultDay.getFullYear();
          var mm = Number(resultDay.getMonth()) + 1;
          var dd = resultDay.getDate();
          
          mm = String(mm).length === 1 ? '0' + mm : mm;
          dd = String(dd).length === 1 ? '0' + dd : dd;
          
          thisWeek[i] = yyyy + '-' + mm + '-' + dd;
     }

     return thisWeek;

}
