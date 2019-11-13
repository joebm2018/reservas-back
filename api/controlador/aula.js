"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("../configuracion/sequelize");
exports.getAulas = (req, res) => {
};
exports.postAula = (req, res) => {
    let objAula = sequelize_1.Aula.build(req.body);
    objAula.save().then((aulaCreada) => {
        res.status(201).json({
            mensaje: 'ok',
            content: aulaCreada
        });
    }).catch((error) => {
        res.status(501).json({
            mensaje: 'error',
            error
        });
    });
};
