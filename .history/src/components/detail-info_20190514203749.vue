<template>
  <div class="detail-info" v-if="bookData._id">
    <div class="crumbs-nav">
      <li class="majorCate">{{bookData.majorCate}} ></li>
      <li class="minorCate">{{bookData.minorCate}} ></li>
      <li class="title">{{bookData.title}}</li>
    </div>
    <div class="book-detail">
      <div class="book-information">
        <img :src="bookData.cover | getHttp">
        <div class="bookbox">
          <div class="bookinfo">
            <div class="left">
              <p>
                <span class="title">{{bookData.title}}</span>
                <span class="author">{{bookData.author}} 著</span>
              </p>
              <div class="book-tags">
                <li v-for="tag in bookData.tags">{{tag}}</li>
              </div>
              <div class="bookcount">
                <li>
                  {{bookData.wordCount | numberTranst}}
                  <span class="text">万字</span>
                </li>
                <li>
                  {{bookData.retentionRatio}}%
                  <span class="text">读者留存率</span>
                </li>
                <li>
                  {{bookData.serializeWordCount>0?bookData.serializeWordCount:0}}
                  <span
                    class="text"
                  >日更新字数</span>
                </li>
              </div>
            </div>
            <div class="right" v-if="bookData.rating !== null">
              <p class="score" v-if="bookData.rating.score">{{bookData.rating.score | numberFix}}</p>
              <p v-if="bookData.rating.count">{{bookData.rating.count}}人评价</p>
            </div>
          </div>
          <div class="bookBottom">
            <div class="left">
              <a href class="wz">免费试读</a>
              <a href>加入书架</a>
              <a href>投票互动</a>
              <a href class="wz">下载APP</a>
            </div>
            <div class="right">
              <span class="subscribe">订阅</span>
              <span>下载</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-nav">
      <li @click="change" :class="{active: !iroute}">作品信息</li>
      <router-link
        :to="{name:'chapters',params:{id:bookData._id}}"
        tag="li"
        replace
      >目录({{bookData.chaptersCount}}章)</router-link>
      <router-link
        :to="{name:'discuss',params:{id:bookData._id}}"
        tag="li"
        replace
        v-if="bookData.rating !== null"
      >作品讨论({{bookData.rating.count || 0}}条)</router-link>
    </div>
    <div v-show="!iroute" class="book-content-wrap">
      <div class="content-left">
        <div class="textinfo">{{bookData.longIntro}}</div>
        <div class="updata">
          <span>最近更新</span>
          <!-- <router-link :to="{name:'readview',params:{id:chapters.link}}">{{chapters.title}}</router-link> -->
          <span>{{bookData.lastChapter}}</span>
          <p>{{bookData.updated | timechange}}</p>
        </div>
        <div class="bookRecommend">
          <h2>喜欢本书的人还喜欢</h2>
          <div class="wrap">
            <li v-for="book in recommendData" >
              <router-link :to="{name:'detail',params:{id:book._id}}" tag="div">
                <img :src="book.cover | getHttp">
              </router-link>
              <p class="title">{{book.title}}</p>
              <p class="ratio">{{book.otherReadRatio}}%的用户读过</p>
            </li>
          </div>
        </div>
        <div class="user-commentWrap">
          <div class="commentHe">
            <li @click="changediscuss(true)" class="godiscuss" :class="{'active':isdiscuss}">作品讨论区</li>
            <li @click="changediscuss(false)" class="gocomment" :class="{'active':!isdiscuss}">书友评价</li>
          </div>
          <div class="user-discuss" v-show="isdiscuss" >
            <Vdiscuss :idiscuss='limitDiscussData' :id="id" v-if="limitDiscussData.length > 0"></Vdiscuss>
          </div>
          <div class="user-comment" v-show="!isdiscuss" >
            <Vcomment :comment='limitCommentData' @gopage = 'getComment' v-if='limitCommentData.length > 0'></Vcomment>
          </div>
        </div>
      </div>
      <div class="content-right">
        <div class="otherBooks">
          <h2>作者其它作品</h2>
          <template>
            <el-carousel indicator-position="none" arrow="never">
              <el-carousel-item v-for="(book,index) in otherBooks" :key="index" style="height:400px;">
                <router-link tag='img' :src='book.cover | getHttp' :to="{name:'detail',params:{id:book._id}}"></router-link>
                <div class="message">
                  <p class="title">{{book.title}}</p>
                  <div class="ratio">
                    <span>{{book.minorCate}}</span>
                    <span>{{book.retentionRatio}}</span>
                  </div>
                  <p class="shortIntro">{{book.shortIntro}}</p>
                </div>
              </el-carousel-item>
            </el-carousel>
          </template>

        </div>
      </div>
    </div>
    <keep-alive>
      <router-view v-show="iroute"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import discuss from './user-discuss'
