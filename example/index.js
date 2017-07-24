const { join } = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const jsx = require('../');

const app = new Koa();

app.use(jsx({
  viewPath: join(__dirname, 'views'),
  locals: {},
}));

const router = new Router();

router.get('/', (ctx) => {
  ctx.render('index', {
    title: 'Koa JSX Example',
    slogan: 'Demacia!',
  });
});

router.get('/summoner', (ctx) => {
  ctx.render('summoner/index', {
    title: 'Yasuo',
    desc: 'Yasuo is a man of resolve, an agile swordsman who wields the wind itself to cut down his foes. This once-proud warrior has been disgraced by a false accusation and forced into a desperate fight for survival. With the world turned against him, he will do everything in his power to bring the guilty to justice and restore his honor.',
  });
});
app.use(router.routes());

app.listen(3000);
console.log('Listening on port 3000');
