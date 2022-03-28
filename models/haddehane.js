const Sequelize = require('sequelize');

const sequelize = require('../utility/database');

const Haddehane = sequelize.define('haddehane', {
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
    vpsa: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tarih: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Haddehane;