


const request = require("request");

const service = require("../services/short-service");

exports.getShortUrlView  = async function (req,res){

     res.render('short/view');

};

exports.getShortUrl  = async function (req,res){

     var origin_url = req.body.url;
     //console.log(origin_url);
     var result = await service.getShortUrl(origin_url);
     
     //res.json(result);
     var json = {"data": result};
     console.log(json);
     res.render('short/view', json);
};

exports.getShort2Url  = async function (req,res){

     var origin_url = req.body.url;
     //console.log(origin_url);
     var result = await service.getShortUrl(origin_url);
     res.json(result);
};


exports.getOriginUrl  = async function (url){
     
     var result = await service.getOriginUrl(url);
     console.log("short-controller");
     return result;

};

exports.setAccessCnt  = async function (url){
     
     var result = await service.setAccessCnt(url);
     return result;

};