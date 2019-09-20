const express = require("express");
const query = require("../query.js");
const router = express.Router();

//查询某位用户是否已经注册过
router.get("/register", (req,res) => {
var uname = req.query.uname;
var sql = "SELECT uid FROM user WHERE uname = ?";
query(sql,[uname]).then(result => {
    if (result.length>0) {
        res.send({code: -1,msg: "该用户名已经被注册"});
    } else {
        res.send({code: 1, msg: "该用户名可用"});
    }
});
});
   
//提交用户数据到用户表
router.post("/addUser", (req,res) => {
var obj = req.body;
var sql = "INSERT INTO user SET ?";
query(sql,[obj]).then( result => {
    if(result.affectedRows > 0) {
      res.send({code: 1, msg: "用户注册成功"});
    }
});
});

//登录接口，查看用户名和密码是否正确
router.get("/login", (req,res) => {
var uname = req.query.uname;
var upwd = req.query.upwd;
var sql = "SELECT uid FROM user WHERE uname = ? AND upwd = ?";
query(sql,[uname,upwd]).then(result => {
    if(result.length > 0) {
     var uid = result[0].uid;
      req.session.uid = uid;
     res.send({code: 1, msg: "登录成功"});
    } else {
     res.send({code: -1, msg: "用户名或密码错误"});
    }
});
});

//退出登录接口
router.get("/login_out", (req, res) => {
    req.session.uid = "";
    res.send({code: 1, msg: "退出成功"});
});
//查询某位用户的nickName和性别
router.get("/myInfo", (req,res) =>{
  var uid = req.session.uid;
  if(!uid) {
    res.send({code: -1, msg: "请先登录"});
    return;
  }
  var sql = "SELECT nickName, avatar, sex, phone, email FROM user WHERE uid = ?";
  query(sql, [uid]).then( result => {
     res.send({code: 1, msg: "获取用户信息成功", data: result});
  });
});
//修改用户信息接口
router.post("/change_myInfo", (req,res) => {
var uid = req.session.uid;
var obj = req.body;
if(!uid) {
    res.send({code: -1, msg: "请先登录"});
    return;
   }

var sql = "UPDATE user SET ? WHERE uid = ?";
//查询出用户表中的头像和昵称信息
var sql1 = "SELECT avatar, nickName FROM user WHERE uid = ?"
//修改评论表中的头像和昵称信息
var sql2 = "UPDATE comments SET ? WHERE uid = ?"

query(sql,[obj,uid]).then( ()=> {
//查询出用户表中的头像和昵称信息
query(sql1, [uid]).then( ( result ) => {
    console.log(result[0]);
    var obj={head_url: result[0].avatar, nickName: result[0].nickName}
//修改评论表中的头像和昵称信息
query(sql2,[obj,uid]).then( (result) => {
    if(result.affectedRows>0) {
      res.send({code:1, msg: "信息修改成功"});
    }
})
} )
})
});
module.exports = router;