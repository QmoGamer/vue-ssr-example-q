const Vue = require('vue')
const Koa = require('koa')
const Router = require('koa-router')
const fs = require('fs')
const renderer = require('vue-server-renderer').createRenderer({
  template: fs.readFileSync('./index.template.html', 'utf-8')
})

const koaApp = new Koa()
const koaRouter = new Router()

koaRouter.get('*', ctx => {
  const app = new Vue({
    data: {
      url: ctx.url
    },
    template: `<div>當前 URL 是： {{ url }}</div>`
  })

  const context = {
    title: ctx.url,
    meta: `
      <meta charset="UTF-8">
      <meta name="descript" content="基于webpack、koa搭建的SSR">
    `
  }

  renderer.renderToString(app, context, (err, html) => {
    if (err) {
      ctx.status = 500
      ctx.body = 'Internal Server Error'
      throw err
    }
    ctx.status = 200
    ctx.body = html
  })
})

koaApp
  .use(koaRouter.routes())
  .use(koaRouter.allowedMethods())

koaApp.listen(3100, () => {
  console.log(`server started at localhost:3100`)
})