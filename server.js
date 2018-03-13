const Koa = require('koa');
const cors = require('koa2-cors');
const router = require('koa-router')();
const fs = require('fs');

const server = new Koa();

server.use(cors());

let routesMap = JSON.parse(fs.readFileSync('./routes.json', 'utf-8'));

//读取routes.json文件
for ( let route in routesMap) {
    router.all(route, async function(ctx, next) {
        ctx.response.type = 'application/json';
        let body = fs.readFileSync(routesMap[route], 'utf-8');
        ctx.response.body = body;
    });
}


//请求日志
server.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

//路由
server.use(router.routes());

server.listen(3008);

console.log('服务器正在监听3008端口...');
