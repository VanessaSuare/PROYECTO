const express = require('express');
const TraceService = require('../services/trace.service');
const router = express.Router();
const service = new TraceService();

router.get('/', async (req, res) => {
  const traces = await service.findAll();
  res.json(traces);
});

router.post('/reportNewRecord', async (req, res, next) => {
  try {
    const body = req.body;
    const resp = await service.reportNewRecord(body);
    res.status(200).json(resp);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
