<template>
  <div class="home">
    <div class="focus-box">
      <div class="classify-list" v-if="classifyData.length>0">
        <router-link v-for="item in classifyData" tag="li" :to="{name:'classisypage',params:{id:item.name,gender:'male'}}">
          <span :class="classifyName[item.name]" class="icon"></span>
          <div class="classify-message">
            <p class="classify-name">{{item.name}}</p>
            <p class="classify-count">{{item.bookCount}}</p>
          </div>
        </router-link>
      </div>
      <div class="focus-slider" v-if="slidersData.length>0">
        <el-carousel :interval="4000" type="card" height="410px">
          <el-carousel-item v-for="(item,index) in slidersData" :key="index">
            <router-link :src="item.cover | getHttp" tag="img" :to="{name:'detail',params:{id:item._id}}"></router-link>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="hot-search" v-if="HotSearchList.length>0">
        <div class="box">
          <h3>大家都在搜</h3>
          <div class="content">
            <li v-for="(item,index) in HotSearchList" :key="index" >
              <router-link :to="{name:'detail',params:{id:item.book}}">{{item.word}}</router-link>
            </li>
          </div>
        </div>
      </div>
    </div>
    <div class="bookct">
      <div class="female-classify">
        <div class="header">
          <img src="../images/女生.png">
          <h2>女性</h2>
        </div>
        <div class="ct">
          <router-link v-for="item in femaleData" :to="{name:'classisypage',params:{id:item.name,gender:'female'}}" tag="li">
            <span :class="classifyName[item.name]" class="icon"></span>
            <div class="classify-message">
              <p class="classify-name">{{item.name}}</p>
              <p class="classify-count">{{item.bookCount}}</p>
            </div>
          </router-link>
        </div>
      </div>
      <div class="qidianHot">
        <header>
          <h2>起点热门榜单</h2>
          <span>查看更多...</span>
        </header>
        <div class="content">
          <div class="focus-wrapper">
            <div class="focus-slider" v-if="qidianHotSliders.length>0">
              <el-carousel
                :interval="4000"
                type="card"
                height="160px"
                :autoplay="false"
                @change="hotChange"
              >
                <el-carousel-item v-for="(item,index) in qidianHotSliders" :key="index">
                  <router-link :src="item.cover | getHttp" tag="img" :to="{name:'detail',params:{id:item._id}}"></router-link>
                </el-carousel-item>
              </el-carousel>
            </div>
            <div class="focus-info">
              <p class="bookName">{{currentHot.title}}</p>
              <p class="Intro">{{currentHot.shortIntro}}</p>
              <router-link tag="span" :to="{name:'detail',params:{id:currentHot._id}}">书籍详情</router-link>
            </div>
          </div>
          <div class="hotLis" v-if="qidianHotRecom.length>0">
            <router-link v-for="book in qidianHotRecom" :to="{name:'detail',params:{id:book._id}}" tag="li">
              <p class="bookName">{{book.title}}</p>
              <p class="latelyFollower">{{book.latelyFollower }} 人在追</p>
              <p class="Intro">{{book.shortIntro}}</p>
            </router-link>
          </div>
        </div>
      </div>
      <VdataList :headtitle="hotRanktitle" :rankList="HotRank"></VdataList>
    </div>
    <div class="rank-wrapper">
      <VrankList :headtitle="kranktitle" :rankList="khotData" v-if="khotData.length>0"></VrankList>
      <VrankList :headtitle="qidianRanktitle" :rankList="qidianRank" v-if="qidianRank.length>0"></VrankList>
      <VrankList :headtitle="zhonghengRanktitle" :rankList="zhonghengRank" v-if="zhonghengRank.length>0"></VrankList>
      <VrankList :headtitle="HeyueRanktitle" :rankList="HeyueRank" v-if="HeyueRank.length>0"></VrankList>
    </div>
    <div class="manualRank">
      <div class="Rank">
        <header>
          <p>
            <img src="../../public/images/icon/男.png">男频完本
          </p>
          <span>查看更多...</span>
        </header>
        <div class="ct" v-if="maleManuList.length>0">
          <router-link v-for="book in maleManuList" :to="{name:'detail',params:{id:book._id}}" tag="li">
            <img :src="book.cover | getHttp">
            <div class="text-info">
              <p class="title">{{book.title}}</p>
              <div>
                <span class="author">{{book.author}}</span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="Rank">
        <header>
          <p>
            <img src="../../public/images/icon/女生.png">女频完本
          </p>
          <span>查看更多...</span>
        </header>
        <div class="ct" v-if="femaleManuList.length>0">
          <router-link v-for="book in femaleManuList" :to="{name:'detail',params:{id:book._id}}" tag="li">
            <img :src="book.cover | getHttp">
            <div class="text-info">
              <p class="title">{{book.title}}</p>
              <div>
                <span class="author">{{book.author}}</span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dataList from '../components/data-list'
