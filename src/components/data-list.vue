<template>
  <div class="rank">
    <header>
      <h2>{{headtitle}}</h2>
      <span>更多...</span>
    </header>
    <div class="ct">
      <li v-for="book in rankList">
        <div class="info-left">
          <span class="minorCate">[{{book.minorCate}}]</span>
          <router-link class="title" tag="span" :to="{name:'detail',params:{id:book._id}}">{{book.title}}</router-link>
        </div>
        <span class="author">{{book.author}}</span>
      </li>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: ['headtitle', 'rankList']
}
</script>
<style lang='less' scoped>
.rank {
  border: 1px solid #e6e6e6;
  header {
    padding: 5px 0;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    justify-content: left;
    align-items: center;
    h2 {
      font-size: 18px;
      font-weight: bold;
      margin-left: 5px;
    }
    span{
        font-size: 0;
        margin-left: 5px;
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
          cursor: pointer;
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
.rank:hover header span{
    font-size: 14px;
    color:cornflowerblue;
}
</style>
