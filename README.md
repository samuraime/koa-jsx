# Koa JSX render

> 为了像写React一样写模板  

  Warning: JSX作为模板引擎无疑是低效的

## Install

```bash
$ npm install koa-jsx-render --save-dev
```

书写JSX需要转码, 推荐使用`babel-node`来处理, 更多细节可以查看[babel/example-node-server](https://github.com/babel/example-node-server)

```bash
$ npm install babel-cli babel-preset-react --save-dev
```

对应的`.babelrc`, 
```json
{
  "presets": [
    "react"
  ]
}
```

## Usage

```js
const { join } = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const jsx = require('koa-jsx-render');

const app = new Koa();

// `jsx`是一个koa middleware, 附加一个`render`方法到koa context
app.use(jsx({
  viewPath: join(__dirname, 'views'), // 模版文件所在目录, 模板文件即stateless组件
  extname: '.jsx', // 模板文件扩展名。
  locals: {}, // 全局变量, 作为模板组件props
}));

const router = new Router();
router.get('/', (ctx) => {
  // `render`第一个参数为模板组件相对路径, 不用指定扩展名, 支持多级目录
  // `render`第二个参数为暴露给模板组件的数据, 直接作为`props`
  // `render`执行 `ctx.body = ReactDOMServer.renderToStaticMarkup(<Component />)`
  // 默认Content-Type: `ctx.type = 'text/html'`
  ctx.render('index', {
    title: 'Koa JSX Example',
    slogan: 'Demacia!',
  });
});
app.use(router.routes());

app.listen(3000);
console.log('Listening on port 3000');
```

## License

MIT