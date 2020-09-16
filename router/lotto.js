

/*
const controllers = require("../controller/lotto-controller");


module.exports = function(app) {


     app.post("/test", function(req,res){

     console.log(req.query);
     console.log(req.body);
     res.send("..")

     }
     
     );
     app.get("/lotto", controllers.getLottoView);
     app.post("/lotto_ajax", controllers.getLottoPrize);
     app.get("/lotto_number", controllers.getLottoNum);
     app.get("/lotto/:id", controllers.getLottoPrizeByApi);
     app.get("/lottoall/:start/:end", controllers.setLottoDB);
     app.get("/lottosort", controllers.setLottoDBSort);
     app.get("/lottosummary", controllers.setLottoSumDB);

}
*/


var  express = require("express");
var router = express.Router();

const controllers = require("../controller/lotto-controller");

/*
router.post("/test", function(req,res){

     console.log(req.query);
     console.log(req.body);
     res.send("..")

     });
*/
     

router.get("/lotto", controllers.getLottoView);
router.post("/lotto_ajax", controllers.getLottoPrize);

router.get("/lottoview", controllers.getLottoNumView);
router.post("/lotto_number", controllers.getLottoNum);
router.get("/lotto/:id", controllers.getLottoPrizeByApi);
router.get("/lottoall/:start/:end", controllers.setLottoDB);
router.get("/lottosort", controllers.setLottoDBSort);
router.get("/lottosummary", controllers.setLottoSumDB);


module.exports = router;
