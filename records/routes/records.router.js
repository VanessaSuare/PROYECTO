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

module.exports = router;
