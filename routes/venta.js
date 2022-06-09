import { Router } from "express";
import { check} from "express-validator";
import {ventaPost, ventaGet, ventaGetQuery,ventaGetById,ventaPut, ventaPutActivar, ventaPutDesactivar, ventaDelete} from "../controllers/venta.js"
import {helperVenta, existeArticuloStock, detallesVacios} from "../helpers/db-venta.js"
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router()

router.post('/',[validarJWT,

    check("usuario", 'El usuario es obligatorio').trim().not().isEmpty(),
    check("cliente", 'El cliente es obligatorio').trim().not().isEmpty(),
    check("tipoComprobante", 'El tipoComprobante es obligatorio').trim().not().isEmpty(),
    check("serieComprobante", 'El serieComprobante es obligatorio').trim().not().isEmpty(),
    check("numComprobante", 'El numeroComprobante es obligatorio').trim().not().isEmpty(),
    check("impuesto", 'El impuesto es obligatorio').trim().not().isEmpty(),
    check("detalles").custom(detallesVacios),
    check("detalles").custom(existeArticuloStock), 
    validarCampos 
  ],ventaPost) 
 
router.get("/",validarJWT, ventaGet)

router.get("/query",[validarJWT,
    
    check('query', 'Digite el parametro de busqueda').not().isEmpty(),
    check('usuario').custom(helperVenta.existeVentaByUsuario),
    validarCampos
], ventaGetQuery)

router.get("/id:id/",[validarJWT,
    check('id','No es un mogoId valido').isMongoId(),
    check('id').custom(helperVenta.existeVentaById),
   
    validarCampos
   ], ventaGetById)

router.put("/:id",[validarJWT,
   
    check('id', 'No es un mongoId valido').isMongoId(),
    check('id').custom(helperVenta.existeVentaById),
    check("usuario", 'El usuario es obligatorio').trim().not().isEmpty(),
    check("cliente", 'El cliente es obligatorio').trim().not().isEmpty(),
    check("tipoComprobante", 'El tipoComprobante es obligatorio').trim().not().isEmpty(),
    check("serieComprobante", 'El serieComprobante es obligatorio').trim().not().isEmpty(),
    check("numComprobante", 'El numeroComprobante es obligatorio').trim().not().isEmpty(),
    check("impuesto", 'El impuesto es obligatorio').trim().not().isEmpty(),
    validarCampos
],ventaPut)

router.put("/activar/:id",
    [validarJWT,
    
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperVenta.existeVentaById),
    validarCampos
   ], ventaPutActivar)

router.put("/desactivar/:id",
     [validarJWT,
   
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperVenta.existeVentaById),
    validarCampos
   ], ventaPutDesactivar)

router.delete("/:id",
[validarJWT,
    
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperVenta.existeVentaById),
    validarCampos
   ],ventaDelete)

   export default router
