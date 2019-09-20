const express = require("express");
const query = require("../query.js");
const router = express.Router();

//获取用户地址
router.get("/", (req,res) => {
  var uid = req.session.uid;
  if(!uid) {
  res.send({code: -1, msg: "请先登录"});
  return;
  }
  var sql = "SELECT uname, phone, province, city, area, details FROM addr WHERE uid = ?";
  query(sql,[uid]).then( result => {
    res.send({code: 1, msg: "数据获取成功", data: result});
  });
});
   
//保存地址数据到地址表
router.post("/addAddr", (req,res) => {
var uid = req.session.uid;
if(!uid) {
res.send({code: -1, msg: "请先登录"});
return;
}
var obj = req.body;
//给obj增加uid属性
obj.uid = uid;
var sql = "INSERT INTO addr SET ?";
query(sql,[obj]).then( result => {
    if(result.affectedRows > 0) {
      res.send({code: 1, msg: "地址保存成功"});
    }
});
});

//修改用户地址
router.post("/modifyAddr", (req,res) => {
  var uid = req.session.uid;
  var body = req.body;
  var sql = "UPDATE addr SET ? WHERE uid = ?"
  query(sql,[body,uid]).then( result => {
    if(result.affectedRows > 0) {
      res.send({code: 1, msg: "地址修改成功"});
    }
  });
})


module.exports = router;