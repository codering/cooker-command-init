
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
