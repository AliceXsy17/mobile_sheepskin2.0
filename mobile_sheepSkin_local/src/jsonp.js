export function jsonp(url) {
    return new Promise(
        function(resolve,reject){
          //Promise中的代码和不用promise时是完全一样的
          var script=null;
          var ms=new Date().getTime();
          var r=parseInt(Math.random()*9000+1000);
          var fname=`doit${ms}${r}`;
          window[fname]=function(res){
            //要对res做什么处理，应该下一个.then说了算！
            //这里只负责开门，并传出服务端返回结果
            resolve(res);
            //删除本次临时使用的script和函数
            document.head.removeChild(script);
            delete window[fname];
          }
          script=document.createElement("script");
          script.src=`${url}&jsonpCallback=${fname}`;
          document.head.appendChild(script);
        }
      )
}