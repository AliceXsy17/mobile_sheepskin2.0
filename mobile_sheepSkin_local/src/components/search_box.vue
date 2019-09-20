<template>
    <div class="searchBox_container">
        <div>
            <i class="iconfont icon-mjiantou-copy" @click="backIndex"></i>
        </div>
        <div class="search">
            <div><i class="iconfont icon-sousuo"></i></div>
            <input type="text" v-model="inputWord" @focus="show_history" @input="hide_history" placeholder="请输入搜索内容">
            <div> <i class="iconfont icon-guanbi" @click="clearInput"></i></div>
            <div>
                <ul class="showHistory" v-show="showHistory">
                    <li :class="{'hover_class':isHover[i]}" v-for="(item,i) of history_search" :key="i" @mouseenter="changeStyle(i,item)"  @mouseout="recoverStyle(i)" v-cloak>{{item}}</li>
                </ul>
            </div>
        </div>
        <div>
            <span @click="search_product(true)">搜索</span>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            inputWord: "",
            search_list: [],
            pno: 0,
            history_search: [],
            showHistory: false,
            isHover: []
        }
    },
    watch: {
      inputWord() {
          if(!this.inputWord) {
           this.show_history();
          }
      }
    },
    methods: {
        //输入的时候隐藏历史记录
        hide_history() {
        this.showHistory = false;
        },
        changeStyle(i,item) {
         this.isHover.splice(i,1,true);
         this.inputWord = item;
        },
        recoverStyle(i) {
        this.isHover.splice(i,1,false);
        },
        //获取焦点时
        show_history(){
         //先清空history_search
         this.history_search = [];
         //取出localStorage中的内容
         var string_content = localStorage.getItem("history");
         //如果localStorage中没有内容隐藏历史搜索框
         if(!string_content) {
          this.showHistory = false;
         } else {
            //将取出的localStorage中的内容转数组
           var arr = string_content.split(",");
           this.history_search = this.history_search.concat(arr);
           this.showHistory = true;  
         }           
        },
        changeNeedOrder() {
          this.needOrder = true;
        },
        backIndex() {
          this.$router.push("/index");
        },
        clearInput() {
            this.inputWord = "";
        },
        search_product(isSearch) {
            //点搜索是隐藏历史搜索记录
            this.showHistory = false;
            //先清空之前的search_list
            this.search_list = [];
            //如果是搜索，应查看第一页
            if(isSearch) {
             this.pno = 0;
            }
            if(!this.inputWord) {
             this.$toast("请输入您想搜索的关键词");
             return;
            } else {
               //如果搜索框不为空，将内容传给兄弟组件product_filter
               this.bus.$emit("hasInput",this.inputWord);
               //如果搜索框不为空，将内容存入localstorage中
               //先取出localStorage中已存的内容
               var string_content = localStorage.getItem("history")
                if(!string_content) {
                   localStorage.setItem("history", this.inputWord);
                } else {
                  //将字符串转化为数组
               var arr = string_content.split(",");
               //将搜索框中的内容和localStorage中原有的内容拼接好
                 arr.unshift(this.inputWord);
               //如果搜索词过多，可以删掉一些，释放空间          
               if(arr.length>6) {
                 arr = arr.slice(0,6);
               }
               //重新将拼接好的内容存入localStorage中
               localStorage.setItem("history",arr);
               }
               var obj = {
                kw:this.inputWord,
                pno: this.pno
                }
                this.axios.get("product/search",{params: obj}).then(result => {
                if(result.data.code === 1) {
                  this.search_list = this.search_list.concat(result.data.data);
                 //将数据传给父组件
                   this.$emit("getSearch",this.search_list,isSearch);
                }
                if (result.data.code === -1) {
                 //通知父组件没有查到商品
                 this.$emit("noSearch");
                }
            });
           
           }
        }
    }
}
</script>
<style scoped>
.searchBox_container {
    display: flex;
    justify-content: space-between;
    padding: 5px;
    align-items: center;
    color: #85392b;
}
.search{
    position: relative;
}
input{
    background: #85392b;
    height: 25px;
    width: 230px;
    border: 0;
    outline: 0;
    color: #fff;
    padding-left: 30px;
    font-size: 12px;
}
 .icon-sousuo, .icon-guanbi {
    position: absolute;
    color: #fff;
}
.icon-sousuo {
    left: 4px;
    top: 5px;
}
.icon-guanbi {
    right: 4px;
    top: 5px;
}
.icon-mjiantou-copy {
    color: #85392b;
    font-size: 18px;
    font-weight: 700;
}
.showHistory {
    position: absolute;
    width: 100%;
    left: 0;
    top: 27px;
    margin: 0;
    padding: 0;
    padding-top: 6px;
    list-style: none;
    border: 1px solid #85392b;
    background: #fff;
}
.showHistory li{
    padding: 5px 0;
    padding-left: 10px;
    text-align: left;
    border-bottom: 1px solid #85392b;
}
.showHistory li:last-child{
    border-bottom: none;
}
.hover_class{
    background:#85392b;
    color: #fff;
}
</style>
