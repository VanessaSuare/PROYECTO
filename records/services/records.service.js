const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');
const axios = require('axios');

const ADMIN_SERVICE_URL = 'http://localhost:3000/api';
const TRACE_SERVICE_URL = 'http://localhost:5000/api/trace';

class RecordsService {
  constructor() {}

  async findAll() {
    //Traer todas los registros
    let records = await models.Record.findAll(); // Obtener todos los activityIds de cada registro
    const activityIds = records.map((record) => record.activityId); // [1,2,3,4,7]
    //Consultar las actividades por el arreglo de recordsIDs
    const { data: activities } = await axios.post(
      `${ADMIN_SERVICE_URL}/activities/idbatch`,
      {
        ids: activityIds, //Devuelve un arreglo de actividades
      }
    );

    return await Promise.all(
      //Recorrer los registros
      records.map(async (record) => {
        //Buscar actividad asociada a el registros
        const activity = activities.find(
          (activity) => record.activityId === activity.id
        );
        //Agregar desripcion de actividad a el registros
        record.dataValues.activity = activity;

        //Consultar usuario por id a servicio de usuarios
        const { data: user } = await axios.get(
          // Devuelve un usuario por su id
          ADMIN_SERVICE_URL + '/users/' + record.userId
        );

        //Agregar nombre de usuario a registro
        record.dataValues.user = user.name;

        return record;
      })
    );
  }

  //Crear registro
  async create(recordDTO) {
    //retorna el registros con el modelo
    const record = await models.Record.create(recordDTO);
    await axios.post(TRACE_SERVICE_URL + '/reportNewRecord', { record });
    return record;
  }

  async byUserId(userId, date) {
    const records = await models.Record.findAll({
      where: {
        userId: userId,
        createdAt: {
          [Op.between]: [
            new Date(date.split('T')[0] + 'T00:00:00.000Z'),
            new Date(date),
          ],
        },
      },
      order: [['createdAt', 'ASC']],
    });

    const activityIds = records.map((record) => record.activityId); // [1,2,3,4,7]
    //Consultar las actividades por el arreglo de recordsIDs
    const { data: activities } = await axios.post(
      `${ADMIN_SERVICE_URL}/activities/idbatch`,
      {
        ids: activityIds, //Devuelve un arreglo de actividades
      }
    );
    records.map(async (record) => {
      //Buscar actividad asociada a el registros
      const activity = activities.find(
        (activity) => record.activityId === activity.id
      );
      //Agregar desripcion de actividad a el registros
      record.dataValues.activity = activity;
    });
    return records;
  }
}

module.exports = RecordsService;
