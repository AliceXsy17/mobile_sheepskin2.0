const express = require("express");
const query = require("../query.js");
const router = express.Router();

//获取商品分类及分类下的商品
router.get("/", (req,res)=> {
//从分类表中查询出所有的商品分类
var sql1 = "SELECT cid, cname FROM catagory GROUP BY cname";
var sql2 = "SELECT pid,Pimg,pname,price FROM product WHERE fid = ?";
(async function() {
    var result1 = await query(sql1);
    var arr = [];
    for(var i=0; i < result1.length; i++) {
      var output = {};
      output.cname=result1[i].cname;
      var result2 = await query(sql2,[result1[i].cid]);
     output.list = result2;
     arr.push(output);
    }
    res.send({code: 1, msg: "数据获取成功", data: arr});
})();
 });


module.exports = router;