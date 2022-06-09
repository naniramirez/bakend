import {  Router } from "express";
import { check } from "express-validator";
import {registroPost, registroGet, registroGetById, registroGetQuery, registroPut, registroPutActivar, registroPutDesactivar, registroDelete, } from "../controllers/register.js"
import helperUsuario from "../helpers/db-validators-usuarios.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router()

router.get("/",
 registroGet) 


router.get("/query",[
    check('query','Digite el parametro de busqueda').not().isEmpty(),
    check('email').custom(helperUsuario.existeUsuarioByEmail),
    //check("nombre",'No puede exceder 50 caracteres').length({max:50}),
  validarCampos],registroGetQuery)

router.get("/id:id/",[
 check('id','No es un mogoId valido').isMongoId(),
 check('id').custom(helperUsuario.existeUsuarioById),

validarCampos],registroGetById)

router.post('/',[
  check('rol', 'El rol es obligatorio').trim().not().isEmpty(),
  check('nombre','El nombre es obligatorio').trim().not().isEmpty(),
  check('password', 'El password debe ser de mas de 6 caracteres').isLength({min:6}),
  check('email', 'El correo no es valido').trim().isEmail(),
  check('email').custom(helperUsuario.existeUsuarioByemail),
  validarCampos
],registroPost),


router.put("/:id", [
  check('id','No es un mongoID ').isMongoId(),
  check('id', ).custom(helperUsuario.existeUsuarioById),
  check('rol', 'El rol es obligatorio').trim().not().isEmpty(),
  check('nombre','El nombre es obligatorio').trim().not().isEmpty(),
  check('password', 'El password debe ser de mas de 6 caracteres').isLength({min:6}),
  check('email', 'El correo no es valido').trim().isEmail(),
  validarCampos
],registroPut)

router.put("/activar/:id",[
  check('id', 'No es un mongoID ').isMongoId(),
  check('id',).custom(helperUsuario.existeUsuarioById),
  validarCampos
], registroPutActivar)

router.put("/desactivar/:id",[
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperUsuario.existeUsuarioById),
    validarCampos
], registroPutDesactivar)

   router.delete('/:id',[
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperUsuario.existeUsuarioById),
    validarCampos
   ],registroDelete)

export default router