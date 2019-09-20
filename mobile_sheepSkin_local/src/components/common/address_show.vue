<template>
   <div>    
  <h5>地址管理</h5>
  <div class="uname">
      <input type="text" v-model="uname">
  </div>
  <div class="phone">
      <input type="text" v-model="phone">
  </div>
  <div class="area">
      <input type="text" v-model="address"><i class="iconfont icon-arrow-right" @click="chooseArea"></i>
  </div>
  <v-distpicker v-show = "areaShow" @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea" type="mobile"></v-distpicker>  
  <div class="modify">
      <button @click="modifyAddr">修改</button>
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
          areaShow: false,
          province: "",
          city: "",
          area: ""
      }
  },
  created() {
    this.loadAddress();
  },
  methods: {
      loadAddress() {
      this.axios.get("address").then(result =>{
          if(result.data.data.length === 0) {
            this.$emit("noAddress");
            return;
          }
          if(result.data.code === 1) {
            this.uname = result.data.data[0].uname;
            this.phone = result.data.data[0].phone;
            if(result.data.data[0].province) {
              this.address += result.data.data[0].province;   
            }
            if(result.data.data[0].city) {
              this.address += result.data.data[0].city;   
            }
            if(result.data.data[0].area) {
              this.address += result.data.data[0].area;   
            }
             if(result.data.data[0].details) {
              this.address += result.data.data[0].details;   
            }   
          }
      });
      },
      onChangeProvince(province){
        this.address = "";
        this.address += province.value;
        this.province = province.value; 
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
      },
      modifyAddr() {
          //找到area的索引值
          var areaIndex = this.address.indexOf(this.area);
         //算出details部分的起始索引
          var detailsIndex = areaIndex+this.area.length;
          var details = this.address.slice(detailsIndex);
          this.axios.post("/address/modifyAddr",{
              uname: this.uname,
              phone: this.phone,
              province: this.province,
              city: this.city,
              area: this.area,
              details: details
          }).then( result => {
              if(result.data.code === 1) {
                this.$toast(result.data.msg);
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
      box-sizing: border-box;
  }
  .area {
      display: flex;
      align-items: center;
  }
  .modify {
      margin-top:10px;
  }
  .modify button{
      padding: 5px;
      border: 0;
      outline: 0;
      background: #85392b;
      color: #fff;
      font-size: 12px;
  }
  .icon-arrow-right {
      color: #85392b;
  }
</style>
