const activitiesRouter = require("./activities.router");

function routerApi(app) {
  app.use("/api/activities", activitiesRouter);
}

module.exports = routerApi;
