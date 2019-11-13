"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.tipoAula_model = (sequelize) => {
    var tipoAula = sequelize.define('t_tipoAula', {
        taula_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        taula_desc: {
            type: sequelize_1.DataTypes.STRING(45),
            allowNull: false
        }
    }, {
        tableName: 't_tipoAula',
        timestamps: true
    });
    return tipoAula;
};
