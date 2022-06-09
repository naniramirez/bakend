
import Cliente from "../models/cliente.js"

const clientePost= async(req, res) =>{
    const {nombre, tipoPersona, tipoDocumento, numDocumento, direccion, telefono, email}=req.body
    const cliente = new Cliente({nombre, tipoPersona, tipoDocumento, numDocumento, direccion, telefono, email})
    await cliente.save()

    res.json(cliente)
}

const clienteGet = async (req, res =response)=>{
    const cliente = await Cliente.find()
    .sort({'created' : -1})

    res.json({
        cliente
    })
}

const clienteGetQuery = async(req, res)=>{
    const query = req.query.query;
    const cliente = await Cliente.find({
        $or:[
            { nombre: new RegExp(query, 'i') },
            { tipoPersona: new RegExp(query, 'i') }, 
            { tipoDocumento: new RegExp(query, 'i') }, 
            { numDocumento: new RegExp(query, 'i') }, 
            { direccion: new RegExp(query, 'i') }, 
            { telefono: new RegExp(query, 'i') },
            { email: new RegExp(query, 'i') }, 
        ]
        
    })
    .sort({'create': -1})

    res.json({
        cliente 
    })
}

const clienteGetById = async(req, res) =>{
    const id = req.params.id
    const cliente = await Cliente.findOne({_id: id});
    res.json({
        cliente
    })
}
const clientePut = async (req, res) => {
    const { id } = req.params;
    const { _id, createdAt, estado, ...resto } = req.body;
  
    const cliente= await Cliente.findByIdAndUpdate(id, resto);
  
    res.json({
      cliente
   })

}

const clientePutActivar = async (req, res)=>{
    const {id}=req.params;
    const cliente= await Cliente.findByIdAndUpdate(id,{estado:1});

    res.json({
        cliente
    })
}

const clientePutDesactivar = async (req, res)=>{
    const {id}=req.params;
    const cliente= await Cliente.findByIdAndUpdate(id,{estado:0});

    res.json({
        cliente
    })

}
const clienteDelete = async (req, res) => {
    const { id } = req.params;
    const cliente = await Cliente.findByIdAndDelete(id);
  
    res.json({
      cliente
    })
  }

export {clientePost, clienteGet,clienteGetQuery, clienteGetById , clientePut,clientePutActivar,clientePutDesactivar,clienteDelete }