import rankList from '../components/rank-list'
export default {
  data () {
    return {
      classifyData: [],
      femaleData: [],
      classifyName: {
        玄幻: 'xuanhuan',
        奇幻: 'qihuan',
        武侠: 'wuxia',
        仙侠: 'xianxia',
        都市: 'dushi',
        职场: 'zhichang',
        历史: 'lishi',
        军事: 'junshi',
        游戏: 'youxi',
        竞技: 'jingji',
        科幻: 'kehuan',
        灵异: 'lingyi',
        同人: 'tongren',
        轻小说: 'qingxiaoshuo',
        古代言情: 'gudaiyanqing',
        现代言情: 'xiandaiyanqing',
        青春校园: 'qingchunxiaoyuan',
        纯爱: 'chunai',
        玄幻奇幻: 'xuanhuan',
        武侠仙侠: 'xianxia',
        女尊: 'nvzun',
        莉莉: 'lili',
        悬疑灵异: 'lingyi',
        游戏竞技: 'jingji'
      },
      HotweekData: [],
      slidersData: [],
      HotSearchList: [],
      qidianHotSliders: [],
      qidianHotRecom: [],
      currentHot: [],
      khotData: [],
      femaleManuList: [],
      maleManuList: [],
      kranktitle: '17k 鲜花榜',
      hotRanktitle: '追书最热榜',
      goodRanktitle: '好评榜',
      deepRanktitle: '潜力榜',
      qidianRanktitle: '起点月票榜',
      zhonghengRanktitle: '纵横月票榜',
      HeyueRanktitle: '和阅读原创榜',
      cartoonData: [],
      HotRank: [],
      goodRank: [],
      deepRank: [],
      qidianRank: [],
      zhonghengRank: [],
      HeyueRank: []
    }
  },
  methods: {
    getClassifyData: function () {
      fetch('https://novel.juhe.im/categories')
        .then(response => {
          return response.json()
        })
        .then(data => {
          this.classifyData = data.male
          this.femaleData = data.female
        })
    },
    getHotweekData: function () {
      this.axios.get('/hotweek').then(res => {
        this.HotweekData = res.data.ranking.books
        this.slidersData = res.data.ranking.books.slice(0, 5)
      })
    },
    getHotSearchData: function () {
      this.axios.get('https://novel.juhe.im/hot-books').then(res => {
        this.HotSearchList = res.data.newHotWords.slice(0, 8)
      })
    },
    getQidianHotData: function () {
      this.axios
        .get('https://novel.juhe.im/rank/54d4306c321052167dfb75e4')
        .then(res => {
          this.qidianHotSliders = res.data.ranking.books.slice(0, 6)
          this.qidianHotRecom = res.data.ranking.books.slice(6, 12)
        })
    },
    get17kHotData: function () {
      this.axios
        .get('https://novel.juhe.im/rank/54d430e9a8cb149d07282496')
        .then(res => {
          this.khotData = res.data.ranking.books.slice(0, 15)
        })
    },
    getQidianRank: function () {
      // 起点月票榜
      this.axios.get('https://novel.juhe.im/rank/54d4306c321052167dfb75e4').then(res => {
        this.qidianRank = res.data.ranking.books.slice(0, 15)
      })
    },
    getZhonghengRank: function () {
      // 纵横月票榜
      this.axios.get('https://novel.juhe.im/rank/54d430962c12d3740e4a3ed2').then(res => {
        this.zhonghengRank = res.data.ranking.books.slice(0, 15)
      })
    },
    getHeyueRank: function () {
      // 和阅原创榜
      this.axios.get('https://novel.juhe.im/rank/54d4312d5f3c22ae137255a1').then(res => {
        this.HeyueRank = res.data.ranking.books.slice(0, 15)
      })
    },
    getManuList: function () {
      // 女频完结榜
      this.axios
        .get('https://novel.juhe.im/rank/564eb8a9cf77e9b25056162d')
        .then(res => {
          this.femaleManuList = res.data.ranking.books.slice(0, 8)
        })
      // 男频完结榜
      this.axios
        .get('https://novel.juhe.im/rank/564eb878efe5b8e745508fde')
        .then(res => {
          this.maleManuList = res.data.ranking.books.slice(0, 8)
        })
    },
    getHotRank: function () {
      // 追书热榜
      this.axios.get('https://novel.juhe.im/rank/54d42d92321052167dfb75e3').then(res => {
        this.HotRank = res.data.ranking.books.slice(0, 15)
      })
    },
    hotChange: function (val1, val2) {
      this.currentHot = this.qidianHotSliders[val1]
    }
  },
  filters: {
    getHttp: function (value) {
      if (!value) return ''
      let data = value.match(/http.*(jpg|png|gif)/)
      return decodeURIComponent(data[0])
    }
  },
  computed: {},
  components: {
    VdataList: dataList,
    VrankList: rankList
  },
  created () {
    this.getClassifyData()
    this.getHotweekData()
    this.getHotSearchData()
    this.getQidianHotData()
    this.get17kHotData()
    this.getManuList()
    this.getQidianRank()
    this.getZhonghengRank()
    this.getHotRank()
    this.getHeyueRank()
  }
}
</script>

