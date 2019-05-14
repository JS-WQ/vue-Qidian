<template>
  <div class="rank">
    <div class="navRank">
      <div class="maleRank">
        <h4>热门作品排行</h4>
        <div class="ct">
          <li v-for="item in navList.male">
            <router-link :to="{name:'rankstyle',params:{id:item._id}}">{{item.title}}</router-link>
          </li>
        </div>
      </div>
      <div class="cartonRank">
        <h4>热门漫画排行</h4>
        <div class="ct">
          <li v-for="item in navList.picture">
            <router-link :to="{name:'rankstyle',params:{id:item._id}}">{{item.title}}</router-link>
          </li>
        </div>
      </div>
      <div class="femaleRa">
        <h4>女士热门作品排行</h4>
        <div class="ct">
          <li v-for="item in navList.female">
            <router-link :to="{name:'rankstyle',params:{id:item._id}}">{{item.title}}</router-link>
          </li>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      navList: []
    }
  },
  methods: {
    getNavlist: function () {
      this.axios.get('https://novel.juhe.im/rank-category').then(res => {
        this.navList = res.data
      })
    },
    init: function () {
      this.getNavlist()
    }
  },
  created () {
    this.init()
  }
}

</script>
<style lang='less' scoped>
.rank{
  width: 1200px;
  margin: 0 auto;
  display: flex;
  margin-top: 20px;
  .navRank{
    width: 216px;
    margin-right: 20px;
    text-align: left;
    h4{
      margin-bottom: 17px;
      margin-top: 17px;
    }
    .ct{
      li{
        margin-bottom: 16px;
      }
      a{
        color:#000;
      }
      li a:hover{
        color: #ed4259
      }

      .router-link-active{
        font-weight: 600;
        color: #ed4259
      }
    }
    div{
      border-bottom: 1px solid #e6e6e6;
    }
    .femaleRa{
      border: none;
    }
  }
  .contentlist{
    flex: 1;
  }
}
</style>
