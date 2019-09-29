const {
  Airticle
} = require('./model/index.js')

async function getAllAirticle() {
  return Airticle.findAll({
    order: [
      ['updatedAt', 'DESC']
    ]
  });
}

async function getOneAirticleById(id) {
  return Airticle.findAll({
    where: {
      id,
    }
  });
}

async function updateAirticle(id, airticle) {
  return Airticle.update(airticle, {
    where: {
      id,
    }
  })
}

async function createAirticle(airticle) {
  return Airticle.create(airticle);
}

async function deleteAirticle(id) {
  return await Airticle.destroy({
    where: {
      id,
    }
  });
}

module.exports = {
  getAllAirticle,
  getOneAirticleById,
  updateAirticle,
  createAirticle,
  deleteAirticle,
}