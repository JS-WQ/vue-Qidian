<template>
  <div class="comment">
    <div v-for="(item,index) in comment" :key="index">
      <div class="wrapper">
        <img :src="'http://statics.zhuishushenqi.com'+item.author.avatar">
        <div class="commentbox">
          <div class="nickname">
            {{item.author.nickname}}
            <span>评</span>
            <p :class="'star' + item.rating"></p>
          </div>
          <div class="content">
            <p>{{item.content}}</p>
          </div>
          <div class="bottom">
            <p class="updata">{{item.updated | timechange}}更新</p>
          </div>
        </div>
      </div>
    </div>
    <el-pagination
      @current-change="handleCurrentChange"
      :page-size="100"
      layout="prev, pager, next, jumper">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    handleCurrentChange: function (e) {
      this.$emit('gopage', e * 30)
    }
  },
  computed: {},
  components: {},
  created () {},
  props: ['comment'],
  filters: {
    timechange: function (val) {
      return val.split('T')[0] + ' ' + val.split('T')[1].split('.')[0]
    }
  }
}
</script>
<style lang='less' scoped>
.comment {
  div {
    .wrapper {
      display: flex;
      align-items: top;
      padding: 14px 0;
      border-bottom: 1px solid #e6e6ee;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .commentbox {
        text-align: left;
        margin-left: 20px;
        .nickname {
          color: #3f5a93;
          display: flex;
          align-items: center;
          span {
            color: #a6a6a6;
            font-size: 14px;
            margin: 0 8px;
          }
          p {
            width: 70px;
            height: 12px;
            overflow: hidden;
          }
        }
        .content {
          p {
            font-size: 15px;
            line-height: 22px;
          }
        }
        .bottom {
          display: flex;
          margin-top: 5px;
          color: #a6a6a6;
          font-size: 14px;
        }
      }
    }
    .star5 {
      background-image: url("../../public/images/icon/score.png");
      background-repeat: no-repeat;
    }
    .star4 {
      background-image: url("../../public/images/icon/score.png");
      background-repeat: no-repeat;
      background-position-y: -10px;
    }
    .star3 {
      background-image: url("../../public/images/icon/score.png");
      background-repeat: no-repeat;
      background-position-y: -21px;
    }
    .star2 {
      background-image: url("../../public/images/icon/score.png");
      background-repeat: no-repeat;
      background-position-y: -32px;
    }
    .star1 {
      background-image: url("../../public/images/icon/score.png");
      background-repeat: no-repeat;
      background-position-y: -43px;
    }
  }
  .el-pagination{
    margin-top: 30px;
  }
}
</style>
