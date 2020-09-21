


const request = require("request");

const service = require("../services/short-service");

exports.getShortUrlView  = async function (req,res){

     res.render('short/view');

};

exports.getShortUrl  = async function (req,res){

     var origin_url = req.body.url;
     //console.log(origin_url);
     var result = await service.getShortUrl(origin_url);
     console.log(result);
     res.json(result);

};