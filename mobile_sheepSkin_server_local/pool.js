const mysql = require("mysql");
//2.配置数据库连接池,提高数据效率
var pool = mysql.createPool({
    host: "127.0.0.1",
    port: 3306,
    database: "furskin_ylyapp",
    user: "root",
    password: "",
    connectionLimit: 15
});
module.exports = pool;