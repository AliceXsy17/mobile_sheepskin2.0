<template>
    <div class="container">
      <login v-show="notLogin" @hasLogin="hasLogin"></login>
      <div v-show="!notLogin">
        <my-header></my-header>
        <address-show v-show="hasAddress" @noAddress="hideAddress"></address-show>
        <address-add v-show="!hasAddress" @saveAddress = "saveAddress"></address-add>
        <h5>我的消费清单</h5>
        <order-list :order_list="order_list" :order_info="order_info" @postComment_event="postComment_event" @tomyComment_event="tomyComment_event"></order-list>
        <button class="login_out" @click="login_out">退出登录</button>
        </div>
    </div>
</template>
<script>
import orderList from "./common/order_list.vue";
import addressAdd from "./common/address_add.vue";
import addressShow from "./common/address_show.vue";
import login from "../views/login.vue";
import myHeader from "./common/orderWrapper_header.vue";
export default {
  data() {
    return {
      order_list: [],
      order_info: [],
      hasAddress: true,
      notLogin: true,
      nickName: "",
      isBoy: true,
      avatar: "",
      hasAvatar: true
    };
  },
  computed: {
    address() {
      return `${this.province}${this.city}${this.area}${this.details}`;
    }
  },
  created() {
    this.getData();
  },
  methods: {
    saveAddress() {
      this.hasAddress = true;
    },
    hideAddress() {
      this.hasAddress = false;
    },
    _getData(url, obj) {
      return this.axios.get(url, { params: obj });
    },
    async getData() {
      var result = await Promise.all([this._getData("/order")]);
      //如果获取到消费订单信息
      if (result[0].data.code === 1) {
        this.order_list = this.order_list.concat(result[0].data.data);
        this.notLogin = false;
      }     
    },
    //退出登录
    login_out() {
      this.axios.get("/user/login_out").then(result => {
        if (result.data.code === 1) {
          this.$toast(result.data.msg);
          this.$router.push("/login");
        }
      });
    },
    postComment_event() {
      this.$emit("postComment_event");
    },
    tomyComment_event() {
      this.$emit("tomyComment_event");
    },
    hasLogin() {
      this.notLogin = false;
    },
    //替换图片事件
     change_avatar() {
     // 获取file域里的图片信息
     var formData = new FormData();
     //创建formdata对象
     var files = $("#changeAvatar")[0].files;
     for (var i =0; i< files.length; i++) {
       formData.append("imgFiles",files[i])
     }
    // 将文件信息 append 进入formdata对象  key值 为后台 single 设置的值 
    this.axios.post("/uploads/img",formData).then( (result) => {
      if(result.data.err==0) {
        this.show_oldInfo = false;
       this.avatar = result.data.data[0];
       //将修改后的图片存入user表
       this.axios.post("/user/change_myInfo",{
         avatar: this.avatar
       }).then(result => {
         if(result.data.code === -1) {
           this.$toast(result.data.msg);
           this.$router.push("/login");
         } 
         if(result.data.code === 1) {
           this.$toast(result.data.msg);
           this.avatar = result.data.data[0];
         }
       });
      }
    });
   }
  },
  components: {
    orderList,
    addressAdd,
    addressShow,
    login,
    myHeader
  }
};
</script>
<style scoped>
 .container{
   padding-bottom: 90px;
 }
.login_out {
  padding: 5px;
  background: #85392b;
  color: #fff;
  border: 0;
  outline: 0;
  font-size: 14px;
}
h5 {
  margin-top: 50px;
}
</style>
