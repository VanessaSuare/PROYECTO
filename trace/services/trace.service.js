const { models } = require('../libs/sequelize');
const moment = require('moment');
const axios = require('axios');

const ADMIN_SERVICE_URL = 'http://localhost:3000/api';
const RECORD_SERVICE_URL = 'http://localhost:4000/api/records';
class TraceService {
  constructor() {}

  async findAll() {
    const traces = await models.Trace.findAll();
    return await Promise.all(
      //Recorrer los registros
      traces.map(async (trace) => {
        //Consultar usuario por id a servicio de usuarios
        const { data: user } = await axios.get(
          // Devuelve un usuario por su id
          ADMIN_SERVICE_URL + '/users/' + trace.userId
        );

        //Agregar nombre de usuario a registro
        trace.dataValues.user = user.name;

        return trace;
      })
    );
  }

  async reportNewRecord({ record }) {
    const { data: act } = await axios.get(
      ADMIN_SERVICE_URL + '/activities/' + record.activityId
    );
    if (act.type == 'FINISH' && !act.isFreeTime) {
      const times = await this.calculateTrace(record);
      return await models.Trace.create({
        userId: record.userId,
        timeFree: times.freeTime / 1000,
        timeWork: times.workTime / 1000,
        date: record.createdAt,
      });
    }
  }

  async calculateTrace(record) {
    const { data: records } = await axios.get(
      RECORD_SERVICE_URL +
        '/byUserId/' +
        record.userId +
        '?date=' +
        record.createdAt
    );

    const startWork = records.find(
      (record) => record.activity.type == 'START' && !record.activity.isFreeTime
    );
    const finishWork = records.find(
      (record) =>
        record.activity.type == 'FINISH' && !record.activity.isFreeTime
    );
    const startBreak = records.find(
      (record) => record.activity.type == 'START' && record.activity.isFreeTime
    );
    const finishBreak = records.find(
      (record) => record.activity.type == 'FINISH' && record.activity.isFreeTime
    );

    const freeTime = moment(finishBreak.createdAt).diff(
      moment(startBreak.createdAt)
    );
    const workTime =
      moment(finishWork.createdAt).diff(moment(startWork.createdAt)) - freeTime;

    return { workTime, freeTime };
  }
}

module.exports = TraceService;
