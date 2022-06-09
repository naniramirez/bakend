import Articulo from "../models/articulo.js"
 
const articuloPost = async (req, res) => {
    const { codigo, nombre, categoria, stock, impuesto, precioVenta, descripcion } = req.body
    const articulo = new Articulo({ codigo, nombre, categoria, stock, impuesto, precioVenta, descripcion })
    await articulo.save()
    
    res.json(articulo)
  } 

  const articuloGet = async (req, res = response) => {
    const articulo = await Articulo.find() 
    .populate('categoria', 'nombre') 
      .sort({ 'createdAt': -1 })
  res.json({  
        articulo
      })  
  }
  const articuloGetQuery= async(req, res = response)=>{ 
    const query = req.query.query 
    const articulo= await Articulo.find({ 
      $or:[
        {codigo: new RegExp(query, 'i')},
        {nombre: new RegExp(query,'i')}, 
        {categoria : new RegExp(query,'i')},
        {stock: new RegExp(query,'i')},
        {impuesto: new RegExp(query,'i')},
        {recioVenta: new RegExp(query,'i')},
        {descripcion: new RegExp(query,'i')},
        
      ]
    })
    .sort({'createdAt': -1})
    res.json({
      articulo
    })
    }

    const articuloGetById= async (req, res) => {
        //const {id}= req.query
        const { id } = req.params.id
        const articulo = await Articulo.findOne({ _id: id });
        res.json({
          articulo
        })
      }
      const articuloPut= async (req, res )=>{
        const{id} = req.params;
        const {_id, createdAt, estado, ... resto} = req.body;
        const articulo = await Articulo.findByIdAndUpdate(id, resto);
        res.json({
          articulo
        })
      }
      const articuloPutActivar = async (req, res) => {
        const { id } = req.params;
        const articulo = await Articulo.findByIdAndUpdate(id,{estado:1});
      
        res.json({
          articulo
        })
      
      }
      const articuloPutDesactivar = async (req, res) => {
        const { id } = req.params;
        const articulo = await Articulo.findByIdAndUpdate(id,{estado:0});
      
        res.json({
          articulo
        })
      
      }
      const articuloDelete= async(req, res)=>{
        const {id}= req. params;
        const articulo = await Articulo.findByIdAndDelete(id);
        res.json({
          articulo
        })
      }

    export {articuloPost,articuloGet,articuloGetQuery, articuloGetById,articuloPut, articuloDelete,articuloPutDesactivar,articuloPutActivar }  