<template>
  <div class="chapter-box">
      <div class="chapterList">
          <li v-for="(chapters,index) in showData" :key="index">
              <router-link :to="{name:'readview',params:{id:chapters.link,index:index}}">{{chapters.title}}</router-link>
          </li>
      </div>
      <div class="more" @click="renderMore">{{more}}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      chapterData: [],
      showData: [],
      index: 1000,
      more: '加载更多',
      bookid: ''
    }
  },
  methods: {
    getChapter: function () {
      this.axios.get(`chapters/${this.bookid}?view=chapters`).then(res => {
        this.chapterData = res.data.chapters
        this.showData = this.chapterData.slice(0, this.index)
      })
    },
    getBookid: function () {
      // 获取正版源
      this.axios.get(`/zhuangxiu/btoc?view=summary&book=${this.$route.params.id}`).then(res => {
        this.bookid = res.data[0]._id
        this.getChapter()
      })
    },
    renderMore: function () {
      let begin = this.showData.length
      if (begin === this.chapterData.length) {
        this.more = '已经加载完了！'
        return
      }
      let end = begin + this.index
      this.showData.push(...this.chapterData.slice(begin, end))
    }
  },
  computed: {},
  components: {},
  created () {
    this.getBookid()
  }
}

</script>
<style lang='less' scoped>
a{color: #000;}
.chapter-box{
    width: 990px;
    margin: 0 auto;
    margin-top: 20px;
    border: 1px solid black;
    border-left: none;
    border-right: none;
    .chapterList{
        display: flex;
        flex-wrap: wrap;
        li{
            width: 330px;
            text-align: left;
            border-bottom: 1px solid #ebebeb;
            padding: 10px 0;
            color: #262626;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            a:hover{
                color: #ed4259;
            }
        }
    }
    .more{
        margin-top: 50px;
        margin-bottom: 100px;
        padding: 10px 20px;
        background: #ebebeb;

    }
}
</style>
