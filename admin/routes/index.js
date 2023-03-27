const usersRouter = require('./users.router');
const activitiesRouter = require('./activities.router');

function routerApi(app) {
  app.use('/api/users', usersRouter);
  app.use('/api/activities', activitiesRouter);
}

module.exports = routerApi;
