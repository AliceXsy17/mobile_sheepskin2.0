const express=require('express');
const router=express.Router();
const fs=require('fs');
const path=require('path');
//上传图片的模板
var multer=require('multer');
//生成的图片放入uploads文件夹下
var upload=multer({dest:'uploads/'})
//图片上传必须用post方法
function readFile_promise(fileName, arr) {
    return new Promise( (resolve, reject) => {
          for (let i=0; i < fileName.length; i++) {
            var keepname = "";
            fs.readFile(fileName[i].path, (err,data)=> {
              if(err){return res.send('上传失败')};
              let time=Date.now()+parseInt(Math.random()*999)+parseInt(Math.random()*2222);
              let extname=fileName[i].mimetype.split('/')[1];
              keepname=time+'.'+extname;
              arr.push(keepname);
              fs.writeFile(path.join(__dirname,'../uploads/'+keepname),data,(err)=>{
                if(err){return res.send('写入失败')}
                if(i==fileName.length-1) {
                    resolve(arr);
                  }    
        });                       
            })
          }
        })
};
router.post('/img',upload.array('imgFiles',5), (req,res) => {
    var arr = [];
    readFile_promise(req.files, arr).then( (result) => {
        res.send({err:0,msg:'上传ok',data:result})
});
});
module.exports=router;