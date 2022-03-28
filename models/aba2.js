const Sequelize = require('sequelize');

const sequelize = require('../utility/database');

const Aba2 = sequelize.define('aba2', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    hadde: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    tarih: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Aba2;