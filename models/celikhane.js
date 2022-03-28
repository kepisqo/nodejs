const Sequelize = require('sequelize');

const sequelize = require('../utility/database');

const Celikhane = sequelize.define('celikhane', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    tbara: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    kbara: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tarih: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Celikhane;