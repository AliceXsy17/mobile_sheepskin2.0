//1.加载第三方模块
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const path=require('path');
const indexRouter = require("./routes/index.js");
const commentsRouter = require("./routes/comments.js");
const productRouter = require("./routes/product.js");
const orderRouter = require("./routes/order.js");
const userRouter = require("./routes/user.js");
const addressRouter = require("./routes/address.js");
const cartRouter = require("./routes/cart.js");
const catagoryRouter = require("./routes/catagory.js");
const bodyParser = require("body-parser");
const uploadRouter=require('./routes/uploads.js');
var app = express();

//配置body-parser
app.use(bodyParser.json());  //加上这个配置才能获取到axios post过来的数据？
app.use(bodyParser.urlencoded({
	extended: false //不使用第三方qs模块，而是使用querystring模块
}))
//3.配置跨域模块
app.use(cors({
    origin: [
        "http://127.0.0.1:8081",
        "localhost:8081"
    ], //允许跨域访问程序地址列表
    credentials: true  //请求验证
}));
//4.配置session模块
app.use(session({
    secret: "128位字符串", //安全字符串为了加密，提高安全性
    resave: true, //请求时更新数据
    saveUninitialized: true  //保存初始数据
}));
app.listen(5050);
app.use(express.static("public"));
// 配置静态资源目录 整一个文件夹 通过域名能访问
app.use(express.static("uploads"));
app.use("/index",indexRouter);
app.use("/comments",commentsRouter);
app.use("/product",productRouter);
app.use("/order",orderRouter);
app.use("/user",userRouter);
app.use("/address",addressRouter);
app.use("/cart",cartRouter);
app.use("/catagory",catagoryRouter);
app.use('/uploads',uploadRouter)
