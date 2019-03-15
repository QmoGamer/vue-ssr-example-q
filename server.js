const Vue = require('vue')
const Koa = require('koa')
const Router = require('koa-router')
const renderer = require('vue-server-renderer').createRenderer()

const koaApp = new Koa()
const koaRouter = new Router()

koaRouter.get('*', ctx => {
  const app = new Vue({
    data: {
      url: ctx.url
    },
    template: `<div>當前 URL 是： {{ url }}</div>`
  })

  renderer.renderToString(app, (err, html) => {
    if (err) {
      ctx.status = 500
      ctx.body = 'Internal Server Error'
      throw err
    }
    ctx.status = 200
    ctx.body = `
      <!DOCTYPE html>
      <html lang="en">
        <head><title>Hello</title></head>
        <body>${html}</body>
      </html>
    `
  })
})

koaApp
  .use(koaRouter.routes())
  .use(koaRouter.allowedMethods())

koaApp.listen(3100, () => {
  console.log(`server started at localhost:3100`)
})