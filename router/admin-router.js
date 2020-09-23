var  express = require("express");
var router = express.Router();


const lottoController = require("../controller/lotto-controller");
const admController = require("../controller/admin-controller");

//router.get("/lottosort", controllers.setLottoDBSort);
router.get("/", admController.index);
router.get("/api/:id", lottoController.getLottoPrizeByApi);
router.get("/data/:start/:end", lottoController.setLottoDB);
router.get("/summary", lottoController.setLottoSumDB);



module.exports = router;
