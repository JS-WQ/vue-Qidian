<template>
  <div class="finishbox" v-if="classifyData.ok">
    <div class="nav">
      <div class="gender">
        <router-link
          :to="{name:'gender',params:{status:$route.params.status,gender:'male',major: '仙侠',minor:'古典仙侠'}}"
          :class="{'active':$route.params.gender === 'male'}"
        >男</router-link>
        <router-link
          :to="{name:'gender',params:{status:$route.params.status,gender:'female',major: '古代言情',minor:'穿越时空'}}"
          :class="{'active':$route.params.gender === 'female'}"
        >女</router-link>
      </div>
      <div class="choiceshow">
        <h4>已选</h4>
        <span>{{major.major}}</span>
      </div>
      <div class="classify">
        <h4>分类</h4>
        <div class="classify-box">
          <div v-for="(item,index) in categoryBox">
            <div class="box" :class="{'female': $route.params.gender
             === 'female'}">
              <router-link
                v-for="value in item"
                class="item"
                :class="['row-'+index,{'router-link-active':major.major === value.major}]"
                :to="{name:'major',params:{major:value.major,status:status}}"
              >{{value.major}}</router-link>
            </div>
          </div>
        </div>
        <h4>子分类</h4>
        <div class="sub-type" v-if="major.mins.length>0">
          <router-link
            v-for="item in major.mins"
            :to="{name:'minor',params:{minor:item,status:status}}"
            tag="li"
          >{{item}}</router-link>
        </div>
        <h4>属性</h4>
        <div class="attri">
          <router-link tag="li" :to="{name:'minor',params:{status:'hot',gender:$route.params.gender,major:major.major}}">热门</router-link>
          <router-link tag="li" :to="{name:'minor',params:{status:'new',gender:$route.params.gender,major:major.major}}">新书</router-link>
          <router-link tag="li" :to="{name:'minor',params:{status:'reputation',gender:$route.params.gender,major:major.major}}">好评</router-link>
          <router-link tag="li" :to="{name:'minor',params:{status:'over',gender:$route.params.gender,major:major.major}}">完结</router-link>
          <router-link tag="li" :to="{name:'minor',params:{status:'monthly',gender:$route.params.gender,major:major.major}}">包月</router-link>
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
      classifyData: [],
      maleClassify: [],
      femaleClassify: []
    }
  },
  methods: {
    getClassify: function () {
      this.axios.get('https://novel.juhe.im/sub-categories').then(res => {
        this.classifyData = res.data
        this.getGenderClassify(this.classifyData.male, this.maleClassify, 4)
        this.getGenderClassify(
          this.classifyData.female,
          this.femaleClassify,
          3
        )
      })
    },
    getGenderClassify: function (data, point, arrLength) {
      let query = data.length / arrLength
      for (let index = 0; index < query; index++) {
        point.push(
          data.slice(index * arrLength, index * arrLength + arrLength)
        )
      }
    },
    init: function () {
      this.getClassify()
    }
  },
  created () {
    this.init()
  },
  computed: {
    major: function () {
      if (this.$route.params.gender === 'male') {
        let major = this.classifyData.male.find(item => {
          return item.major === this.$route.params.major
        })
        if (major === undefined) {
          return this.classifyData.male[3]
        } else {
          return major
        }
      }
      if (this.$route.params.gender === 'female') {
        let major = this.classifyData.female.find(item => {
          if (item.major === this.$route.params.major) {
            return this.$route.params.major
          }
        })
        if (major === undefined) {
          return this.classifyData.female[3]
        } else {
          return major
        }
      }
    },
    categoryBox: function () {
      if (this.$route.params.gender === 'male') {
        return this.maleClassify
      } else {
        return this.femaleClassify
      }
    },
    status: function () {
      return this.$route.params.status || 'hot'
    }
  }

}
</script>
<style lang='less' scoped>
.finishbox {
  width: 1200px;
  margin: 20px auto;
  display: flex;
  .nav {
    width: 230px;
    .gender {
      a {
        display: inline-block;
        width: 114px;
        height: 30px;
        line-height: 30px;
        border: 1px solid #ebebeb;
        color: #000;
      }
      .router-link-active {
        color: #ed4259;
        border-bottom: 2px solid #ed4259;
      }
      .active {
        color: #ed4259;
        border-bottom: 2px solid #ed4259;
      }
    }
    .choiceshow {
      font-size: 14px;
      text-align: left;
      padding-bottom: 16px;
      border-bottom: 1px solid #ebebeb;
      h4 {
        font-weight: 600;
        margin-top: 15px;
        margin-bottom: 12px;
      }
      span {
        padding: 3px 8px;
        background: #ed4259;
        color: #ffffff;
      }
    }
    .classify {
      h4 {
        font-size: 15px;
        text-align: left;
        margin-top: 15px;
        margin-bottom: 15px;
      }
      .classify-box {
        .box {
          display: flex;
          a {
            margin-right: 22px;
            margin-bottom: 5px;
            color: #000;
            font-size: 13px;
          }
          a:hover {
            color: #ed4259;
          }
          .router-link-active {
            color: #ed4259;
          }
        }
        .sub-type {
          display: none;
        }
        .item {
          display: flex;
          li {
            margin-right: 22px;
            margin-bottom: 5px;
          }
          li:hover {
            color: #ed4259;
          }
        }
      }
      .sub-type,.attri {
        display: flex;
        flex-wrap: wrap;
        li {
          margin-right: 12px;
          font-size: 13px;
          color: #000;
          line-height: 20px;
          cursor: pointer;
        }
        .router-link-active {
          color: #ed4259;
        }
      }
    }
  }
}
</style>
