const { models } = require('../libs/sequelize');
const axios = require('axios');

const USERS_SERVICE_URL = 'http://localhost:3000/api/users';
const RECORDS_SERVICE_URL = 'http://localhost:5000/api/records';

class ActivitiesService {
  constructor() {}

  async findAll() {
    return await models.Activity.findAll();
  }

  async findById(id) {
    return await models.Activity.findByPk(id);
  }

  async create(activityDTO, requestUserId) {
    //Buscar info de usuario que envia la peticion
    const user = await models.User.findByPk(requestUserId);
    //Validar que el usuario de la peticion sea Jefe
    if (user && user.role === 'BOSS') {
      //Crear actividad
      return await models.Activity.create(activityDTO);
    }
    return false;
  }

  findManyByIds(activityIds) {
    //Buscar actividades por varios IDs
    return models.Activity.findAll({ where: { id: activityIds } });
  }
}

module.exports = ActivitiesService;
