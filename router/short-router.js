
var  express = require("express");
var router = express.Router();

const controller = require("../controller/short-controller");

//router.get("/", controller.getShortUrlView);
router.post("/", controller.getShortUrl);
router.post("/url", controller.getShort2Url);


module.exports = router;
