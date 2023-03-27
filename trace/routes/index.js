const tracesRouter = require('./trace.router');

function routerApi(app) {
  app.use('/api/trace', tracesRouter);
}

module.exports = routerApi;
