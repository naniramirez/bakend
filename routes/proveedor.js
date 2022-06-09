
import { Router } from "express";
import { check } from "express-validator";
import { proveedorPost, proveedorGet, proveedorGetQuery, proveedorGetById, proveedorPut,proveedorPutActivar,proveedorPutDesactivar,proveedorDelete} from "../controllers/proveedor.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import helperProveedor from "../helpers/db-proveedor.js";
import { validarJWT } from "../middlewares/validar-jwt.js";


const router = Router()

router.get('/', [validarJWT,
],proveedorGet)

router.get('/query',validarJWT,
    
    check('query', 'Los campos son obligatorios').not().isEmpty(),
    validarCampos
,proveedorGetQuery)

router.get('/id/:id',[validarJWT,
    
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperProveedor.existeProveedorById),
    validarCampos //validar que sea un mongoId todas las rutas donde hayan parametros id
],proveedorGetById)



router.post('/',[validarJWT,
    check("nombre", 'El nombre es obligatorio').trim().not().isEmpty(),
    check("tipoPersona", 'El tipo de persona es obligatorio').trim().not().isEmpty(),
    check("tipoDocumento", 'El tipo de documento es obligatorio').trim().not().isEmpty(), 
    check("numDocumento", 'El numero de documento es obligatorio').trim().not().isEmpty(),
    check("direccion", 'la direccion es obligatoria').trim().not().isEmpty(), 
    check("telefono", 'El telefono es obligatorio').trim().not().isEmpty(),
    check('email', 'El correo no es valido').trim().isEmail(),
    check('email').custom(helperProveedor.existeProveedorByemail),
    check('numDocumento').custom(helperProveedor.existeProveedorBynumeroDocumento),
    validarCampos
],proveedorPost)




router.put("/:id",[validarJWT,
  
    check('id', 'No es un mongoID ').isMongoId(),
    check("tipoPersona", 'El tipo de persona es obligatorio').trim().not().isEmpty(),
    check("tipoDocumento", 'El tipo de documento es obligatorio').trim().not().isEmpty(),
    check("numDocumento", 'El numero de documento es obligatorio').trim().not().isEmpty().isLength({max:15}),
    check("direccion", 'la direccion es obligatoria').trim().not().isEmpty(),
    check("telefono", 'El telefono es obligatorio').trim().not().isEmpty().isLength({max:15}),
    check('email', 'El correo no es valido').trim().isEmail(),
    check('id',).custom(helperProveedor.existeProveedorById),
    check('numDocumento',).custom(helperProveedor.existeProveedorBynumeroDocumento),
    check('email',).custom(helperProveedor.existeProveedorByemail),
    validarCampos
], proveedorPut)

router.put("/activar/:id", [validarJWT,
   
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperProveedor.existeProveedorById),
    validarCampos
],proveedorPutActivar)

router.put("/desactivar/:id", [validarJWT,
  
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperProveedor.existeProveedorById),
    validarCampos                             //validar que sea un mongoId 
], proveedorPutDesactivar)

router.delete('/:id', [validarJWT,
    check('id', 'No es un mongoID ').isMongoId(),
    check('id',).custom(helperProveedor.existeProveedorById),
    validarCampos
], proveedorDelete)

export default router