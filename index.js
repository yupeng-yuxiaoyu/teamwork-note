const Koa = require('koa')
const path = require('path')
const staticFiles = require('koa-static')
const app = new Koa();
const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)
const history = require('koa2-history-api-fallback')
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser')
const router = require('./router')
app.use(bodyParser());
app.use(cors());
app.use(staticFiles(path.resolve(__dirname, './static')))
router(app);

// 前端(vue)路由
// 所有 navigate 请求重定向到 '/'
app.use(history({
  htmlAcceptHeaders: ['text/html'],
  index: '/',
  verbose: true
}));
io.on('connection', (socket) => {
  console.log('用户连接');
  socket.on('changeMessage', msg => {
    console.log('msg :', msg);
    message = msg;
    io.emit('changeMessage', msg);
  })
  socket.on('disconnect', () => {
    console.log('用户离开');
  })
})
server.listen(3000, () => {
  console.log('listening on 3000');
});