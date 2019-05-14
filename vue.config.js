module.exports = {
  // lintOnSave: false,
  publicPath: process.env.NODE_ENV === "production" ? "/vue-Qidian/dist/" : "/",
  devServer: {
    proxy: {
      '/hotweek': {
        target: 'https://www.api.zhuishushenqi.com/ranking/54d43437d47d13ff21cad58b',
        changeOrigin: true,
        secure: true,
        pathRewrite: {
          '^/hotweek': '/'
        }
      },
      '/novel': {
        target: 'https://novel.juhe.im',
        secure: true,
        changeOrigin: true,
        pathRewrite: {
          '^/novel': ''
        }
      },
      '/chapters': {
        target: 'https://api.zhuishushenqi.com/atoc',
        secure: true,
        changeOrigin: true,
        pathRewrite: {
          '^/chapters': ''
        }
      },
      'updata': {
        target: 'https://api05iye5.zhuishushenqi.com',
        secure: true,
        changeOrigin: true,
        pathRewrite: {
          '^/updata': ''
        }
      },
      'searchSuggestion': {
        target: 'https://api.zhuishushenqi.com/book/fuzzy-search?query=',
        changeOrigin: true,
        secure: true,
        pathRewrite: {
          '^/searchSuggestion': ''
        }
      },
      '/chapterMess': {
        target: 'https://chapterup.zhuishushenqi.com/chapter',
        changeOrigin: true,
        secure: true,
        pathRewrite: {
          '^/chapterMess': ''
        }
      },
      '/zhuangxiu': {
        target: 'https://api.zhuishushenqi.com',
        changeOrigin: true,
        secure: true,
        pathRewrite: {
          '^/zhuangxiu': ''
        }
      }
    }
  }
}
