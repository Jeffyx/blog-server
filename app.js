const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const router = require('./router');
const cors = require('koa2-cors');

app.use(cors()); //解决跨域
app.use(bodyParser()); //bodyParser中间件

router(app); //router object

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})