<template>
  <div class="chapter-box" v-if="chapterData.length>0">
      <div class="close" @click="close">X</div>
      <div class="chapterList">
          <li v-for="(chapters,index) in chapterData" :key="index" :class="{'active':indexpage === index}">
              <router-link :to="{name:'readview',params:{id:chapters.link,index:index}}">{{chapters.title}}</router-link>
          </li>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    close: function () {
      this.$emit('changeshow', 'catalog')
    }
  },
  computed: {},
  components: {},
  created () {
  },
  props: ['chapterData', 'indexpage']
}

</script>
<style lang='less' scoped>
a{color: #000;}
.chapter-box{
    width: 800px;
    margin: 0 auto;
    background: #fff;
    height: 460px;
    position: absolute;
    left: 68px;
    top: 0;
    padding-top: 30px;
    .close{
        position: absolute;
        padding: 0 !important;
        right: 30px;
        top: 10px;
        cursor: pointer;
    }
    .chapterList{
        display: flex;
        flex-wrap: wrap;
        overflow:auto;
        height: 430px;
        padding-left: 23px;
        li{
            width: 380px;
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
        .active a{
            color: #ed4259;
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
