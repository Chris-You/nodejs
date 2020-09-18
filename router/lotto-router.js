
var  express = require("express");
var router = express.Router();

const controllers = require("../controller/lotto-controller");

router.get("/", controllers.getLottoView);
router.get("/search", controllers.getLottoView);
router.post("/lotto_ajax", controllers.getLottoPrize);

router.get("/view", controllers.getLottoNumView);
router.post("/random", controllers.getLottoNum);

router.get("/lotto/:id", controllers.getLottoPrizeByApi);
router.get("/lottoall/:start/:end", controllers.setLottoDB);
router.get("/lottosort", controllers.setLottoDBSort);
router.get("/lottosummary", controllers.setLottoSumDB);


module.exports = router;
