const express = require("express");
const query = require("../query.js");
const router = express.Router();

//查询某位用户的购物车列表
router.get("/", (req,res) => {
  var uid = req.session.uid;
  if(!uid) {
   res.send({code: -1, msg: "请先登录"});
   return;
  }
  var sql = "SELECT gtime, pid, Pimg, pname, price,count FROM cart WHERE uid =? ORDER BY gid DESC";
  query(sql, [uid]).then( result => {
      res.send({code: 1, msg: "数据获取成功", data: result});
  });
})

//加入购物车
router.post("/addCart", (req,res) => {
    var uid = req.session.uid;
    if(!uid) {
     res.send({code: -1, msg: "请先登录"});
     return;
    }
    var obj = req.body;
    obj.gtime = new Date();
    obj.uid = uid;
    //查询数据库是否已添加过此商品
    var sql1 = "SELECT pid, count FROM cart WHERE pid = ?";
    var sql2 = "UPDATE cart SET ? WHERE pid = ?"
    var sql3 = "INSERT INTO cart SET ?";
    query(sql1,[obj.pid]).then(result => {
      //如果数据库中有添加过该商品
      if(result.length>0) {
     //更新该商品的数量和添加事件
     var obj2 = {
       gtime: new Date(),
       count: parseInt(result[0].count) + parseInt(obj.count)
     }
     var pid = result[0].pid;
       query(sql2,[obj2,pid]).then( result => {
         if(result.affectedRows>0) {
            res.send({code: 1, msg: "数据添加成功"});
         }
       })
      } else {
        //如果从未添加过此商品
        query(sql3,[obj]).then( (result) => {
          if(result.affectedRows>0) {
            res.send({code: 1, msg: "数据添加成功"});
         }
        });
      }
    });
});

//删除购物车中的商品
router.get("/del", (req,res) => {
var uid = req.session.uid;
if(!uid) {
  res.send({code: -1, msg: "请先登录"});
  return;
 }
 //获得要删除的商品ids
 var pids = req.query.pids;
 console.log(pids);
 var sql = `DELETE FROM cart WHERE pid in (${pids})`;
 query(sql,[pids]).then( result => {
   if(result.affectedRows> 0) {
    res.send({code: 1, msg: "宝贝删除成功"});
   }
 });


});
module.exports = router;