<template>
  <div class="classify-box">
    <div class="categorie" v-if="subCategories.length>0">
      <div class="left">
        <router-link v-for="item in subCategories[0].mins" :to="{name:'minor',params:{status:'hot',gender:$route.params.gender,major:$route.params.id,minor:item}}" tag="li">{{item}}</router-link>
      </div>
      <div class="right">
        <li>{{$route.params.id}}排行</li>
        <li>{{$route.params.id}}完本</li>
        <li>{{$route.params.id}}免费</li>
      </div>
    </div>
    <div class="content">
      <div class="weeklist">
        <div class="left">
          <h4>本周强推</h4>
          <div class="ct">
            <li v-for="book in weeklist">
              <router-link :to="{name:'detail',params:{id:book._id}}">{{book.title}}</router-link>
              <span>{{book.author}}</span>
            </li>
          </div>
        </div>
        <div class="right">
          <div class="channel-focus">
            <div class="sliderBox">
              <div v-for="book in weekslide">
                <a class="imgbox">
                  <router-link :src="book.cover | getHttp" tag="img" :to="{name:'detail',params:{id:book._id}}"></router-link>
                </a>
                <p class="shadow"></p>
                <router-link :to="{name:'detail',params:{id:book._id}}" class="title">{{book.title}}</router-link>
                <p class="shortIntro">{{book.shortIntro}}</p>
              </div>
            </div>
            <div class="listshow">
              <h3>新书精选</h3>
              <div class="ct">
                <li v-for="book in weekshow">
                  <router-link :to="{name:'detail',params:{id:book._id}}" class="title">{{book.title}}</router-link>
                  <span class="point">·</span>
                  <span class="author">{{book.author}}</span>
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="newbook">
        <h3>{{$route.params.id}}新书</h3>
        <div class="ct">
          <li v-for="book in newBookData">
            <router-link :to="{name:'detail',params:{id:book._id}}" :src="book.cover | getHttp" tag="img"></router-link>
            <div class="mess">
              <router-link :to="{name:'detail',params:{id:book._id}}" class="title">{{book.title}}</router-link>
              <p class="shortInfo">{{book.shortIntro}}</p>
              <div>
                <div class="author">
                  <img src="../../public/images/icon/user.png">
                  <span>{{book.author}}</span>
                </div>
                <span class="minorCate">{{book.minorCate}}</span>
              </div>
            </div>
          </li>
        </div>
      </div>
      <div class="hotClassify">
        <h3>热门分类</h3>
        <div class="ct" v-for="(item,index) in hotClassify" :key="index" v-if="item[0].length>0 && item[1].length>0">
          <div class="left">
            <h4>[{{item.title}}]</h4>
            <el-carousel height="280px" indicator-position="none" arrow="never" :interval="8000">
              <el-carousel-item v-for="(book,index) in item[0]" :key="index">
                <router-link :to="{name:'detail',params:{id:book._id}}" :src="book.cover | getHttp" tag="img"></router-link>
                <router-link :to="{name:'detail',params:{id:book._id}}" tag="h5">{{book.title}}</router-link>
                <p class="author">{{book.author}}</p>
                <p class="shortIntro">{{book.shortIntro}}</p>
                <router-link :to="{name:'detail',params:{id:book._id}}" class="read-btn">书籍详情</router-link>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="right">
            <li v-for="(book,index) in item[1]">
              <router-link :src="book.cover | getHttp" tag="img" :to="{name:'detail',params:{id:book._id}}"></router-link>
              <div class="mess">
                <router-link :to="{name:'detail',params:{id:book._id}}" tag='h4'>{{book.title}}</router-link>
                <p>{{book.shortIntro}}</p>
                <div class="author">
                  <img src="../../public/images/icon/user.png">
                  <span>{{book.author}}</span>
                </div>
              </div>
            </li>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      subCategories: [],
      weeklist: [],
      weekslide: [],
      weekshow: [],
      newBookData: [],
      hotClassify: []
    }
  },
  methods: {
    getsubCategories: function () {
      let gender = this.$route.params.gender
      this.axios.get('https://novel.juhe.im/sub-categories').then(res => {
        let data = res.data[gender]
        this.subCategories = data.filter(item => {
          return item.major === this.$route.params.id
        })
        this.getHotclassify()
      })
    },
    getWeekData: function () {
      this.axios
        .get(
          `https://novel.juhe.im/category-info?gender=${this.$route.params.gender}&major=${
            this.$route.params.id
          }&start=0&limit=19`
        )
        .then(res => {
          this.weeklist = res.data.books.slice(0, 10)
          this.weekslide = res.data.books.slice(10, 16)
          this.weekshow = res.data.books.slice(16)
        })
    },
    getNewData: function () {
      // 新书
      this.axios
        .get(
          `https://novel.juhe.im/category-info?gender=${
            this.$route.params.gender
          }&type=new&major=${this.$route.params.id}&start=0&limit=11`
        )
        .then(res => {
          this.newBookData = res.data.books
        })
    },
    getHotclassify: function () {
      this.subCategories[0].mins.forEach(item => {
        this.axios
          .get(
            `https://novel.juhe.im/category-info?gender=${
              this.$route.params.gender
            }&type=hot&major=${
              this.$route.params.id
            }&minor=${item}&start=0&limit=12`
          )
          .then(res => {
            let arr = []
            arr.title = item
            let sliders = res.data.books.slice(0, 4)
            let list = res.data.books.slice(4)
            arr.push(sliders, list)
            this.hotClassify.push(arr)
          })
      })
    },
    init: function () {
      this.getsubCategories()
      this.getWeekData()
      this.getNewData()
    }
  },
  computed: {},
  components: {},
  created () {
    this.init()
  },
  filters: {
    getHttp: function (value) {
      if (!value) return ''
      let data = value.match(/http.*(jpg|png|gif)/)
      return decodeURIComponent(data[0])
    }
  }
}
</script>
<style lang='less' scoped>
.classify-box {
  width: 1200px;
  margin: 0 auto;
  a{
    color: #000;
  }
  .categorie {
    display: flex;
    margin: 15px 0;
    .left {
      border-right: 1px solid #000;
    }
    .right {
      margin-left: 20px;
    }
    div {
      display: flex;
      li {
        cursor: pointer;
        font-weight: 700;
        font-size: 14px;
        padding-right: 20px;
      }
      li:hover {
        color: #ed4259;
      }
    }
  }
  .content {
    margin-bottom: 200px;
    .weeklist {
      display: flex;
      border-top: 1px solid #000;
      .left {
        width: 216px;
        background: #f7f6f2;
        margin-right: 20px;
        h4 {
          padding: 16px 0;
        }
        .ct {
          li {
            padding: 8px 0;
            margin: 0 8px;
            border-bottom: 1px solid #e6e6e6;
            display: flex;
            justify-content: space-between;
            align-items: center;
            a {
              font-size: 14px;
            }
            a:hover {
              color: #ed4259;
            }
            span {
              color: #a6a6a6;
              font-size: 12px;
            }
            span:hover {
              color: #000000;
            }
          }
          li:last-child {
            border: none;
          }
        }
      }
      .right {
        background: #f7f6f2;
        flex: 1;
        .channel-focus {
          .sliderBox {
            display: flex;
            justify-content: space-between;
            margin: 0 20px;
            padding: 20px 0;
            border-bottom: 1px solid #e6e6e6;
            div {
              width: 134px;
              .imgbox {
                display: inline-block;
                width: 134px;
                height: 170px;
                background-image: url("../../public/images/icon/book_bg.png");
                background-size: contain;
                background-repeat: no-repeat;
                text-align: left;
                img {
                  width: 125px;
                  height: 169px;
                }
              }
              .imgbox:hover img {
                transform-origin: 0 100% 0;
                transform: rotateY(-25deg);
                transition: transform 0.3s ease 0s;
              }
              .shadow {
                transition: all 0.3s;
                height: 8px;
                background: url("../../public/images/icon/deep-shadow.png");
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                margin: 8px 0;
              }
              .title {
                font-size: 16px;
                font-weight: 700;
                margin-bottom: 5px;
              }

              .shortIntro {
                font-size: 14px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                overflow: hidden;
                color: #a6a6a6;
              }
            }
            div:hover .shadow {
              background: url("../../public/images/icon/deep_shadow-a.png");
            }
          }
          .listshow {
            margin: 0 20px;
            border-top: #a6a6a6;
            display: flex;
            padding: 20px 0;
            h3 {
              display: inline-block;
              width: 50px;
              height: 50px;
              background: #ed4259;
              color: #fff;
              font-size: 15px;
              padding: 5px;
              margin-right: 20px;
            }
            .ct {
              flex: 1;
              display: flex;
              flex-wrap: wrap;
              justify-content: space-around;
              li {
                width: 250px;
                text-align: left;
                padding: 2px 0;
                cursor: pointer;
                .title {
                  font-size: 16px;
                }
                .point {
                  margin: 0 5px;
                }
                .author {
                  font-size: 13px;
                  color: #666;
                }
              }
            }
          }
        }
      }
      .title:hover {
        color: #ed4259;
      }
    }
    .newbook {
      margin-top: 25px;
      h3 {
        font-size: 26px;
        text-align: left;
        padding-bottom: 10px;
        border-bottom: 1px solid #666;
      }
      .ct {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        li {
          width: 300px;
          display: flex;
          padding: 15px 0;
          border-bottom: 1px solid #e6e6e6;
          img {
            width: 100px;
            height: 120px;
          }
          img:hover {
            transform: scale(1.1);
            transition: transform 0.3s;
          }
          .mess {
            text-align: left;
            padding-left: 10px;
            .title:hover {
              color: #ed4259;
            }
            .shortInfo {
              width: 180px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              margin-top: 15px;
              margin-bottom: 42px;
            }
            div {
              font-size: 13px;
              color: #a6a6a6;
              display: flex;
              justify-content: space-between;
              .author {
                display: flex;
                align-items: center;
                img {
                  width: 16px;
                  height: 16px;
                  margin-right: 3px;
                }
              }
              .minorCate {
                padding: 1px 3px;
                border: 1px solid #e6e6e6;
              }
            }
          }
        }
      }
    }
    .hotClassify {
      margin-top: 25px;
      h3 {
        font-size: 26px;
        text-align: left;
        padding-bottom: 10px;
      }
      .ct {
        margin-bottom: 20px;
        border-top: 1px solid #666;
        display: flex;
        .left {
          width: 220px;
          background: #f7f5f0;
          margin-right: 20px;
          h4 {
            font-size: 20px;
            padding: 8px 0;
          }
          .el-carousel {
            h5 {
              font-size: 18px;
              padding: 3px 15px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              cursor: pointer;
            }
            img {
              width: 110px;
              height: 140px;
              cursor: pointer;
            }
            .author {
              color: #ed4259;
              font-size: 14px;
            }
            .shortIntro {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              padding: 5px 8px;
            }
            .read-btn {
              display: inline-block;
              padding: 3px 15px;
              border-radius: 12px;
              background: #bf2c24;
              color: #fff;
              margin-top: 16px;
              cursor: pointer;
            }
          }
        }
        .right {
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          li {
            display: flex;
            img {
              width: 90px;
              height: 110px;
              cursor: pointer;
            }
            .mess {
              margin-left: 10px;
              text-align: left;
              width: 130px;
              h4 {
                margin-top: 5px;
                cursor: pointer;
              }
              p {
                width: 130px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 14px;
                color: grey;
                margin: 23px 0;
              }
              .author {
                display: flex;
                align-items: center;
                img {
                  width: 16px;
                  height: 16px;
                  margin-right: 3px;
                }
                span{
                  font-size: 14px;
                  color: #a6a6a6;
                  overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