<style lang='less' scoped>
@import "../../public/css/icon.less";
.home {
  .focus-box {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    .classify-list {
      width: 230px;
      height: 422px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      border: 1px solid #e6e6e6;
      li {
        transition: all 0.5s;
        cursor: pointer;
        display: flex;
        padding: 10px 0;
        width: 88px;
        span {
          display: inline-block;
          width: 35px;
          height: 40px;
        }
        .classify-message {
          margin-left: 5px;
          text-align: left;
          .classify-count {
            color: #999;
            font-size: 14px;
          }
        }
      }
      li:hover {
        color: #ed4259;
      }
    }
    .focus-slider {
      width: 740px;
      margin: 0 10px;
      margin-top: 10px;
      .el-carousel {
        .el-carousel__container {
          .el-carousel__item {
            height: 400px;
            width: 390px;
            img {
              height: 400px;
              width: 368px;
            }
          }
        }
      }
    }
    .hot-search {
      border: 1px solid #e6e6e6;
      background: #fcfcfc;
      width: 200px;
      height: 286px;
      .box {
        h3 {
          padding: 10px 0;
        }
        .content {
          padding: 0 20px;
          li {
            text-align: left;
            margin: 5px 0;
            a{
              color: #000;
            }
          }
        }
      }
    }
  }
  .bookct {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    .female-classify {
      width: 230px;
      border: 1px solid #e6e6e6;
      .header {
        display: flex;
        justify-content: center;
        padding: 5px 0;
        border-bottom: 1px solid #e6e6e6;
        img {
          width: 35px;
          height: 35px;
        }
        h2 {
        }
      }
      .ct {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        li {
          transition: all 0.5s;
          cursor: pointer;
          display: flex;
          padding: 10px 0;
          width: 88px;
          align-items: center;
          span {
            display: inline-block;
            width: 35px;
            height: 40px;
          }
          .classify-message {
            margin-left: 5px;
            text-align: left;
            .classify-count {
              color: #999;
              font-size: 14px;
            }
          }
        }
        li:hover {
          color: #ed4259;
        }
      }
    }
    .qidianHot {
      width: 720px;
      margin: 0 10px;
      border: 1px solid #e6e6ee;
      header {
        font-size: 18px;
        h2 {
          text-align: left;
        }
        span {
          cursor: pointer;
        }
        border-bottom: 1px solid #e6e6e6;
        padding: 5px 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .content {
        width: 720px;
        .focus-wrapper {
          padding: 10px;
          padding-bottom: 0;
          border-bottom: 1px solid #e6e6e6;
          display: flex;
          .focus-slider {
            width: 300px;
          }
          .focus-info {
            width: 300px;
            height: 200px;
            margin-left: 20px;
            .bookName {
              text-align: left;
            }
            .Intro {
              margin-top: 10px;
              margin-bottom: 35px;
              text-align: left;
            }
            span {
              display: inline-block;
              padding: 5px 26px;
              background: #bf2c24;
              color: #fff;
              border-radius: 12px;
              transition: color 0.3s, background-color 0.3s;
              cursor: pointer;
            }
            span:hover {
              background: #ed4259;
            }
          }
        }
        .hotLis {
          display: flex;
          flex-wrap: wrap;
          width: 720px;
          justify-content: space-around;
          padding-top: 16px;
          li {
            width: 210px;
            padding: 10px 0;
            cursor: pointer;
          }
        }
        .bookName {
          font-weight: bold;
          font-size: 18px;
        }
        .latelyFollower {
          color: #ed4259;
          font-size: 15px;
        }
        .Intro {
          display: -webkit-box;
          overflow: hidden;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          font-size: 14px;
        }
      }
    }
    .kHot {
      border: 1px solid #e6e6e6;
      header {
        padding: 5px 0;
        border-bottom: 1px solid #e6e6e6;
        h2 {
          font-size: 18px;
          font-weight: bold;
        }
      }
      .ct {
        padding: 0 1px;
        li {
          font-size: 14px;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #e6e6e6;
          padding: 5px 0;
          .info-left {
            display: flex;
            .minorCate {
              color: grey;
            }
            .title {
              max-width: 80px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              text-align: left;
              padding-left: 2px;
            }
          }
          .author {
            color: grey;
          }
        }
        li:nth-last-child(1) {
          border: none;
        }
      }
    }
  }
  .rank-wrapper{
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    margin-top:20px;
  }
  .cartoon {
    width: 1200px;
    margin: 0 auto;
    margin-top: 20px;
    header {
      font-size: 17px;
      font-weight: bold;
      text-align: left;
      padding: 10px 0;
      border-bottom: 1px solid #e6e6e6;
      background: #f4f2ef;
      display: flex;
      align-items: center;
      justify-content: space-between;
      div {
        display: flex;
        align-items: center;
        img {
          width: 30px;
          height: 30px;
          margin-left: 15px;
          margin-right: 5px;
        }
      }
      span{
        margin-right: 15px;
        font-weight: normal;
      }
    }
    .content {
      display: flex;
      justify-content: space-around;
      background: #f4f2ef;
      padding: 20px 0;
      li {
        width: 120px;
        img {
          width: 120px;
          height: 160px;
          box-shadow: 5px 6px 6px #84808091;
        }
        .text-info {
          p {
            width: 120px;
            text-align: left;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .title {
            margin-top: 5px;
            margin-bottom: 14px;
            font-size: 15px;
          }
          .author {
            color: #999;
            font-size: 14px;
          }
        }
      }
    }
  }
  .manualRank {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    margin-top: 20px;
    margin-bottom: 500px;
    .Rank {
      margin-right: 10px;
      header {
        padding: 10px 15px;
        background: #f4f2ef;
        border-bottom: 1px solid #e6e6e6;
        p {
          font-size: 18px;
          font-weight: bold;
          text-align: left;
          display: flex;
          align-items: center;
          img {
            width: 20px;
            height: 20px;
            margin-right: 5px;
          }
        }
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      width: 590px;
    }
    .ct {
      display: flex;
      flex-wrap: wrap;
      background: #f4f2ef;
      justify-content: space-between;
      padding: 10px 0;
      li {
        padding: 10px 20px;
        cursor: pointer;
        img {
          width: 100px;
          height: 120px;
          box-shadow: 5px 6px 6px #84808091;
        }
        .text-info {
          width: 100px;
          .title {
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin: 8px 0;
          }
          div {
            .author {
              font-size: 13px;
              color: #999;
            }
            .minorCate {
            }
          }
        }
      }
    }
  }
}
</style>
