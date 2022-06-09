import Proveedor from "../models/proveedor.js";

const proveedorPost = async (req,res) =>{
    const {nombre, tipoPersona, tipoDocumento, numDocumento, direccion, telefono,email} = req.body
    const proveedor = new Proveedor({nombre, tipoPersona, tipoDocumento, numDocumento, direccion, telefono, email})
    await proveedor.save()

    res.json()
}

const proveedorGet = async (req, res = response) =>{
    const proveedor = await Proveedor.find()
       .sort({'create': -1})

       res.json({
           proveedor
       })
}

const proveedorGetQuery = async(req, res) =>{
    const query = req.query.query;
    const proveedor = await Proveedor.find({ 
        $or: [
            {nombre: new RegExp(query, 'i')},
            {tipoPersona: new RegExp(query, 'i')},
            {tipoDocumento: new RegExp(query, 'i')},
            {numDocumento: new RegExp(query, 'i')},
            {direccion: new RegExp(query, 'i')},
            {telefono: new RegExp(query, 'i')},
            {email: new RegExp(query, 'i')},

        ]
    })
    .sort({'createAt' :-1})

    res.json({
        proveedor
    })
}

const proveedorGetById = async (req, res)=>{
    const id = req.params.id
    const proveedor = await Proveedor.findOne({_id: id});
    res.json({
        proveedor
    })
}

const proveedorPut = async (req, res)=>{
    const { id } = req.params;
    const { _id, createdAt, estado, ...resto } = req.body;

  const proveedor = await Proveedor.findByIdAndUpdate(id, resto);

  res.json({
   proveedor
  })
}

const proveedorPutActivar = async (req, res) => {
    const { id } = req.params
    const proveedor = await Proveedor.findByIdAndUpdate(id,{estado:1});
  
    res.json({
      proveedor
    })
  
  }
  const proveedorPutDesactivar = async (req, res) => {
    const { id } = req.params;
    const proveedor = await Proveedor.findByIdAndUpdate(id,{estado:0});
  
    res.json({
      proveedor

    })
  
  }
  const proveedorDelete = async (req, res) => {
    const { id } = req.params;
    const proveedor = await Proveedor.findByIdAndDelete(id);
  
    res.json({
      proveedor
    })
  }

  export {proveedorPost, proveedorGet, proveedorGetById, proveedorGetQuery, proveedorPut, proveedorPutActivar, proveedorPutDesactivar, proveedorDelete}

