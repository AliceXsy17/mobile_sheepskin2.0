<template>
  <div>
    <h4 class="pullDownCon">{{pullDownTip}}</h4>
    <!-- 订位列表 -->
    <div class="reservation">
      <!-- 左边一级菜单(人数) -->
      <div>
        <ul class="menu-wrapper">
          <!-- current -->
          <li
            class="menu-item"
            v-for="(table,index) in Table"
            :key="index"
            :class="{current: index == currentIndex}"
            @click="clickList(index)"
            ref="menuList"
          >
            <span>{{table.capacity}}</span>
          </li>
        </ul>
      </div>
      <!-- 右边二级菜单(桌子详情) -->
      <div class="reservation-wrapper">
        <ul ref="itemList">
          <li class="table-li" v-for="(table,index1) in Table" :key="index1">
            <!-- 右边二级菜单列表项的标题 -->
            <div class="table-title">
              <h4>{{table.capacity}}</h4>
              <a href="javascript:;">查看更多</a>
            </div>
            <!-- 右边二级菜单列表项的内容 -->
            <ul class="table-type">
              <li v-for="(Tname,index) of table.category" :key="index">
                <div class="table_frame">
                  <div class="table_frame_top">
                    <img src="@/assets/reservation/Ecapacity_art_table.jpg" />
                    <div class="frame_ttop">
                      <h4>标题</h4>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. cum.</p>
                    </div>
                  </div>
                  <div class="frame_tbottom">
                    <mt-button
                      size="large"
                      type="danger"
                      class="res_time"
                      @click="changeState"
                    >{{Tname.picture}}</mt-button>
                    <mt-button size="large" type="danger" class="res_res" @click="getResInfo">预约</mt-button>
                  </div>
                    <mt-picker :slots="slots" @change="onResTimeChange" class="frame_hidetime"></mt-picker>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <xds-tabbar></xds-tabbar>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import Tabbar from "@/components/Tabbar";
