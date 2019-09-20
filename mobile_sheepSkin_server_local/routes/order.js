const express = require("express");
const query = require("../query.js");
const router = express.Router();

//获取用户订单
router.get("/", (req, res) => {
 //获得用户uid
   var uid =  req.session.uid;
   if(!uid) {
    res.send({code: -1, msg: "请先登录"});
    return;   
   }
   var sql = "SELECT oid, otime, orderno, pid, Pimg, pname, price, isComment FROM orders WHERE uid =? ORDER BY oid DESC";
   query(sql,[uid]).then( result => {
     res.send({code: 1, msg: "订单信息获取成功", data:result});
   });
});


//购买接口、提交订单
router.post("/postOrder", (req,res) => {
    var uid =  req.session.uid;
    if(!uid) {
        res.send({code: -1, msg: "请先登录"});
        return;
      }
    var body = req.body;
    body.otime = new Date();
    body.orderno = Math.random()*100000+12345
    body.uid = uid;
    var sql = "INSERT INTO orders SET ?";
    query(sql,[body]).then( result => {
        if(result.affectedRows > 0) {
          res.send({code: 1, msg: "订单提交成功"});
        };
    });
});
module.exports = router;