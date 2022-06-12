import { Router } from "express";
import { check } from "express-validator";
import { categoriaGet, categoriaPost, categoriaGetQuery, categoriaGetById, categoriaPut, categoriaPutActivar, categoriaPutDesactivar, categoriaDelete } from "../controllers/categoria.js";
import helperCategoria from "../helpers/db-categorias.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";


const router = Router()

router.get("/", categoriaGet)

router.get("/query",
    [validarJWT,
   
    check('query','Digite el parametro de busqueda').not().isEmpty(),
    check('nombre').custom(helperCategoria.existeCategoriaByNombre),
    //check("nombre",'No puede exceder 50 caracteres').length({max:50}),
  validarCampos
], categoriaGetQuery)

router.get("/id:id/",[validarJWT,
  
 check('id','No es un mogoId valido').isMongoId(),
 check('id').custom(helperCategoria.existeCategoriaById),

 validarCampos
], categoriaGetById)

router.post('/',[

  check("nombre", 'El nombre es obligatorio').trim().not().isEmpty().isLength({max:50}),
  check("descripcion", 'La descripcion es obligatoria').trim().not().isEmpty().isLength({max:250}),
  check('nombre',).custom(helperCategoria.existeCategoriaByNombre),
  validarCampos
],categoriaPost)

router.put("/:id", [validarJWT,
  
  check('id', 'No es un mongoID ').isMongoId(),
  check("nombre", 'El nombre es obligatorio').trim().not().isEmpty(),
  check("descripcion", 'La descripcion es obligatoria').trim().not().isEmpty(),
  check('id',).custom(helperCategoria.existeCategoriaById),
  validarCampos
],categoriaPut)

router.put("/activar/:id", [validarJWT,
  
  check('id', 'No es un mongoID ').isMongoId(),
  check('id',).custom(helperCategoria.existeCategoriaById),
  validarCampos
],categoriaPutActivar)

router.put("/desactivar/:id", [validarJWT,

  check('id', 'No es un mongoID ').isMongoId(),
  check('id',).custom(helperCategoria.existeCategoriaById),
  validarCampos                             //validar que sea un mongoId 
],categoriaPutDesactivar) 



router.delete("/:id", [validarJWT,

  check('id', 'No es un mongoID ').isMongoId(),
  check('id',).custom(helperCategoria.existeCategoriaById),
  validarCampos
],categoriaDelete)


export default router