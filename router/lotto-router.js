
var  express = require("express");
var router = express.Router();

const controller = require("../controller/lotto-controller");

router.get("/", controller.getLottoView);
router.get("/search", controller.getLottoView);
router.post("/lotto_ajax", controller.getLottoPrize);

router.get("/view", controller.getLottoNumView);
router.post("/random", controller.getLottoNum);
router.get("/store", controller.findStore);
router.get("/stat", controller.setLottoStat);

module.exports = router;