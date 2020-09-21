
var  express = require("express");
var router = express.Router();

const controllers = require("../controller/lotto-controller");

router.get("/", controllers.getLottoView);
router.get("/search", controllers.getLottoView);
router.post("/lotto_ajax", controllers.getLottoPrize);

router.get("/view", controllers.getLottoNumView);
router.post("/random", controllers.getLottoNum);
router.get("/store", controllers.findStore);


//router.get("/lottosort", controllers.setLottoDBSort);
router.get("/api/:id", controllers.getLottoPrizeByApi);
router.get("/data/:start/:end", controllers.setLottoDB);
router.get("/summary", controllers.setLottoSumDB);
router.get("/stat", controllers.setLottoStat);


module.exports = router;
