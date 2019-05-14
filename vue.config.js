module.exports = {
  // lintOnSave: false,
  publicPath: process.env.NODE_ENV === "production" ? "/vue-Qidian/dist" : "/",
  devServer: {
    proxy: {
      '/hotweek': {
        target: 'http://www.api.zhuishushenqi.com/ranking/54d43437d47d13ff21cad58b',
        changeOrigin: true,
        pathRewrite: {
          '^/hotweek': '/'
        }
      },
      '/novel': {
        target: 'http://novel.juhe.im',
        secure: true,
        changeOrigin: true,
        pathRewrite: {
          '^/novel': ''
        }
      },
      '/chapters': {
        target: 'http://api.zhuishushenqi.com/atoc',
        secure: true,
        changeOrigin: true,
        pathRewrite: {
          '^/chapters': ''
        }
      },
      'updata': {
        target: 'http://api05iye5.zhuishushenqi.com',
        secure: true,
        changeOrigin: true,
        pathRewrite: {
          '^/updata': ''
        }
      },
      'searchSuggestion': {
        target: 'http://api.zhuishushenqi.com/book/fuzzy-search?query=',
        changeOrigin: true,
        pathRewrite: {
          '^/searchSuggestion': ''
        }
      },
      '/chapterMess': {
        target: 'http://chapterup.zhuishushenqi.com/chapter',
        changeOrigin: true,
        pathRewrite: {
          '^/chapterMess': ''
        }
      },
      '/zhuangxiu': {
        target: 'http://api.zhuishushenqi.com',
        changeOrigin: true,
        pathRewrite: {
          '^/zhuangxiu': ''
        }
      }
    }
  }
}