export default {
  data() {
    return {
      ResInfo: {},
      DayArr: [],
      isResTime: false,
      pullDownTip: "",
      scrollY: 0, //右侧列表滑动的y轴坐标
      rightLiTops: [], //所有分类头部位置
      Table: [
        {
          capacity: "八仙过海",
          tag: "eight",
          category: {
            ChinaType: { picture: "暂时没有中国图片" },
            FranceType: { picture: "暂时没有法国图片" },
            BritainType: { picture: "暂时没有英国图片" },
            AmericaType: { picture: "暂时没有美国图片" }
          }
        },
        {
          capacity: "六合时邕",
          tag: "six",
          category: {
            ChinaType: { picture: "暂时没有中国图片" },
            FranceType: { picture: "暂时没有法国图片" },
            BritainType: { picture: "暂时没有英国图片" },
            AmericaType: { picture: "暂时没有美国图片" }
          }
        },
        {
          capacity: "五子登科",
          tag: "five",
          category: {
            ChinaType: { picture: "暂时没有中国图片" },
            FranceType: { picture: "暂时没有法国图片" },
            BritainType: { picture: "暂时没有英国图片" },
            AmericaType: { picture: "暂时没有美国图片" }
          }
        },
        {
          capacity: "扬名四海",
          tag: "four",
          category: {
            ChinaType: { picture: "暂时没有中国图片" },
            FranceType: { picture: "暂时没有法国图片" },
            BritainType: { picture: "暂时没有英国图片" },
            AmericaType: { picture: "暂时没有美国图片" }
          }
        },
        {
          capacity: "二人世界",
          tag: "second",
          category: {
            ChinaType: { picture: "暂时没有中国图片" },
            FranceType: { picture: "暂时没有法国图片" },
            BritainType: { picture: "暂时没有英国图片" },
            AmericaType: { picture: "暂时没有美国图片" }
          }
        },
        {
          capacity: "孤芳自赏",
          tag: "first",
          category: {
            ChinaType: { picture: "暂时没有中国图片" },
            FranceType: { picture: "暂时没有法国图片" },
            BritainType: { picture: "暂时没有英国图片" },
            AmericaType: { picture: "暂时没有美国图片" }
          }
        }
      ],
      demo1: [
        {
          capacity: "666啊",
          tag: "eight",
          category: {
            ChinaType: { picture: "有中国图片" },
            FranceType: { picture: "有法国图片" },
            BritainType: { picture: "有英国图片" },
            AmericaType: { picture: "有美国图片" }
          }
        },
        {
          capacity: "六合时邕",
          tag: "six",
          category: {
            ChinaType: { picture: "暂时没有中国图片" },
            FranceType: { picture: "暂时没有法国图片" },
            BritainType: { picture: "暂时没有英国图片" },
            AmericaType: { picture: "暂时没有美国图片" }
          }
        },
        {
          capacity: "五子登科",
          tag: "five",
          category: {
            ChinaType: { picture: "暂时没有中国图片" },
            FranceType: { picture: "暂时没有法国图片" },
            BritainType: { picture: "暂时没有英国图片" },
            AmericaType: { picture: "暂时没有美国图片" }
          }
        },
        {
          capacity: "扬名四海",
          tag: "four",
          category: {
            ChinaType: { picture: "暂时没有中国图片" },
            FranceType: { picture: "暂时没有法国图片" },
            BritainType: { picture: "暂时没有英国图片" },
            AmericaType: { picture: "暂时没有美国图片" }
          }
        },
        {
          capacity: "二人世界",
          tag: "second",
          category: {
            ChinaType: { picture: "暂时没有中国图片" },
            FranceType: { picture: "暂时没有法国图片" },
            BritainType: { picture: "暂时没有英国图片" },
            AmericaType: { picture: "暂时没有美国图片" }
          }
        },
        {
          capacity: "孤芳自赏",
          tag: "first",
          category: {
            ChinaType: { picture: "暂时没有中国图片" },
            FranceType: { picture: "暂时没有法国图片" },
            BritainType: { picture: "暂时没有英国图片" },
            AmericaType: { picture: "暂时没有美国图片" }
          }
        }
      ],
      demo: [
        {
          capacity: "各显神通",
          tag: "eight",
          category: {
            ChinaType: { picture: "没有中国图片" },
            FranceType: { picture: "没有法国图片" },
            BritainType: { picture: "没有英国图片" },
            AmericaType: { picture: "没有美国图片" }
          }
        },
        {
          capacity: "六合时邕",
          tag: "six",
          category: {
            ChinaType: { picture: "没有中国图片" },
            FranceType: { picture: "没有法国图片" },
            BritainType: { picture: "没有英国图片" },
            AmericaType: { picture: "没有美国图片" }
          }
        },
        {
          capacity: "五子登科",
          tag: "five",
          category: {
            ChinaType: { picture: "没有中国图片" },
            FranceType: { picture: "没有法国图片" },
            BritainType: { picture: "没有英国图片" },
            AmericaType: { picture: "没有美国图片" }
          }
        },
        {
          capacity: "扬名四海",
          tag: "four",
          category: {
            ChinaType: { picture: "暂时没有中国图片" },
            FranceType: { picture: "暂时没有法国图片" },
            BritainType: { picture: "暂时没有英国图片" },
            AmericaType: { picture: "暂时没有美国图片" }
          }
        },
        {
          capacity: "二人世界",
          tag: "second",
          category: {
            ChinaType: { picture: "暂时没有中国图片" },
            FranceType: { picture: "暂时没有法国图片" },
            BritainType: { picture: "暂时没有英国图片" },
            AmericaType: { picture: "暂时没有美国图片" }
          }
        },
        {
          capacity: "孤芳自赏",
          tag: "first",
          category: {
            ChinaType: { picture: "暂时没有中国图片" },
            FranceType: { picture: "暂时没有法国图片" },
            BritainType: { picture: "暂时没有英国图片" },
            AmericaType: { picture: "暂时没有美国图片" }
          }
        }
      ],
      slots: [
        {
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'right',
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: [],
          className: 'slot3',
          textAlign: 'center',
        },{
          divider: true,
          content: '-',
          className: 'slot4'
        },
        {
          flex: 1,
          values: ['10点', '11点', '12点', '13点', '14点', '15点','16点', '17点', '18点', '19点', '20点', '22点','23点'],
          className: 'slot5',
          textAlign: 'center',
        },{
          divider: true,
          content: '-',
          className: 'slot6'
        },
        {
          flex: 1,
          values: ['10点', '11点', '12点', '13点', '14点', '15点','16点', '17点', '18点', '19点', '20点', '22点','23点'],
          className: 'slot7',
          textAlign: 'left',
        }
      ]
    };
  },
  computed: {
    //   动态绑定class名
    currentIndex(index) {
      const { scrollY, rightLiTops } = this;
      return rightLiTops.findIndex((tops, index) => {
        this._initLeftScroll(index);
        return scrollY >= tops && scrollY < rightLiTops[index + 1];
      });
    }
  },
  mounted() {
    this.rightBscroll = new BScroll(".reservation-wrapper", {
      probeType: 1, //在滚动中触发scroll事件
      mouseWheel: true
    });
    this.rightBscroll.on("scroll", pos => {
      if (pos.y > 30) {
        this.pullDownTip = "正在刷新中";
      }
    });
    this.rightBscroll.on("touchEnd", pos => {
      if (pos.y > 30) {
        console.log(1223);
        // 测试用数据
        if (this.Table != this.demo) {
          this.Table = this.demo;
          this.pullDownTip = "刷新成功";
          setTimeout(() => {
            this.pullDownTip = "";
          }, 1000);
        } else if (this.Table != this.demo1) {
          this.Table = this.demo1;
          this.pullDownTip = "刷新成功";
          setTimeout(() => {
            this.pullDownTip = "";
          }, 1000);
        }
      }
    });
  },
  methods: {
    getResInfo() {
      console.log(123)
    },
    // 预约时间选择发生变化的事件
    onResTimeChange(picker, values) {
      if (values[2] > values[3]) {
        picker.setSlotValue(3, values[2]);
      }
      var select = picker.getValues();
      for(var i=0;i<this.slots[0].values.length;i++) {
        if(select[0] == this.slots[0].values[i]) {
          picker.setSlotValues(1, this.DayArr[i])
        }
      }
      // console.log(select);

    },
    // 获取日期的事件函数
    getDay() {
      var today = new Date();
      var month = today.getMonth() + 1;//月份
      var hours = today.getHours();//号数
      var year = new Date().getFullYear();
      var MonthArr = [];
      var DayArr = [];
      for(var i=month;i<=month+2;i++) {
        var Month = i + "月"
        MonthArr.push(Month);
        var maxday = new Date(year,i,0).getDate();
        var Day = [];
        for(var j=1;j<=maxday;j++) {
          Day.push(j);
        }
        DayArr.push(Day);
      }
      this.slots[0].values = MonthArr;
      this.DayArr = DayArr;
    },
    // 预约选择器的显示隐藏
    changeState(e) {
      var hideTime = e.target.parentElement.nextElementSibling;
      var hide = document.getElementsByClassName("frame_hidetime");
      if (hideTime.style.height == "") {
        for (var i = 0; i < hide.length; i++) {
          hide[i].style.height = "";
        }
        hideTime.style.height = 180 + "px";
        this.getDay();
        // console.log(demo);
      } else {
        hideTime.style.height = "";
      }
    },
    _initBScroll() {
      //左边滚动
      this.leftBscroll = new BScroll(".menu-wrapper", {
        click: true
      });
      //右边滚动
      this.rightBscroll = new BScroll(".reservation-wrapper", {
        probeType: 1, //在滚动中触发scroll事件
        scrollbar: {
          //添加滚动条显示
          fade: true,
          interactive: false // 1.8.0 新增
        }
      });
      //   监听右边滚动事件
      this.rightBscroll.on("scroll", pos => {
        this.scrollY = Math.abs(pos.y);
      });
    },
    _initRightHeight() {
      //   求出右边列表的高度
      let itemArray = []; //定义一个伪数组
      let top = 0; //窗口顶端
      itemArray.push(top);
      //获得右边标题所有li的集合
      let lis = this.$refs.itemList.getElementsByClassName("table-li");
      Array.prototype.slice.call(lis).forEach(li => {
        top += li.offsetHeight; //获取所有li的每一个高度
        itemArray.push(top);
      });
      this.rightLiTops = itemArray;
    },
    // 点击左边实现滚动
    clickList(index) {
      this.scrollY = this.rightLiTops[index];
      this.rightBscroll.scrollTo(0, -this.scrollY, 200);
    },
    //左右联动
    _initLeftScroll(index) {
      let menu = this.$refs.menuList;
      let el = menu[index];
      this.leftBscroll.scrollToElement(el, 200, 0, 0);
    }
  },
  created() {
    this.$nextTick(() => {
      //左右两边滚动
      this._initBScroll();
      //右边列表高度
      this._initRightHeight();
    });
  },
  components: {
    "xds-tabbar": Tabbar
  }
};
</script>
<style scoped>
/* 清除ul标签的左外边距 */
ul {
  list-style: none;
  padding: 0;
}
/* 正在刷新区域样式 */
.pullDownCon {
  margin-top: -5px;
  text-align: center;
}
/* 预约订位座位列表的框架 */
.reservation {
  display: flex;
  position: absolute;
  top: 50px;
  bottom: 50px;
  width: 100%;
  background-color: #F8F8FF;
  /* height: 636px; */
  overflow: hidden;
}
/* 一级菜单的样式 */
.menu-wrapper {
  background-color: #e0e0e0;
  width: 80px;
  flex: 0 0 80px;
}
/* 一级菜单的列表项样式 */
.menu-item {
  width: 100%;
  height: 60px;
  background-color: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  color: #666;
  position: relative;
}
/* 被选中的一级菜单列表项的样式 */
.current {
  color: var(--red);
  background: #fff;
}
/* 被选中的一级菜单列表项的导航条样式 */
.current::before {
  content: "";
  background-color: var(--red);
  width: 4px;
  height: 30px;
  position: absolute;
  left: 0;
}
/* 二级菜单的样式 */
.reservation-wrapper {
  flex: 1;
  background: #F8F8FF;
}
/* 二级菜单的标题样式 */
.table-title {
  display: flex;
  flex-direction: row;
  padding: 0 10px;
  height: 40px;
  align-items: center;
  justify-content: space-between;
  color: #999;
}
.table-title a {
  text-decoration: none;
  color: #9c9c9c;
  font-size: 14px;
}
.table-type {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border-bottom: 1px solid #ccc;
}
.table-type li {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 0;
}
.pullDownCon {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 50px;
  line-height: 50px;
}
/* 餐桌的框架样式 */
.table_frame {
  width: 95%;
  /* height: 200px; */
  background-color: #fff;
  box-sizing: border-box;
  padding: 5px;
  border: 1px solid #999;
  border-radius: 5px;
}
.table_frame img {
  display: block;
  width: 200px;
  /* height: 150px; */
}
/* 餐桌的框架顶部样式 */
.table_frame_top {
  display: flex;
  justify-content: space-between;
  width: 305px;
  height: 150px;
}
/*  */
.frame_ttop {
  display: flex;
  flex-direction: column;
}
.frame_ttop h4 {
  text-align: center;
  margin: 0;
  padding: 5px 0;
  line-height: 20px;
  border-bottom: 1px solid #e8e8e8;
}
.frame_ttop p {
  display: block;
  margin: 0;
  color: #999;
  box-sizing: border-box;
  padding-left: 5px;
}
.frame_tbottom {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
}
.frame_tbottom .res_time {
  width: 200px;
  height: 30px;
}
.frame_tbottom .res_res {
  width: 105px;
  height: 30px;
}
.frame_hidetime {
  width: 100%;
  height: 0px;
  background-color:#fff;
  transition: all 0.5s linear;
}
</style>
