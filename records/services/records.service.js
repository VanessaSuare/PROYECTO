const { models } = require('../libs/sequelize');
const axios = require('axios');

const ACTIVITIES_SERVICE_URL = 'http://localhost:4000/api/activities';
const USERS_SERVICE_URL = 'http://localhost:3000/api/users';

class RecordsService {
  constructor() {}

  async findAll() {
    //Traer todas los registros
    let records = await models.Record.findAll(); // Obtener todos los activityIds de cada registro
    const activityIds = records.map((record) => record.activityId); // [1,2,3,4,7]
    //Consultar las actividades por el arreglo de recordsIDs
    const { data: activities } = await axios.post(`${ACTIVITIES_SERVICE_URL}/idbatch`, {
      ids: activityIds, //Devuelve un arreglo de actividades
    });

    return await Promise.all(
      //Recorrer los registros
      records.map(async (record) => {
        //Buscar actividad asociada a el registros
        const activity = activities.find((activity) => record.activityId === activity.id);
        //Agregar desripcion de actividad a el registros
        record.dataValues.activity = activity.description;

        //Consultar usuario por id a servicio de usuarios
        const { data: user } = await axios.get(
          // Devuelve un usuario por su id
          USERS_SERVICE_URL + '/' + record.userId
        );

        //Agregar nombre de usuario a registro
        record.dataValues.user = user.name;

        return Record;
      })
    );
  }

  //Crear registro
  async create(recordDTO) {
    //retorna el registros con el modelo
    return models.Record.create(recordDTO);
  }
}

module.exports = RecordsService;
