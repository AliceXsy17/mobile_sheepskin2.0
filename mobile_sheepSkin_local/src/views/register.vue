<template>
    <div class="container">
        <div class="basic">
          <h3>账户基本信息</h3>
          <div>
            <label class="label" for="uname">登录账号：</label><input id="uname" type="text" v-model="uname" @blur="checkName"><span class="tips" v-text="uname_tips"></span>
          </div>
          <div>
            <label class="label" for="nickName">昵称：</label><input id="nickName" type="text" v-model="nickName"><span class="tips" v-text="nickName_tips"></span>
          </div>
          <div>
            <span class="label">性别：</span> <input id="male" type="radio" name ="sex" value="1" v-model="sex"><label for="male" class="radio">帅哥</label> 
            <input id="female" type="radio" name ="sex" value="0" v-model="sex"><label for="female" class="radio">美女</label>
            <input id="secret" type="radio" name ="sex" value="-1" v-model="sex"><label for="secret">不公开</label> 
          </div>         
        </div>
        <div class="secure">
           <h3>账户安全设置</h3>
          <div>
            <label class="label" for="upwd">登录密码：</label><input id="upwd" type="password" v-model="upwd"><span class="tips" v-text="upwd_tips"></span>
          </div>
          <div>
            <label class="label" for="reupwd">确认登录密码：</label><input id="reupwd" type="password"><span class="tips" v-text="reupwd_tips"></span>
          </div>
          <div>
            <label class="label" for="email">邮箱：</label><input id="email" type="text"  v-model="email"><span class="tips" v-text="email_tips"></span>
          </div>
          <div>
            <label class="label" for="phone">手机号码：</label><input id="phone" type="text"  v-model="phone"><span class="tips" v-text="phone_tips"></span> 
          </div>
          <div class="register">
             <button @click="register">注册</button> 如果您已有账号，<span @click="goLogin">可直接登录</span>  
          </div>
                                     
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            uname:"",
            nickName: "",
            sex: 0,
            upwd: "",
            email: "",
            phone: "",
            uname_tips: "5-10个字符",
            nickName_tips: "至少4个字符",
            upwd_tips: "至少6个字符",
            reupwd_tips: "请再次输入密码",
            email_tips: "6-100个字符",
            phone_tips: "11个字符"
        }
    },
    methods: {
     //检测用户是否被注册
      checkName() {
         this.uname = $.trim(this.uname)
        var obj = {uname: this.uname}
        this.axios.get("/user/register",{params: obj}).then(result => {
          this.uname_tips = result.data.msg;
          })
      },
      //提交数据到数据库
      register() {
          this.axios.post("user/addUser",{
              uname: this.uname,
              nickName: this.nickName,
              upwd: this.upwd,
              email: this.email,
              phone: this.phone,
              sex: this.sex
          }).then(result => {
              if (result.data.code === 1) {
                this.$toast(result.data.msg);
                //注册成功后跳到登录页
                this.$router.push("/login");
              }
          });
      },
      goLogin() {
          this.$router.push("/login");
      }
    }
}
</script>
<style scoped>
.container {
    font-size: 14px;
    text-align: left;
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
.register {
    width: 50px;
    margin: 0 auto;
}
.tips {
    color: #999999;
    font-size: 10px;
}
.register {
    display: flex;
    padding-left: 5px;
    align-items: center;
    width: 74%;
    margin: 0 auto;
    font-size: 14px;
}
.register button {
    margin-right: 15px;
}
.register span{ 
    color: blue;
}
</style>
