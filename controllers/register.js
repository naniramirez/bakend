

import Login from '../models/login.js'
import bcryptjs from "bcryptjs"

//registro
const registroPost= async (req,res)=>{
  const {nombre,  email, password, rol}=req.body; // raw tipo json
  const login= new Login({nombre, email,rol,  password});
 
  // encriptar
  const salt =bcryptjs.genSaltSync(10); // 10 por defecto  100 sria mas seguro
  login.password=bcryptjs.hashSync(password, salt); // una sola via

  await login.save()

  res.json({
    login
  })

}
const registroGet = async (req, res = response) => {
  const login = await Login.find()//param1 la busquea, param2 prop filtradas , si dejo nombre:1 solo muestra nombre tambien con {nombre:0} lo puedo quitar ojo llaves
    .sort({ 'createdAt': -1 }) //descendente 1 para ascendente
  //const categoria=await Categoria.find({},{nombre:1});//solo muestra el nombre
  res.json({
    login
  })
}
const registroGetQuery = async (req, res) => {
  const query = req.query.query;
  const login= await Login.find({
    $or: [
        { nombre: new RegExp(query, 'i') },
        { direccion: new RegExp(query, 'i') },
        { telefono: new RegExp(query, 'i') },
        { email: new RegExp(query, 'i') },
        { password: new RegExp(query, 'i') },
        { rol: new RegExp(query, 'i') },
    ]
  })//param1 la busquea, param2 prop filtradas , si dejo nombre:1 solo muestra nombre tambien con {nombre:0} lo puedo quitar ojo llaves
    .sort({ 'createdAt': -1 }) //descendente 1 para ascendente
  //const categoria=await Categoria.find({},{nombre:1});//solo muestra el nombre
  res.json({
    login
  })

}

const registroGetById = async (req, res) => {
  const id = req.params.id
  const login = await Login.findOne({ _id: id });
  res.json({
    login
  })
}

const registroPut = async (req, res) => {
  const { id } = req.params;
  const { _id, email, estado, password,...resto } = req.body;
  const login = await Login.findByIdAndUpdate(id, resto);

  if(password){
    const salt =bcryptjs.genSaltSync(10); // 10 por defecto  100 sria mas seguro
     resto.password=bcryptjs.hashSync(password, salt);
  }

  res.json({
       login
  })
}
const registroPutActivar = async (req, res) => {
  const { id } = req.params;
  const login = await Login.findByIdAndUpdate(id,{estado:1});

  res.json({
    login
  })

}
const registroPutDesactivar = async (req, res) => {
  const { id } = req.params;
  const login= await Login.findByIdAndUpdate(id,{estado:0});

  res.json({
    login
  })

}
const registroDelete = async (req, res) => {
  const { id } = req.params;
  const login = await Login.findByIdAndDelete(id);

  res.json({
    login
  })
}

export { registroPost, registroGet, registroGetById, registroGetQuery, registroDelete, registroPut, registroPutActivar, registroPutDesactivar,}