import comment from './user-comment'
export default {
  data () {
    return {
      bookData: [],
      iroute: false,
      id: '',
      recommendData: [],
      otherBooks: [],
      updataMessage: {},
      author: '',
      isdiscuss: true,
      limitDiscussData: [],
      limitCommentData: []
    }
  },
  methods: {
    getDetailData: function (id) {
      this.id = this.id || this.$route.params.id
      this.axios.get(`https://novel.juhe.im/book-info/${this.id}`).then(res => {
        this.bookData = res.data
        this.author = res.data.author
        this.getOtherBooks()
      })
    },
    change: function () {
      this.$router.push(`/detail/${this.id}`)
    },
    getRecommendData: function () {
      this.axios.get(`https://novel.juhe.im/recommend/${this.id}`).then(res => {
        this.recommendData = res.data.books.slice(0, 6)
      })
    },
    getOtherBooks: function () {
      let author = this.bookData.author
      this.axios.get(`https://novel.juhe.im/author-books?author=${author}`).then(res => {
        this.otherBooks = res.data.books
      })
    },
    getUpdata: function () {
      this.axios.get(`https://api05iye5.zhuishushenqi.com/book?view=updated&id=${this.id}`).then(res => {
        this.updataMessage = res.data[0]
      })
    },
    changediscuss: function (bool) {
      this.isdiscuss = bool
    },
    getlimitData: function () {
      this.axios.get(`https://novel.juhe.im/book/discussions?book=${this.id}`).then(res => {
        this.limitDiscussData = res.data.posts
      })
      this.axios.get(`https://novel.juhe.im/book/short-reviews?&start=0&limit=30&book=${this.id}`).then(res => {
        this.limitCommentData = res.data.docs
        this.limitDiscussData.id = this.id
      })
    },
    getComment: function (start) {
      this.axios.get(`https://novel.juhe.im/book/short-reviews?&start=${start}&limit=30&book=${this.id}`).then(res => {
        this.limitCommentData = res.data.docs
      })
    },
    init: function () {
      this.getDetailData()
      this.getRecommendData()
      this.getUpdata()
      this.getlimitData()
    }
  },
  created () {
    this.init()
  },
  filters: {
    getHttp: function (value) {
      if (!value) return ''
      let data = value.match(/http.*(jpg|png|gif)/)
      return decodeURIComponent(data[0])
    },
    numberTranst: function (value) {
      if (!value) return 0
      return value % 10000
    },
    numberFix: function (value) {
      if (!value) return 0
      return value.toFixed(1)
    },
    timechange: function (val) {
      return val.split('T')[0] + val.split('T')[1].split('.')[0]
    }
  },
  /*
  watch: {
    "$route.path": function(newval, oldval) {
      if (this.iroute === false && this.index === true) {
        this.iroute = true;
      }
      if (this.iroute === true && this.index === false) {
        this.iroute = false;
        this.index = true;
      }
    }
  },
  */

  beforeRouteUpdate (to, from, next) {
    if (to.name === 'detail') {
      this.id = to.params.id
      this.iroute = false
      console.log(2)
      this.init()
      next()
    }
    if (to.name === 'chapters' || to.name === 'discuss') {
      this.iroute = true
      console.log('1')
      next()
    }
  },
  components: {
    Vdiscuss: discuss,
    Vcomment: comment
  }
}
</script>
<style lang='less' scoped>
.detail-info {
  .crumbs-nav {
    display: flex;
    width: 1200px;
    margin: 0 auto;
    margin-top: 50px;
    li {
      background: rgba(0, 0, 0, 0.2);
      color: #ffffff;
      font-size: 15px;
      padding: 2px 6px;
      border-radius: 1px;
    }
  }
  .book-detail {
    width: 990px;
    margin: 0 auto;
    margin-top: 100px;
    text-align: left;
    .book-information {
      display: flex;
      img {
        width: 180px;
        height: 220px;
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.35), 0 0 5px #f9f2e9 inset;
      }
      .bookbox {
        margin-left: 20px;
        .bookinfo {
          display: flex;
          margin-bottom: 30px;
          .left {
            margin-right: 50px;
            p {
              .title {
                font-size: 28px;
                font-weight: bold;
                margin-right: 10px;
              }
              .author {
                font-size: 14px;
              }
            }
            .book-tags {
              display: flex;
              margin: 12px 0;
              li {
                padding: 2px 4px;
                border: 1px solid #ffb0b4;
                color: #bf2c24;
                border-radius: 12px;
                font-size: 14px;
                padding: 0 10px;
                margin-right: 10px;
              }
            }
            .bookcount {
              display: flex;
              margin-bottom: 10px;
              li {
                font-size: 20px;
                color: #262626;
                padding: 0 20px;

                .text {
                  color: #6666;
                  font-size: 14px;
                }
              }
              li:nth-child(1) {
                padding-left: 0;
              }
              li:nth-child(2) {
                border-right: 1px solid #e6e6e6;
                border-left: 1px solid #e6e6e6;
              }
            }
          }
          .right {
            p {
              font-size: 14px;
              color: #6666;
            }
            .score {
              font-size: 38px;
              color: #000;
              text-align: right;
            }
          }
        }
        .bookBottom {
          display: flex;
          .left {
            margin-right: 50px;
            a {
              padding: 10px 25px;
              border: 1px solid #3f5a93;
              color: #3f5a93;
              margin-right: 5px;
            }
            a:hover {
              color: #2972cc;
              border-color: #2972cc;
              background: #f0f5ff;
            }
            .wz {
              background: #bf2c24;
              border-color: #bf2c24;
              color: #fff;
            }
            .wz:hover {
              background: #ed4259;
              border-color: #ed4259;
              color: #fff;
            }
          }
          .right {
            span {
              padding: 0 9px;
            }
            .subscribe {
              border-right: 1px solid #666666;
            }
          }
        }
      }
    }
  }
  .content-nav {
    display: flex;
    width: 990px;
    margin: 0 auto;
    margin-top: 30px;
    border-bottom: 1px solid #e6e6e6;
    li {
      padding: 10px 20px;
      font-size: 18px;
      color: #a6a6a6;
    }
    li.router-link-active {
      color: #ed4259;
      border-bottom: 2px solid #ed4259;
    }
    li.active {
      color: #ed4259;
      border-bottom: 2px solid #ed4259;
    }
  }
  .book-content-wrap {
    width: 990px;
    margin: 0 auto;
    display: flex;
    margin-top: 25px;
    justify-content: space-between;
    margin-bottom: 200px;
    .content-left {
      width: 700px;
      .textinfo {
        padding-left: 20px;
        text-indent: 18px;
        text-align: left;
        line-height: 28px;
      }
      .updata {
        display: flex;
        padding: 20px 0;
        align-items: center;
        border: 1px solid #e6e6e6;
        border-left: none;
        border-right: none;
        span {
          color: #999;
        }
        a {
          margin: 0 40px;
          color: #3f5a93;
        }
        p {
          color: #999;
          font-size: 15px;
        }
      }
      .bookRecommend {
        margin: 20px 0;
        h2{
            text-align: left;
          }
        .wrap {
          display: flex;
          margin-top: 12px;
          justify-content: space-between;
          li {
            width: 106px;
            img {
              width: 106px;
              height: 132px;
            }
            p{
              text-align: left;

            }
            .title {
              font-size: 15px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .ratio{
              font-size: 12px;
            }
          }
        }
      }
      .user-commentWrap{
        .commentHe{
          display: flex;
          justify-content: left;
          padding-block-end: 10px;
          border-bottom: 1px solid #e6e6e6;
          font-size: 22px;
          font-weight: 500;
          .godiscuss{
            padding-right: 10px;
            border-right: 2px solid #a6a6a6;
          }
          .gocomment{
            padding: 0 10px;
          }
          li{
            color: #a6a6a6;
          }
          .active{
            color: #262626;
          }
        }
        .user-discuss{}
        .user-comment{}
      }
    }
    .content-right {
      width: 225px;
      .otherBooks{
        background: #f7f6f2;
        h2{
          padding: 12px 0;
        }
        .el-carousel{
          height: 400px !important;
          .el-carousel__container{
          }
        }
        img{
          width: 150px;
        }
        .message{
          padding: 0 10px;
          .title{
            font-size: 18px;
            margin-top: 10px;
            font-weight: bold;
          }
          .ratio{
            span{
              color: #bf2c24;
              font-size: 14px;
            }
            margin: 8px;
          }
          .shortIntro{
            font-size: 15px;
            color: grey;
            height: 64px;
            overflow: hidden;
            line-height: 21px;
          }
        }
      }
    }
  }
}
</style>
