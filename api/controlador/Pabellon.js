"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("../configuracion/sequelize");
exports.getPabellones = (req, res) => {
    sequelize_1.Pabellon.findAll().then((objPabellones) => {
        res.status(200).json({
            message: 'ok',
            content: objPabellones
        });
    });
};
exports.postPabellon = (req, res) => {
    console.log(req.body);
    //VALIDAR SI REQ.BODY
    if (!req.body.pab_nom) {
        res.status(400).json({
            ok: false,
            mensaje: "No se recibieron todos los campos en el request"
        });
        return;
    }
    // let objPabellon=Pabellon.build({
    //     pab_nom: req.body.pab_nom
    // });
    // console.log(objPabellon);
    //ó
    // let objPabellon=Pabellon.build();
    // objPabellon.pab_nom=req.body.pab_nom;
    // console.log(objPabellon);
    let objPabellon = sequelize_1.Pabellon.build(req.body);
    //guardando el objeto pabellon en la base de datos
    objPabellon.save().then((objPabellonCreado) => {
        res.status(201).json({
            ok: true,
            contenido: objPabellonCreado,
            mensaje: "Pabellon Creado correctamente"
        });
    }).catch((error) => {
        res.status(500).json({
            ok: true,
            contenido: error,
            mensaje: "Error interno en el servidor"
        });
    });
};
exports.getPabellonesById = (req, res) => {
    sequelize_1.Pabellon.findByPk(req.params.id).then((objPabellon) => {
        if (objPabellon) {
            res.status(200).json({
                mensaje: "ok",
                pabellon: objPabellon
            });
        }
        else {
            res.status(500).json({
                mensaje: "error",
                contenido: "No se encontro el PAbellon"
            });
        }
    });
};
exports.updatePabellon = (req, res) => {
    sequelize_1.Pabellon.update({
        pab_nom: req.body.pabellon.pab_nom
    }, {
        where: {
            pab_id: req.body.pabellon.pab_id
        }
    }).then((pabActualizado) => {
        sequelize_1.Pabellon.findByPk(pabActualizado[0]).then((objPAbellon) => {
            res.status(200).json({
                mensaje: "ok",
                contenido: objPAbellon
            });
        });
    }).catch((error) => {
        res.status(501).json({
            mensaje: "error",
            contenido: error
        });
    });
};
exports.getAulasXPabellon = (req, res) => {
    sequelize_1.Pabellon.findAll({
        include: [{
                model: sequelize_1.Aula
            }]
    }).then((resultado) => {
        res.status(200).json({
            mensaje: "ok",
            contenido: resultado
        });
    });
};
exports.getAulasByPabellonId = (req, res) => {
    sequelize_1.Pabellon.findAll({
        where: {
            pab_id: req.params.id
        },
        include: [{
                model: sequelize_1.Aula,
                include: [{
                        model: sequelize_1.TipoAula
                    }]
            }]
    }).then((resultado) => {
        res.status(200).json({
            mensaje: 'ok',
            content: resultado
        });
    });
};
