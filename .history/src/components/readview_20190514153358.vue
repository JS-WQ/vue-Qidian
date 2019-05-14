<template>
  <div class="readview" @scroll.native="scrollHandler">
    <div class="readbox">
      <div class="setNav" ref="setNav">
        <div class="navCatalogBtn" :class="{'active':chapshow}">
          <div class="icon" @click="show('catalog')">
            <span></span>
            <li>目录</li>
          </div>
          <vchapter v-show="chapshow" :chapterData='chapterData' :indexpage='indexpage' @changeshow='show'></vchapter>
        </div>
      </div>
      <div class="content">
        <nav>
          <li>首页</li>
        </nav>
        <div class="cont">
          <h2>{{chapterMess.title}}</h2>
          <div class="text-info">
            <div class="title">
              <span></span>
              {{bookData.title}}
            </div>
            <div class="author">
              <span></span>
              {{bookData.author}}
            </div>
          </div>
          <div v-html="mess" class="textCont"></div>
        </div>
        <footer>
          <li class="prevChap" @click="prevChap">上一章</li>
          <router-link class="catalog" :to="{name:'chapters',params:{id:bookid}}" tag="li">目录</router-link>
          <li class="nextChap" @click="nextChap">下一章</li>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import chapter from './chapshow'
export default {
  data () {
    return {
      chapterMess: {},
      bookid: '',
      bookData: [],
      mess: [],
      indexpage: 0,
      chapterData: [],
      chapshow: false
    }
  },
  methods: {
    getText: function () {
      this.axios.get('/chapterMess/' + this.$route.params.id).then(res => {
        this.chapterMess = res.data.chapter
        console.log(res)
        this.mess =
          '<p class="views">' +
          this.chapterMess.cpContent.replace(
            /\n+|\n/g,
            '</p><p class="views">'
          )
      })
    },
    getDetailData: function () {
      if (this.bookid === '') {
        this.bookid = localStorage.getItem('mybookid')
      }
      this.axios.get(`/novel/book-info/${this.bookid}`).then(res => {
        this.bookData = res.data
      })
    },
    getChapter: function () {
      this.axios.get(`chapters/${this.bookid}?view=chapters`).then(res => {
        this.chapterData = res.data.chapters
      })
    },
    getBookid: function () {
      // 获取正版源
      this.axios
        .get(`/zhuangxiu/btoc?view=summary&book=${this.bookid}`)
        .then(res => {
          this.bookid = res.data[0]._id
          this.getChapter()
        })
    },
    prevChap: function () {
      if (this.indexpage === 0) return
      this.$router.push({
        name: 'readview',
        params: {
          id: this.chapterData[this.indexpage - 1].link,
          index: this.indexpage - 1
        }
      })
    },
    nextChap: function () {
      if (this.indexpage === this.chapterData.length) return
      this.$router.push({
        name: 'readview',
        params: {
          id: this.chapterData[this.indexpage + 1].link,
          index: this.indexpage + 1
        }
      })
    },
    init: function () {
      this.getText()
      this.getDetailData()
      this.getBookid()
    },
    scrollHandler: function () {
      let scrollTop = document.documentElement.scrollTop
      var timer = true
      if (!timer) return
      timer = false
      setTimeout(() => {
        if (scrollTop <= 150) {
          this.$refs.setNav.style.top = 150 - scrollTop + 'px'
        } else {
          this.$refs.setNav.style.top = 0
        }
        timer = true
      }, 16)
    },
    show: function (e) {
      if (e === 'catalog') {
        this.chapshow = !this.chapshow
      }
    }
  },
  created () {
    this.init()
  },
  mounted () {
    window.addEventListener('scroll', this.scrollHandler, true)
  },
  beforeRouteEnter (to, from, next) {
    if (from.name === 'chapters') {
      next(Vue => {
        Vue.bookid = from.params.id
        Vue.indexpage = from.params.index
        localStorage.setItem('mybookid', from.params.id)
        Vue.getDetailData()
      })
    } else {
      next()
    }
  },
  beforeRouteUpdate (to, from, next) {
    if (to.name === 'readview') {
      this.indexpage = to.params.index
      this.getText()
      next()
    }
  },
  components: {
    vchapter: chapter
  }
}
</script>
<style lang='less'>
.readview {
  background: #ede7da;
  .readbox {
    width: 1200px;
    margin: 0 auto;
    .setNav {
      height: 160px;
      transition: all 0.3s;
      position: fixed;
      top: 150px;
      >div {
        padding: 17px 0;
        border: 1px solid #d8d8d8;
        background: #f8f3e9;
        width: 58px;
        span {
          display: inline-block;
          width: 20px;
          height: 20px;
        }
      }
      >.active{
        background: #fff;
        width: 68px;
        border-right: none;
      }
      div:hover {
        color: #ed4259;
      }
      .navCatalogBtn {
        border-bottom: none;
        span {
          background-image: url("../../public/images/icon/章节目录.png");
          background-size: contain;
        }
      }
      .navCatalogBtn:hover span {
        background-image: url("../../public/images/icon/章节目-a.png");
      }
      .navSetBtn {
        span {
          background-image: url("../../public/images/icon/设 置.png");
          background-size: contain;
        }
      }
      .navSetBtn:hover {
        span {
          background-image: url("../../public/images/icon/设 置-a.png");
        }
      }
    }
    .content {
      width: 800px;
      padding-left: 62px;
      .cont {
        background: #f8f3e9;
        border: 1px solid #d8d8d8;
        h2 {
          font-weight: 500;
          width: 670px;
          margin: 0 auto;
          margin-top: 60px;
          text-align: left;
        }
        .text-info {
          display: flex;
          width: 670px;
          margin: 0 auto;
          margin-top: 16px;
          margin-bottom: 18px;
          div {
            transition: all 0.3s;
            font-size: 14px;
            color: #bfbfbf;
            span {
              display: inline-block;
              width: 19px;
              height: 19px;
              vertical-align: bottom;
            }
          }
          .title {
            margin-right: 23px;
            span {
              background-image: url("../../public/images/icon/书籍.png");
              background-size: contain;
            }
          }
          .title:hover {
            color: #ed4259;
            span {
              background-image: url("../../public/images/icon/书籍-a.png");
            }
          }
          .author {
            span {
              background-image: url("../../public/images/icon/icon-awsauthor.png");
              background-size: contain;
            }
          }
          .author:hover {
            color: #ed4259;
            span {
              background-image: url("../../public/images/icon/icon-awsauthor-a.png");
            }
          }
        }
        .textCont {
          text-align: left;
          width: 670px;
          margin: 0 auto;
          .views {
            line-height: 2.3;
          }
          p {
            font-size: 18px;
            line-height: 1.8;
            padding: 5px 0;
            text-indent: 20px;
          }
        }
      }
      footer {
        display: flex;
        background: #f8f3e9;
        margin-top: 20px;
        margin-bottom: 35px;
        li {
          flex: 1;
          padding: 10px 0;
          border: 1px solid #d8d8d8;
        }
        li:hover {
          color: #ed4259;
        }
        .catalog {
          border-left: 1px solid #d8d8d8;
          border-right: 1px solid #d8d8d8;
        }
      }
    }
  }
  h2 {
    font-weight: 500;
  }
  p {
    white-space: pre-line;
    line-height: 13px;
    text-align: left;
  }
}
</style>
