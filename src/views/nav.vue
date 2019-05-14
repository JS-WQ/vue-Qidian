<template>
  <div class="navbox">
    <nav>
      <a class="classify">作品分类</a>
      <router-link class="nav-li home" to="/">首页</router-link>
      <router-link class="nav-li" to="/rank">排行</router-link>
      <router-link class='nav-li' :to="{name:'minor',params:{status:'hot',gender:'male',major:'仙侠',minor:'古典仙侠'}}">完本</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {},
  created () {}
}
</script>
<style lang='less' scoped>
.navbox{
    height: 40px;
    background: #3e3d43;
    nav{
        width: 1200px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        height: 100%;
        a{
            color:#fff;
            font-size: 18px;
            height:40px;
            line-height: 40px;
            padding: 0 35px;
        }
        .classify{
            background: #313035;
            transition: all 0.5s;
            margin-right: 50px;
            padding-right: 123px;
        }
        .classify:hover{
            background: #252428;
        }
        .nav-li:hover{
            background:#252428;
            border-top:2px solid #ed4259;
        }
    }
}
</style>
