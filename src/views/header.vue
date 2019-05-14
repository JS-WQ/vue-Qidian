<template>
  <div>
    <div class="box">
      <img class="logo" src="https://qidian.gtimg.com/qd/images/logo.beebc.png">
      <div class="search" >
        <input type="text" v-model="searchText" @focus="focusSearch" @blur='blurSearch($event)'>
        <img class="searchSub" src="../images/搜索.png">
        <div class="searchSuggestion" v-show="suggestType">
          <router-link v-for="item in suggestions" tag="li" :to="{name:'detail',params:{id:item._id}}" @click="list">{{item.title}}</router-link>
        </div>
      </div>
      <div class="book-shelf">
          <span class="icon-shelf"></span>
          <span>我的书架</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchText: '',
      suggestions: [],
      suggestType: false
    }
  },
  methods: {
    blurSearch: function (e) {
      setTimeout(() => {
        this.suggestType = false
      }, 500)
    },
    focusSearch: function () {
      if (this.searchText !== '') {
        this.suggestType = true
      }
    },
    list: function () {
    }

  },
  watch: {
    searchText: function () {
      this.axios.get('/searchSuggestion' + this.searchText).then(res => {
        this.suggestType = true
        this.suggestions = res.data.books.slice(0, 12)
      })
    }
  },
  created () {}
}
</script>
<style lang='less' scoped>
.box{
    width: 1200px;
    margin: 14px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .search{
      position: relative;
        input{
            height:40px;
            outline: none;
            vertical-align: middle;
            width: 300px;
            padding-left: 10px;
        }
        .searchSub{
            height: 40px;
            width: 40px;
            background: #bf2c24;
            vertical-align: middle;

        }
        .searchSuggestion{
          position: absolute;
          left: 0;
          top: 40px;
          z-index: 99;
          background: #fff;
          padding-bottom: 5px;
          li{
            width: 300px;
            text-align: left;
            padding-left: 10px;
            padding-top: 10px;
            font-size: 15px;
          }
        }
    }
    .book-shelf{
        border: 1px solid #ccc;
        display: flex;
        padding: 8px 15px;
        .icon-shelf{
            height:20px;
            width: 20px;
            margin-right: 5px;
            background-image: url('../images/加入书架.png');
            background-repeat: no-repeat;
            background-size: contain;
        }
    }
    .book-shelf:hover{
        color: #fff;
        border: 1px solid #ed4259;
        background: #ed4259;
        transition: color 0.3s,background-color 0.3s;
        .icon-shelf{
            background-image: url('../images/书架.png');
            background-repeat: no-repeat;
            background-size: contain;
        }
    }
}
</style>
