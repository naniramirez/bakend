import {Router} from "express";
import {check} from "express-validator";
import {articuloGet,articuloPost,articuloGetQuery,articuloGetById,articuloPut,articuloPutActivar,articuloPutDesactivar,articuloDelete} from "../controllers/articulo.js";
import helperArticulo from "../helpers/db-articulo.js";
import {validarCampos} from "../middlewares/validar-campos.js";
import {validarJWT} from "../middlewares/validar-jwt.js";

const router = Router()


router.get("/",validarJWT,[
 ], articuloGet)

router.get("/query",
  [validarJWT,
  check('query', 'Digite el parametro de busqueda').not().isEmpty(),
  check('nombre').custom(helperArticulo.existeArticuloByNombre),
  validarCampos
], articuloGetQuery)

router.get("/id:id/", 
[validarJWT,
  check('id', 'No es un mogoId valido').isMongoId(),
  check('id').custom(helperArticulo.existeArticuloById),
  validarCampos
], articuloGetById)

router.put("/:id", [validarJWT,
  check('id', 'No es un mongoID ').isMongoId(),
  check('nombre', 'El nombre es obligatorio').trim().not().isEmpty(),
  check("categoria", 'La categoria es obligatoria').trim().not().isEmpty(),
  check("stock", 'El stock es obligatorio').trim().not().isEmpty(),
  check("impuesto", 'El impuesto es obligatorio').trim().not().isEmpty(),
  check("precioVenta", 'El precio es obligatorio').trim().not().isEmpty(),
  check("descripcion", 'La descripcion es obligatoria').trim().not().isEmpty(),
  check('id', ).custom(helperArticulo.existeArticuloById),
  check('stock').custom(helperArticulo.articuloStock),
  check('precioVenta').custom(helperArticulo.articuloprecioVenta),
  validarCampos
], articuloPut)

router.post('/', [validarJWT,
  check("codigo", 'El codigo es obligatorio').trim().not().isEmpty(),
  check("nombre", 'El nombre es obligatorio').trim().not().isEmpty().isLength({max:20}),//colocar esto si esta en modelos 
  check("categoria", 'La categoria es obligatoria').trim().not().isEmpty(),
  check("stock", 'El stock es obligatorio').trim().not().isEmpty(),
  check("impuesto", 'El impuesto es obligatorio').trim().not().isEmpty(),
  check("precioVenta", 'El precio es obligatorio').trim().not().isEmpty(),
  check("descripcion", 'La descripcion es obligatoria').trim().not().isEmpty().isLength({max:100}),
  check('stock').custom(helperArticulo.articuloStock),
  check('precioVenta').custom(helperArticulo.articuloprecioVenta),
  check('nombre').custom(helperArticulo.existeArticuloByNombre),
  check('codigo').custom(helperArticulo.existeArticuloByCodigo),
  validarCampos
], articuloPost)

router.put("/activar/:id", [validarJWT,
  check('id', 'No es un mongoID ').isMongoId(),
  check('id', ).custom(helperArticulo.existeArticuloById),
  validarCampos
], articuloPutActivar)

router.put("/desactivar/:id", [validarJWT,
  check('id', 'No es un mongoID ').isMongoId(),
  check('id', ).custom(helperArticulo.existeArticuloById),
  validarCampos
], articuloPutDesactivar)

router.delete("/:id", 
[validarJWT,
  check('id', 'No es un mongoID ').isMongoId(),
  check('id', ).custom(helperArticulo.existeArticuloById),
  validarCampos
], articuloDelete)

export default router