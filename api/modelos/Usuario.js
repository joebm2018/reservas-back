"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const crypto = require('crypto');
const jwt = require('jsonwebtoken'); // UTILIZAMOS LA LIBRERIA WEBTOKEN
exports.usuario_model = (sequelize) => {
    var usuario = sequelize.define('t_usuarrio', {
        usu_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        usu_nom: {
            type: sequelize_1.DataTypes.STRING(50),
            allowNull: true
        },
        usu_ape: {
            type: sequelize_1.DataTypes.STRING(50),
            allowNull: true
        },
        usu_email: {
            type: sequelize_1.DataTypes.STRING(30),
            allowNull: true
        },
        usu_hash: {
            type: sequelize_1.DataTypes.TEXT,
        },
        usu_salt: {
            type: sequelize_1.DataTypes.TEXT,
        }
    }, {
        tableName: 't_usuario',
        timestamps: true
    });
    // sirve para encriptar la contraseña ingresada por el usuario
    usuario.prototype.setSaltYHash = function (password) {
        this.usu_salt = crypto.randomBytes(16).toString('hex');
        this.usu_hash = crypto.pbkdf2Sync(password, this.usu_salt, 1000, 64, 'sha512').toString('hex');
    };
    usuario.prototype.validPass = function (password) {
        let usu_hash_tmp = crypto.pbkdf2Sync(password, this.usu_salt, 1000, 64, 'sha512').toString('hex');
        return usu_hash_tmp === this.usu_hash; //SI SON IGUALES RETORNA TRUE 
        // SI NO SON IGUALES RETORNA FALSE
    };
    //llamamos a esta funcion despues que se ha logueado
    usuario.prototype.generarJWT = function () {
        let payload = {
            usu_id: this.usu_id,
            usu_nom: `${this.usu_nom} ${this.usu_ape}`
        };
        let token = jwt.sign(payload, 'codigo6', { expiresIn: '1h' }, { algorithm: 'RS256' });
        return token;
    };
    return usuario;
};
