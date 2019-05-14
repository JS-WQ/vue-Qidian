<template>
  <div class="booklist" v-if="bookData.length>0">
    <div class="ct">
      <div class="list" v-for="(book,index) in bookData">
        <div class="left">
          <router-link
            :src="book.cover | getHttp"
            tag="img"
            :to="{name:'detail',params:{id:book._id}}"
          ></router-link>
        </div>
        <div class="mess">
          <router-link :to="{name:'detail',params:{id:book._id}}" tag="h4">{{book.title}}</router-link>
          <div class="author">
            <div>
              <img src="../../public/images/icon/user.png">
              <span>{{book.author}}</span>
            </div>
            <span class="majorCate">{{book.majorCate}}</span>
            <span class="line">|</span>
            <span class="minorCate">{{book.minorCate}}</span>
            <span class="tag" v-for="tag in book.tags">{{tag}}</span>
          </div>
          <div class="bottom">
            <p class="shortIntro">{{book.shortIntro}}</p>
            <span>{{book.lastChapter}}</span>
          </div>
        </div>
      </div>
    </div>
    <el-pagination
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :page-size="20"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      bookData: [],
      pageIndex: 1,
      start: 0,
      limit: 20,
      total: 0
    }
  },
  methods: {
    getBookData: function (e) {
      if (e === 1) {
        this.start = 0
        this.limit = 15
      } else {
        this.start = e * 20
        this.limit = 20
      }
      this.axios
        .get(
          `/novel/category-info?gender=${this.$route.params.gender}&type=${
            this.$route.params.status || 'hot'
          }&major=${this.$route.params.major}&minor=${this.$route.params
            .minor || ''}&start=${this.start}&limit=${this.limit}`
        )
        .then(res => {
          this.bookData = res.data.books
          this.total = res.data.total
        })
    },
    handleCurrentChange: function (e) {
      this.pageIndex = e
      this.getBookData(e)
      // this.bookData = this.bookData.books.slice((e - 1) * 10, e * 10);
    }
  },
  created () {
    this.getBookData(this.pageIndex)
  },
  filters: {
    getHttp: function (value) {
      let data = value.match(/http.*(jpg|png|gif)/i)
      let img = decodeURIComponent(data[0])
      return decodeURIComponent(img)
    }
  },
  watch: {
    '$route.path': function (newval, oldval) {
      this.getBookData(this.pageIndex)
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log('finish', from)
    console.log('finish', to)
    next()
  }
}
</script>
<style lang='less' scoped>
.booklist {
  width: 950px;
  .ct {
    display: flex;
    flex-wrap: wrap;
    margin-left: 15px;
    justify-content: space-between;
    .list {
      display: flex;
      margin-bottom: 20px;
      .left {
        img {
          width: 100px;
          height: 126px;
          box-shadow: 0 1px 6px rgba(0, 0, 0, 0.35);
        }
        img:hover {
          transform: scale(1.1);
          transition: transform 0.5s ease-out;
        }
      }
      .mess {
        text-align: left;
        flex: 1;
        margin-left: 15px;
        width: 340px;
        h4 {
          font-size: 18px;
          font-weight: 500;
          cursor: pointer;
        }
        h4:hover {
          color: #bf2c24;
        }
        .author {
          display: flex;
          align-items: center;
          margin: 5px 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          div {
            img {
              width: 15px;
              height: 15px;
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
          .minorCate {
            margin-right: 3px;
          }
          .tag {
            margin-right: 3px;
            color: #bf2c24;
          }
          .line {
            padding: 0 8px;
          }
        }
        .bottom {
          .shortIntro {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            line-height: 25px;
            color: #666666;
            width: 680px;
            font-size: 15px;
            width: 340px;
            margin-bottom: 10px;
          }
          span {
            font-size: 14px;
            color: #3f5a93;
          }
        }
      }
    }
  }
}
</style>
