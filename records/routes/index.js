const recordsRouter = require('./records.router');

function routerApi(app) {
  app.use('/api/records', recordsRouter);
}

module.exports = routerApi;
