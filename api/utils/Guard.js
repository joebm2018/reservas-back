"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require('jsonwebtoken');
exports.verificarToken = (token) => {
    try {
        let data = jwt.verify(token, 'codigo6', { algorithm: 'RS256' });
        return data;
    }
    catch (error) {
        console.log(error.message);
        return null;
    }
};
exports.wachiman = (req, res, next) => {
    // LA FUNCION NEXT SIRVE PARA VERIFICAR SU TODO ESTA CORRECTO DA PASO A LA SIGUIETE RUTA
    if (req.headers.authorization) {
        //ACA SEPARAMOS LA AUTON QUE VIENE => bearr 12345555.1212121.21212121
        let token = req.headers.authorization.split(" ")[1];
        let data = exports.verificarToken(token);
        if (data) {
            next();
        }
        else {
            res.status(401).json(({
                mensaje: 'Error',
                contenido: 'La token no ess valid o ya expiro'
            }));
        }
    }
    else {
        //NO HAY TOKEN
        res.status(401).json({
            mensaje: 'Error',
            contenido: 'Falta Token'
        });
    }
};
