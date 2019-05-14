<template>
  <div class="rankBox" >
    <header>
      <h2>{{headtitle}}</h2>
      <span>更多...</span>
    </header>
    <div class="ct" v-if="rankList.length > 0">
      <router-link class="firstItem" v-if="firstMess.length>0" tag='li' :to="{name:'detail',params:{id:firstMess[0]._id}}">
        <div class="infoleft">
          <h3>NO.1</h3>
          <p class="title">{{firstMess[0].title}}</p>
          <p class="latelyFollower">{{firstMess[0].latelyFollower}}月票</p>
          <p>
            <span>{{firstMess[0].minorCate}}</span>
            <span>·</span>
            <span>{{firstMess[0].author}}</span>
          </p>
        </div>
        <div class="infoRight">
            <img :src="firstMess[0].cover | getHttp">
        </div>
      </router-link>
      <router-link v-for="(book,index) in rankList" tag="li" :to="{name:'detail',params:{id:book._id}}">
        <span class="rankIndex">{{index+2}}</span>
        <div class="info-left">
          <span class="title">{{book.title}}</span>
          <span class="latelyFollower">{{book.latelyFollower}}</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      firstMess: {}
    }
  },
  methods: {},
  computed: {},
  components: {},
  created () {
    this.$nextTick(() => {
      this.firstMess = this.rankList.splice(0, 1)
    })
  },
  filters: {
    getHttp: function (value) {
      if (!value) return ''
      let data = value.match(/http.*(jpg|png|gif)/)
      return decodeURIComponent(data[0])
    }
  },
  props: ['headtitle', 'rankList']
}
</script>
<style lang='less' scoped>
.rankBox{
    border: 1px solid #e6e6ee;
    width: 280px;
    header{
        display: flex;
        align-items: center;
        padding:8px 0;
        border-bottom: 1px solid #e6e6ee;
        justify-content: space-between;
        padding: 8px 10px;
        h2{}
        span{}
    }
    .ct{
        padding: 0 6px;
        .firstItem{
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #e6e6ee;
            padding: 5px 0;
            .infoleft{
                text-align: left;
                h3{
                    display: inline-block;
                    padding: 1px 3px;
                    background: #bf2c24;
                    color: #ffffff;
                    font-size: 17px;
                }
                .title{
                    font-size: 18px;
                    padding: 4px 0;
                }
                .latelyFollower{
                    font-size: 16px;
                    color: #bf2c24;
                    padding-bottom: 3px;
                }
                p{
                    span{
                        color: #a6a6a6;
                        font-size: 14px;
                        margin: 0 1px;
                    }
                }
            }
            .infoRight{
                img{
                    width: 60px;
                    height: 74px;
                }
            }
        }
        li{
            display: flex;
            align-items: center;
            cursor: pointer;
            .rankIndex{
                display: inline-block;
                width: 16px;
                height: 16px;
                background: #ededed;
                margin-right: 10px;
                font-size: 13px;
                font-weight: bold;
            }
            .info-left{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .title{}
                .latelyFollower{
                    font-size: 14px;
                    color: #b3b3b3;
                }
                border-bottom: 1px solid #e6e6ee;
                flex: 1;
                padding:6px 0;
            }
        }
    }
}
</style>
