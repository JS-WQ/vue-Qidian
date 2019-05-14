<template>
  <div class="rankbox" v-if="ranklist._id">
    <h2>{{ranklist.title}}</h2>
    <div class="ct">
      <div class="item" v-for="(book,index) in viewlist">
        <div class="left">
          <span
            class="icon"
            :class="{'first':pageIndex===1&&index+1===1,'second':pageIndex===1&&index+1===2,'third':pageIndex===1&&index+1===3}"
          >{{(index + 1)*pageIndex}}</span>
          <img :src="book.cover | getHttp">
        </div>
        <div class="mess">
          <h4>{{book.title}}</h4>
          <div class="author">
            <div>
              <img src="../../public/images/icon/user.png">
              <span>{{book.author}}</span>
            </div>
            <span class="majorCate">{{book.majorCate}}</span>
            <span class="line">|</span>
            <span class="minorCate">{{book.minorCate}}</span>
          </div>
          <div class="bottom">
            <p class="shortIntro">{{book.shortIntro}}</p>
            <span>书籍详情</span>
          </div>
        </div>
      </div>
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :total="ranklist.books.length"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ranklist: [],
      viewlist: [],
      pageIndex: 1,
      active: 'weekRank'
    }
  },
  methods: {
    getRankList: function () {
      this.axios.get(`https://novel.juhe.im/rank/${this.$route.params.id}`).then(res => {
        this.ranklist = res.data.ranking
        this.viewlist = res.data.ranking.books.slice(0, 10)
      })
    },
    handleCurrentChange: function (e) {
      this.pageIndex = e
      this.viewlist = this.ranklist.books.slice((e - 1) * 10, e * 10)
    },
    change: function (e) {
      if (e === 'month') {
        this.ranklist.id
      }
    }
  },
  filters: {
    getHttp: function (value) {
      if (!value) return ''
      let data = value.match(/http.*(jpg|png|gif)/)
      return decodeURIComponent(data[0])
    }
  },
  created () {
    this.getRankList()
  },
  watch: {
    '$route.path': function (newval, oldval) {
      if (newval === oldval) return
      this.getRankList()
    }
  }
}
</script>
<style lang='less' scoped>
.rankbox {
  width: 954px;
  h2 {
    text-align: left;
    padding-bottom: 20px;
    font-weight: 400;
  }
  .ct {
    margin-top: 20px;
    .item {
      display: flex;
      padding: 20px 0;
      border-bottom: 1px solid #e6e6e6;
      .left {
          position: relative;
        .icon {
          width: 22px;
          height: 24px;
          display: inline-block;
          position: absolute;
          color: #fff;
          font-weight: 500;
          line-height: 24px;
          background: rgba(0,0,0,.6);
        }
        .icon.first {
            background: #bf2c24;
        }
        .icon.second {
            background: #e67225;
        }
        .icon.third {
            background: #e6bf25;

        }
        img {
          width: 110px;
          height: 136px;
        }
        img:hover{
            transform: scale(1.1);
            transition: transform 0.4s;
        }
        margin-right: 18px;
      }
      .mess {
        text-align: left;
        flex: 1;
        h4 {
          font-size: 18px;
        }
        .author {
          display: flex;
          align-items: center;
          margin-top: 10px;
          margin-bottom: 30px;
          div {
            img {
              width: 16px;
              height: 16px;
              margin-right: 3px;
              vertical-align: middle;
            }
            margin-right: 8px;
          }
          span {
            font-size: 14px;
            color: #a6a6a6;
            vertical-align: middle;
          }
          .line {
            padding: 0 8px;
          }
        }
        .bottom {
          display: flex;
          justify-content: space-between;
          .shortIntro {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            line-height: 25px;
            color: #666666;
            width: 680px;
          }
          span {
            display: inline-block;
            background: #bf2c24;
            color: #fff;
            font-size: 14px;
            height: 34px;
            width: 100px;
            line-height: 34px;
            text-align: center;
          }
          span:hover{
              background: #ed4259;
          }
        }
      }
    }
  }
}
</style>
