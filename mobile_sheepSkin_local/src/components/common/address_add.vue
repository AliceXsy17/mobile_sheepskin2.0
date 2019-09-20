<template>
   <div>
   <h5>添加地址</h5>    
  <div class="uname">
      <input type="text" placeholder="收货人" v-model="uname">
  </div>
  <div class="phone">
      <input type="text" placeholder="手机号码" v-model="phone">
  </div>
  <div class="area">
      <input type="text" placeholder="所在地区" v-model="address" @focus="chooseArea"><i class="iconfont icon-arrow-right" @click="chooseArea"></i>
  </div>  
  <v-distpicker v-show = "areaShow" @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea" type="mobile"></v-distpicker>
  <div class="details" v-show="detailShow">
   <input type="text" placeholder="详细地址：如道路、门牌号、小区、楼栋号、单元室等" v-model="details">
  </div>
  <div class="sure">
      <button @click="addAddr">确定</button>
  </div>
  </div>
</template>

<script>
import VDistpicker from 'v-distpicker'

export default {
  data() {
      return {
        uname: "",
        phone: "",
        address: "",
        provice: "",
        city: "",
        area: "",
        details: "",
        areaShow: false,
        detailShow: true
      }
  },
  components: { VDistpicker },
  methods: {
      onChangeProvince(province){
        this.address += province.value;
        this.provice = province.value;     
      },
      onChangeCity(city){
        this.address += city.value;
        this.city = city.value;         
      },
      onChangeArea(area){
        this.address += area.value;
        this.area = area.value;
      },  
      chooseArea() {
          this.areaShow = !this.areaShow;
          this.detailShow = !this.detailShow;
      },
      addAddr() {
        this.axios.post("/address/addAddr", {
            uname: this.uname,
            phone: this.phone,
            province: this.provice,
            city: this.city,
            area: this.area,
            details: this.details
        }).then( result => {
            if(result.data.code === -1) {
              this.$toast(result.data.msg);
              this.$router.push("/login");
            } else {
               this.$toast(result.data.msg);
               //通知父元素，隐藏添加地址页面，显示地址展示页面
               this.$emit("saveAddress"); 
               //通知兄弟组件加载用户地址数据
               this.bus.$emit("loadAddrData");
            }
        });
      }           
      }
}
</script>
<style scoped>
  input{
      width: 100%;
      height: 40px;
      border: 0;
      outline: 0;
      padding-left: 30px;
      border-bottom: 1px solid #85392b;
      font-size: 14px;
  }
  .area {
      display: flex;
      align-items: center;
  }
  .sure {
      margin-top:10px;
  }
  .sure button{
      padding: 5px;
      border: 0;
      outline: 0;
      background: #85392b;
      color: #fff;
      font-size: 12px;
  }
</style>
