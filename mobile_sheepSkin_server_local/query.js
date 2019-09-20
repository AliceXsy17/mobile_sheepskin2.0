var pool = require("./pool.js");
module.exports=function(sql,params){
    return new Promise( (resolve, reject) => {
        pool.query(sql, params, (err, result) => {
            if(err) throw err;
            resolve(result);
        })
    });
}
