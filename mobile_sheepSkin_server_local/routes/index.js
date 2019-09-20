const express = require("express");
const query = require("../query.js");
const router = express.Router();

router.get("/", (req,res) => {
  var cid = req.query.cid;
  // var isHot = req.query.isHot;
  // var isRecomend = req.query.isRecomend;
  var output = {
    carousel: []
    //,
    // hot: [],
    // recomend: []
  };
  var sql1="SELECT img_url FROM index_carousel WHERE cid = ?";
  // var sql2="SELECT Pimg,pname,price FROM product WHERE isHot = ?";
  // var sql3="SELECT Pimg,pname,price FROM product WHERE isRecomend = ?";
  (async function(){
      var result = await Promise.all( [query(sql1,[cid])
      // , query(sql2,[isHot]), query(sql3,[isRecomend]) 
    ]
    );
      output.carousel = result[0];
      // output.hot = result[1];
      // output.recomend = result[2];
      res.send({code:1, msg:"数据获取成功", data:output});  

  } )();
});
module.exports = router;