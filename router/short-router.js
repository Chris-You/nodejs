
var  express = require("express");
var router = express.Router();

const controllers = require("../controller/short-controller");

router.get("/", controllers.getShortUrlView);

router.post("/get", controllers.getShortUrl);


module.exports = router;
