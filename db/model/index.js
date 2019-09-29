const Sequelize = require('sequelize')
const sequelize = new Sequelize('teamwork', 'root', 'Mysql6687', {
  host: 'localhost',
  dialect: 'mysql',
})
sequelize
  .authenticate()
  .then(() => {
    console.log('连接成功');
  })
  .catch(err => {
    console.error('连接失败:', err);
  });
const Airticle = sequelize.define('airticle', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.STRING,
  }
})
sequelize.sync().then(() => {
  console.log('同步成功');
}).catch(err => {
  console.log('err :', err);
})
module.exports = {
  Airticle
}