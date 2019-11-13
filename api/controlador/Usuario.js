"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("../configuracion/sequelize");
const Sequelize = require('sequelize');
const Op = Sequelize.Op; // OPERADORES DE COMPRACION DE SEQUELIZE
exports.crearUsuario = (req, res) => {
    // build construye el objeto usuario mas no lo crea en la base de datros
    let objUsusario = sequelize_1.Usuario.build(req.body.usuario);
    objUsusario.setSaltYHash(req.body.usuario.usu_pass);
    //save()=> promesa que GUARDA en el regustro en la base de datos
    objUsusario.save().then((usuarioCreado) => {
        sequelize_1.Usuario.findByPk(usuarioCreado.usu_id).then((usuarioEncontrado) => {
            res.status(201).json({
                mensaje: 'Usuario Creado',
                contenido: usuarioEncontrado
            });
        });
    }).catch((error) => {
        res.status(501).json({
            mensaje: 'Error',
            contenido: error
        });
    });
};
exports.encontrarUsuByNomOApe = (req, res) => {
    let busqueda = req.body.busqueda;
    sequelize_1.Usuario.findAll({
        where: {
            [Op.or]: [
                { usu_nom: { [Op.substring]: busqueda } },
                { usu_ape: { [Op.substring]: busqueda } }
            ]
        }
    }).then((rpta) => {
        res.json(rpta);
    });
};
exports.iniciarSesion = (req, res) => {
    let { usu_email, usu_pass } = req.body;
    let buff = Buffer.from(usu_pass, 'utf-8').toString('ascii');
    sequelize_1.Usuario.findOne({
        where: {
            //cuando la variable  tiene el mismo nombre del campo se puede poner solo una vez
            //usu_email:usu_email
            usu_email
        }
    }).then((objUsuario) => {
        if (objUsuario) {
            let validarPass = objUsuario.validPass(buff);
            if (validarPass) {
                let token = objUsuario.generarJWT();
                res.status(200).json({
                    mensaje: 'ok',
                    // contenido:objUsuario,
                    token
                });
            }
            else {
                res.status(500).json({
                    mensaje: 'error',
                    content: 'Usuario o contraseña Incorrectos'
                });
            }
        }
        else {
            res.status(500).json({
                mensaje: 'Error',
                contenido: 'No se encontro el usuario'
            });
        }
    });
};
