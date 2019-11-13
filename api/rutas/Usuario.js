"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { crearUsuario } from "../controlador/Usuario";
// export let usuario_router=Router();
// usuario_router.post('/usuario',crearUsuario);
const usuario_controlador = __importStar(require("../controlador/Usuario"));
exports.usuario_router = express_1.Router();
exports.usuario_router.post('/usuario', usuario_controlador.crearUsuario);
exports.usuario_router.post('/usuario/find', usuario_controlador.encontrarUsuByNomOApe);
exports.usuario_router.post('/usuario/login', usuario_controlador.iniciarSesion);
