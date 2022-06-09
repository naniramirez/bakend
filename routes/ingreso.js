 
import { Router } from "express";
import { check } from "express-validator";
import {ingresoPost, ingresoGet, ingresoGetById, ingresoGetQuery, ingresoPut, ingresoPutActivar, ingresoPutDesActivar, ingresoDelete} from "../controllers/ingreso.js";
import helperIngreso from "../helpers/db-ingreso.js"
import { validarCampos } from "../middlewares/validar-campos.js";
import {validarJWT} from "../middlewares/validar-jwt.js"

const router = Router()

  router.get('/', [validarJWT,
   ],ingresoGet)


  router.get('/query',[validarJWT,

    check('query', 'Los campos son obligatorios').not().isEmpty(),
    validarCampos
  ],ingresoGetQuery)
 
  router.get('/id/:id', [validarJWT,
  
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperIngreso.existeIngresoById), 
    validarCampos 
  ], ingresoGetById)
  

  

router.post('/', [validarJWT,
  check("usuario", 'El usuario es obligatorio').trim().not().isEmpty(),
  check("proveedor", 'El Poveedor es  obligatorio').trim().not().isEmpty(),
  check("tipoComprobante", 'El tipoComprobante es obligatorio').trim().not().isEmpty(),
  check("serieComprobante", 'El serieComprobante es obligatorio').trim().not().isEmpty(),
  check("numComprobante", 'El numero Comprobante es obligatorio').trim().not().isEmpty(),
  check("impuesto", 'El impuesto es obligatorio').trim().not().isEmpty(),
  
  validarCampos 
  ],ingresoPost)


router.put("/:id",[validarJWT,

    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperIngreso.existeIngresoById),
    check("usuario", 'El usuario es obligatorio').trim().not().isEmpty(),
    check("proveedor", 'El cliente es obligatorio').trim().not().isEmpty(),
    check("tipoComprobante", 'El tipoComprobante es obligatorio').trim().not().isEmpty(),
    check("serieComprobante", 'El serieComprobante es obligatorio').trim().not().isEmpty(),
    check("numComprobante", 'El numero Comprobante es obligatorio').trim().not().isEmpty(),
    check("impuesto", 'El impuesto es obligatorio').trim().not().isEmpty(),
    validarCampos
  ], ingresoPut)



  router.put("/activar/:id", [validarJWT,
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperIngreso.existeIngresoById),
    validarCampos
  ],ingresoPutActivar)
  
  router.put("/desactivar/:id", [validarJWT,
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperIngreso.existeIngresoById),
    validarCampos
  ], ingresoPutDesActivar)




  router.delete('/:id',[validarJWT,
   
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperIngreso.existeIngresoById),
    validarCampos
  ], ingresoDelete)

export default router 