
// 使用fis3-cooker插件
fis.require('cooker')(fis)

// 第三方js太多了，合并下
fis.match('/node_modules/**.js', {
    packTo: '/static/pkg/vendor.js'
})

/**********生产环境打包策略 Begin *********************/
fis.media("prod")
 .match('**', {
  domain: "/xxx", // 配合后端发布，设置context
  deploy: [
    fis.plugin('skip-packed'), // 过滤掉已经被打包的资源.
    fis.plugin('local-deliver', {
         to: 'prod'
    })
 ]
})
 .match('/mock/**', {
    release: false
})
// 定义module的id，即打包之后的代码中的 `defind('node_module/react/lib/index.js')`这种相对路径改为 `define('xxxxxx')` 这种ID的形式,
// 会是打包的代码更小一些
.match('/{node_modules,src}/**.{js,jsx}', {
    moduleId: function (m, path) {
       return fis.util.md5(path);
    }
})
.match('/src/modules/**.{js,jsx}', { // modules目录下的打包为app.js
  packTo: '/static/pkg/app.js'
})
.match('*.{css, less}', {
  packTo: "/static/pkg/all.css"   // 所有css打包成一个 all.css
})
.match('*.png', {
   release: false   // 当前工程图片的用到了inline语法，这里设置为不发布
})

/**********生产环境打包策略 End*********************/
