<template>
    <div class="container">
          <h3>羊丽羊欢迎您！</h3>
          <div class="login_body">
          <div>
            <label class="label" for="uname">登录账号：</label><input id="uname" type="text" v-model="uname"><span class="tips" v-text="uname_tips"></span>
          </div>
          <div>
            <label class="label" for="upwd">登录密码：</label><input id="upwd" type="password" v-model="upwd"><span class="tips" v-text="upwd_tips"></span>
          </div>
          <div class="remember">
              <input id="remember" type="checkbox" v-model="remember"><label for="remember">记住密码</label>
          </div>
          <div class="login">
              <button @click="checkInfo">登录</button> 还没账号？<span @click="goRegister">立即注册</span>
          </div>
          </div>       
    </div>
</template>
<script>
export default {
    data() {
        return {
            uname: localStorage.getItem("uname"),
            upwd: localStorage.getItem("upwd"),
            uname_tips: "5-10个字符",
            upwd_tips: "至少6个字符",
            remember: false
        }
    },
    methods: {
     //检测用户名和密码是否正确
      checkInfo() {
         this.uname = $.trim(this.uname);
         this.upwd = $.trim(this.upwd);
        var obj = {uname: this.uname, upwd: this.upwd}
        this.axios.get("/user/login",{params: obj}).then(result => {
             if(result.data.code === 1) {
              this.$toast(result.data.msg);           
              this.$router.push("/orderWrapper");
              this.$emit("hasLogin");
           //如果选择了记住密码，在登录成功后将账号密码存到localStorage中
           if(this.remember) {
            localStorage.setItem("uname",this.uname);
            localStorage.setItem("upwd",this.upwd);
          }
             } else {
               this.$toast(result.data.msg);  
             }
          })
      },
      goRegister() {
          this.$router.push("/register");
      }
    }
}
</script>
<style scoped>
.container {
   padding: 0;
}
h3{
    height: 50px;
    background: #85392b;
    color: #fff;
    text-align: center;
    line-height: 50px;
}
.basic>div, .secure>div {
    display: flex;
}
.basic, .secure {
    padding: 0 0 0 7px;
}
div {
    margin-bottom: 15px;
}
.label {
    display: inline-block;
    width: 99px;
}
.radio{
    margin-right: 10px;
}
input {
    margin-right: 10px;
}
.login {
    display: flex;
    padding-left: 46px;
    align-items: center;
    width: 60%;
    margin: 0 auto;
    font-size: 14px;
}
.login button {
    margin-right: 15px;
    background: #85392b;
    color: #fff;
    border: 0;
    outline: 0;
}
.login span{ 
    color: blue;
}
.tips {
    color: #999999;
    font-size: 10px;
}
.remember{ 
    width: 100px;
    margin: 5px auto;
}
</style>
