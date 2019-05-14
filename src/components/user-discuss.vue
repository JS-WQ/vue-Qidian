<template>
  <div class="discuss" :class="{'big':pagination}">
    <div v-for="(item,index) in discussData">
      <div class="wrapper">
        <img :src="'http://statics.zhuishushenqi.com'+item.author.avatar">
        <div class="discussbox">
          <p class="nickname">
            {{item.author.nickname}}
            <span>发表了帖子</span>
          </p>
          <div class="content">
            <p class="title">{{item.title}}</p>
            <p>{{item.content}}</p>
          </div>
          <div class="bottom">
            <p class="updata">{{item.updated | timechange}}更新</p>
            <div class="votecount">
              <p class="voteImg"></p>
              <span>{{item.voteCount}}条回复</span>
            </div>
            <div class="likecount">
              <p class="likeImg"></p>
              <span>{{item.likeCount}}赞</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-link
        :to="{name:'discuss',params:{id:id}}"
        tag="li"
        replace
        v-if="!pagination"
      >去讨论区 ></router-link>
    <el-pagination
      @current-change="handleCurrentChange"
      :page-size="100"
      layout="prev, pager, next, jumper"
      v-if="pagination === true"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      discussData: [],
      pagination: false
    }
  },
  methods: {
    getDiscuss: function (e) {
      let start = 30 * e
      console.log(this.$route.params.id)
      this.axios
        .get(`/novel/book/discussions?&start=${start}&limit=20&book=${this.$route.params.id}`)
        .then(res => {
          console.log(res)
          if (res.data.posts.length === 0) {
            return
          }
          this.discussData = res.data.posts
          this.pagination = true
        })
    },
    handleCurrentChange: function (e) {
      this.getDiscuss(e)
    }
  },
  computed: {},
  components: {},
  created () {
    if (this.idiscuss === undefined) {
      this.getDiscuss(1)
    } else {
      this.discussData = this.idiscuss
    }
  },
  props: ['idiscuss', 'id'],
  filters: {
    timechange: function (val) {
      return val.split('T')[0] + ' ' + val.split('T')[1].split('.')[0]
    }
  }
}
</script>
<style lang='less' scoped>
.discuss {
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
      .discussbox {
        text-align: left;
        margin-left: 20px;
        .nickname {
          color: #3f5a93;
          span {
            color: #a6a6a6;
          }
        }
        .content {
          p {
            font-size: 15px;
            line-height: 22px;
          }
          .title {
            font-size: 18px;
            font-weight: bold;
            padding: 5px 0;
          }
        }
        .bottom {
          display: flex;
          margin-top: 5px;
          color: #a6a6a6;
          font-size: 14px;
          .votecount {
            margin: 0 30px;
            .voteImg {
              background-image: url("../../public/images/icon/回复.png");
              background-size: contain;
            }
          }
          .likecount {
            .likeImg {
              background-image: url("../../public/images/icon/赞.png");
              background-size: contain;
            }
          }
          .votecount:hover {
            color: #ed4259;
            .voteImg {
              background-image: url("../../public/images/icon/回复-a.png");
            }
          }
          .likecount:hover {
            color: #ed4259;
            .likeImg {
              background-image: url("../../public/images/icon/赞-a.png");
            }
          }
          div {
            display: flex;
            p {
              width: 20px;
              height: 20px;
              vertical-align: bottom;
            }
            span {
              padding-left: 4px;
            }
          }
        }
      }
    }
  }
  .router-link-active{
    background: #f7f6f2;
    color: #3f5a93;
    margin: 20px;
    padding: 10px 0;
  }
  .router-link-active:hover{
    color: #ed4259;
  }
  .el-pagination{
    margin-top:60px;
  }
}
.big{
  width: 990px;
  margin: 0 auto;
  margin-bottom: 100px;
}
</style>
