import { Router } from "express";
import { check } from "express-validator";
import {validarCampos} from "../middlewares/validar-campos.js"
import {login} from "../controllers/login.js"

const router = Router();

router.post('/login',[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'la contraseña obligatoria').not().isEmpty().isLength({max:120}),
    validarCampos
] ,login);


export default  router