const Sequelize = require('sequelize');

const sequelize = new Sequelize('node', 'root', '123*Ssk*06', {
    dialect: 'mysql',
    host: 'localhost',
    operatorsAliases: false
});

module.exports = sequelize;
