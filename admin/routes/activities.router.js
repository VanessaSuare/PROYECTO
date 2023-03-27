const express = require('express');
const ActivityService = require('../services/activities.service');
const router = express.Router();
const service = new ActivityService();

router.get('/', async (req, res) => {
  res.json(await service.findAll());
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  res.json(await service.findById(id));
});

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const { userid } = req.query;
    const newActivity = await service.create(body, userid);
    res.status(newActivity ? 201 : 401).json(newActivity);
  } catch (error) {
    next(error);
  }
});

router.post('/idbatch', async (req, res, next) => {
  try {
    const { ids } = req.body;
    const activities = await service.findManyByIds(ids);
    res.status(activities ? 200 : 404).json(activities);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
