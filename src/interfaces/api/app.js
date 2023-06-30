const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const v1 = require('../api/router/v1');
const { catcher } = require('./shared');

const router = new Router();

router.use('/api/v1', v1.routes());

const app = new Koa();

app.use(bodyParser());
app.use(catcher);
app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;
