<template>
        <ul class="comments">
            <li v-for="(item,i) of comments_list" :key="i"
            v-show="comments_show(item.hasImg,item.isLowscore)">
                <div class="left_pic">
                  <img :src = "'http://127.0.0.1:5050/'+item.head_url" alt="">
                </div>
                <div class="right_content">
                    <div class="top">
                    <div class="nickname" v-text="item.nickname"></div>
                    <div>
                        <i v-for = "(itemstar,x) of 5" :key="x" class="iconfont icon-xingxing" :class="{'active':x<item.score}"></i>
                    </div>
                    <div>时间：{{item.mtime | getDate}}</div>
                    </div>
                    <div class="comments_content" v-text="item.comments"></div>
                    <div v-show = "item.comment_url">
                        <img v-for = "(item, i) of item.comment_url.split(',')" :key="i" :src = "'http://127.0.0.1:5050/'+item" alt="">
                    </div>
                </div>
            </li>
        </ul>
</template>
<script>
export default {
  props: {
    comments_list: {
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      selectedType: 3, //表示全部选择
      isLowscore: 0 //表示不显示低分
    };
  },
  created() {
    this.bus.$on("comments_filter", this.filter.bind(this));
  },
  methods: {
    filter(i) {
      if (i === 0) {
        this.selectedType = 3;
        this.isLowscore = 0;
      }
      if (i === 1) {
        //如果点击的是晒图评价
        this.selectedType = i; //将selectedType设为1
        this.isLowscore = 0;
      }
      if (i === 2) {
        //如果点击的是低分评价
        this.isLowscore = 1; //显示低分
      }
    },
    comments_show(hasImg, isLow) {
      if (this.isLowscore === 1) {
        //先判断是否显示低分评论
        return this.isLowscore === isLow;
      } else if (this.selectedType === 3) {
        //如果不是显示低分评论，判断是否显示图片
        return true;
      } else if (this.selectedType === 1) {
        return this.selectedType === hasImg;
      }
    }
  }
};
</script>
<style scoped>
.comments {
  list-style: none;
  padding: 0 10px;
  font-size: 12px;
}
.comments > li {
  display: flex;
  height: 160px;
  justify-content: space-between;
  margin-bottom: 40px;
}
.comments li .left_pic {
  width: 40px;
  height: 40px;
}
.top{
    display: flex;
    justify-content: space-between;
}
.comments li .left_pic img {
  width: 100%;
  height: 100%;
  border-radius: 100%;
}
.comments li .right_content {
  width: 85%;
  text-align: left;
}
.comments li .right_content i {
  color: #ccc;
  font-size: 12px;
}
.active {
  color: orange !important;
}
.comments li .right_content img {
  width: 95px;
  height: 80;
}
.comments li .comments_content {
  margin-top: 15px;
}
.comments li .nickname {
  margin-bottom: 6px;
}
</style>
