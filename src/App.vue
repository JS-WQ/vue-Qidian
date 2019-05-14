<template>
  <div id="app">
    <Vheader></Vheader>
    <Vnav></Vnav>
    <router-view/>
  </div>
</template>

<script>
import header from '../src/views/header'
import nav from '../src/views/nav'
export default {
  data () {
    return {
    }
  },
  components: {
    Vheader: header,
    Vnav: nav
  }
}
</script>

<style lang="less">
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  a{text-decoration:none;}
  ul,li{
    list-style: none;
  }
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
