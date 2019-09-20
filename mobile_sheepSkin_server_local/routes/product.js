const express = require("express");
const query = require("../query.js");
const router = express.Router();


router.get("/", (req,res) => {
  var isHot = req.query.isHot;
  var isRecomend = req.query.isRecomend;
  var output = {
    hot: [],
    recomend: []
  };
  var sql1="SELECT pid, Pimg,pname,price FROM product WHERE isHot = ?";
  var sql2="SELECT pid, Pimg,pname,price FROM product WHERE isRecomend = ?";
  (async function(){
    var result = await Promise.all( [query(sql1,[isHot]), query(sql2,[isRecomend]) ]);
    output.hot = result[0];
    output.recomend = result[1];
    res.send({code:1, msg:"数据获取成功", data:output});
  } )();
});

//根据传过来的pid获取商品的信息
router.get("/getItem", (req,res) => {
var pid = req.query.pid;
var sql = "SELECT Pimg FROM product WHERE pid = ?";
query(sql,[pid]).then( result => {
    res.send({code: 1, msg: "数据获取成功", data:result});
});
});
//获取商品详情页信息
router.get("/details",(req,res) => {
var pid = req.query.pid;
var sql = "SELECT carousel_img, pname, price, details_img FROM details WHERE pid = ?"
query(sql,[pid]).then(result => {
  res.send({code: 1, msg: "商品详情数据获取成功",data: result});
});
});
//搜索商品接口
router.get("/search", (req,res)=> {
var kw = req.query.kw;
var search_kw = `%${kw}%`
var output = {
  pCount: 0,
  pSize: req.query.pSize || 6,
  pno: req.query.pno || 0,
  data: []
}
var sql = "SELECT pid, Pimg, pname, price From product WHERE pname LIKE ?";
query(sql,[search_kw]).then( result => {
  if(result<=0) {
   res.send({code:-1, msg: "没有找到符合条件的宝贝"});
  } else {
 //根据查询出的数组长度和页码大小计算分页数
 output.pCount = Math.ceil(result.length / output.pSize);
 sql += ` limit ?,?`
 return query(sql,[search_kw,output.pSize*output.pno,output.pSize])
 .then( result => {
  output.data = result;
  console.log(output);
  res.send({code:1, data: output});
 } )
}
})
})
//搜索接口的按筛选条件(价格、销量、评论)排序接口
router.get("/sort", (req,res) => {
 var sort_condition = req.query.sortCondition;
 var kw = req.query.kw;
 var search_kw = `%${kw}%`;
 console.log(search_kw);
//根据关键词查出商品并按条件排序
var sql = `SELECT pid, Pimg, pname, price From product WHERE pname LIKE ? ORDER BY ${sort_condition} ASC`;
(async function() {
  var result = await query(sql,[search_kw]);
  res.send({code:1, msg: "操作成功", data: result});
})()
});
module.exports = router;