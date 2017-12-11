const Vue = require('vue')
const server = require('express')()
const vsr = require('vue-server-renderer')

server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>访问的 URL 是： {{ url }}</div>`
  })
  const render = vsr.createRenderer({
    template: require('fs').readFileSync('./src/template/index.html', 'utf-8')
  })
  const context = {
    title: 'hello'
  }
  render.renderToString(app, context, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(html)
  })
})
server.listen(8080)
