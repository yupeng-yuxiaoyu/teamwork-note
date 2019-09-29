const Router = require('koa-router');
const router = new Router();
const db = require('./db/index')

module.exports = (app) => {
  router.get('/', (ctx, next) => {
    ctx.type = 'text/html'
    ctx.body = fs.createReadStream('./fe/teamwork-note/dist/index.html')
  })

  router.post('/api/airticle', async (ctx, next) => {
    await db.updateAirticle(ctx.request.body.id, {
      title: ctx.request.body.title,
      content: ctx.request.body.content
    })
    ctx.body = {
      code: 1,
      data: {
        message: '更新成功',
      }
    }
  })
  router.post('/api/create_airticle', async (ctx, next) => {
    await db.createAirticle({
      title: ctx.request.body.title,
      content: ctx.request.body.content
    })
    ctx.body = {
      code: 1,
      data: {
        message: '创建成功',
      }
    }
  })
  router.get('/api/airticle', async (ctx, next) => {
    const airticle = await db.getOneAirticleById(ctx.request.query.id)
    ctx.body = {
      code: 1,
      data: airticle[0],
    }
  })
  router.get('/api/airticleList', async (ctx, next) => {
    const airticleList = await db.getAllAirticle()
    ctx.body = {
      code: 1,
      data: {
        airticle_list: airticleList,
      }
    }
  })
  router.post('/api/delete_airticle', async (ctx, next) => {
    try {
      await db.deleteAirticle(ctx.request.body.id)
      ctx.body = {
        code: 1,
        data: {
          message: '删除成功',
        }
      }
    } catch (error) {
      console.log('error :', error);
      ctx.body = {
        code: 1,
        data: {
          message: '删除失败',
        }
      }
    }
  })
  app.use(router.routes());
}