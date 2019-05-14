import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home.vue'
import detail from './components/detail-info.vue'
import rank from './components/rankshow.vue'
import booklist from './components/booklist.vue'
import chapters from './components/chapters.vue'
import readview from './components/readview.vue'
import discuss from './components/user-discuss.vue'
import classisypage from './components/classify-detail.vue'
import style from './components/rankstyle.vue'
import finish from './components/finish.vue'
import classify from './components/classify-list.vue'
import sub from './components/sub.vue'
// import usercomment from './components/user-comment.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: detail,
      children: [{
        path: '/detail/chapters/:id',
        name: 'chapters',
        component: chapters
      },
      {
        path: '/detail/discuss/:id',
        name: 'discuss',
        component: discuss
      }
      ]
    },
    {
      path: '/rank',
      name: 'rank',
      component: rank,
      children: [{
        path: 'style/:id',
        name: 'rankstyle',
        component: style
      }],
      redirect: 'rank/style/54d4306c321052167dfb75e4'
    },
    {
      path: '/booklist',
      name: 'booklist',
      component: booklist
    },
    {
      path: '/readview/:id/:index',
      name: 'readview',
      component: readview
    },
    {
      path: '/classisy/:gender/:id',
      name: 'classisypage',
      component: classisypage
      /*
      children: [{
        path:'status/:status',
        name:'status',
        component: finish,
        children: [{
          path: 'major/:major',
          name: 'major',
          component: classify,
          children: [{
            path: 'minor/:minor',
            name: 'minor',
            component: classify
          }]
        }]
        //redirect: 'finish/gender/male/major/仙侠'
      }]
      */
    },
    {
      path: 'all',
      name: 'all',
      component: finish,
      children: [
        {
          path: 'status/:status',
          name: 'status',
          component: classify,
          children: [{
            path: '/all/status/:status/gender/:gender/major/:major/minor/:minor',
            name: 'gender',
            component: classify,
            children: [{
              path: '/all/status/:status/gender/:gender/major/:major',
              name: 'major',
              component: classify,
              children: [{
                path: '/all/status/:status/gender/:gender/major/:major/minor/:minor',
                name: 'minor',
                component: classify
              }]
            }]
          }]
        }
      ]
    }
  ]
}
)
