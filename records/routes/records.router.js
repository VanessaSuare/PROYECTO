const express = require('express');
const RecordService = require('../services/records.service');
const router = express.Router();
const service = new RecordService();

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const newRecord = await service.create(body);
    res.status(newRecord ? 201 : 401).json(newRecord);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res) => {
  const records = await service.findAll();
  res.json(records);
});

router.get('/byUserId/:id', async (req, res) => {
  const { id } = req.params;
  const { date } = req.query;
  const records = await service.byUserId(id, date);
  res.json(records);
});

module.exports = router;
