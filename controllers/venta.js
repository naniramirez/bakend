
import Venta from "../models/venta.js"
import Articulo from "../models/articulo.js"


const ventaPost = async (req, res)=>{
    const {usuario, cliente,tipoComprobante, numComprobante, serieComprobante, impuesto, total, detalles} =req.body
    const fecha = new Date(Date.now() + (-1*new Date().getTimezoneOffset()*60000)).toISOString()
    const venta= new Venta({usuario, cliente, tipoComprobante, numComprobante, serieComprobante, impuesto, total, fecha, detalles})
// esta funcion es para que el articulo se acaba
    venta.detalles.forEach(async (e) => { 
        e.subtotal=(e.cantidad * e.precio )-((e.cantidad * e.precio)*e.descuento)/100
        venta.total=venta.detalles.reduce((x,y)=>x+=y.subtotal, 0 ) 
        let { stock } = await Articulo.findById({ _id: e.id });
        stock = stock - e.cantidad
        await Articulo.findByIdAndUpdate(e.id, { stock })
        console.log(e.nombre);
        })
    await venta.save()
    

    res.json(venta)
}
 const ventaGet = async (req, res = response) => {
      
    const venta = await Venta.find()
    .populate ('usuario', ['rol' ,'nombre'])
    .populate('cliente', 'nombre')
    .sort({ 'createdAt': -1 })
    res.json({    
    venta  
  })
  } 
  
 
 const ventaGetQuery =async(req, res)=>{
     const query = req.query.query;
     const venta = await Venta.find({
         $or:[
            { usuario: new RegExp(query, 'i') },
            { cliente: new RegExp(query, 'i') },
            { proveedor: new RegExp(query, 'i') },
            { tipoComprobante: new RegExp(query, 'i') },
            { numComprobante: new RegExp(query, 'i') },
            { serieComprobante: new RegExp(query, 'i') },
            { impuesto: new RegExp(query, 'i') },
            { total: new RegExp(query, 'i') },
            {fecha: new RegExp(query, 'i')}

         ]
     })
     .sort({'createdAt': -1})
     res.json({
         venta
     })
 }

 const ventaGetById= async(req, res)=>{
     const id = req.params.id
     const venta =await Venta.findOne({ _id: id});
     res.json({
         venta
     })
 }

 const ventaPut = async(req, res)=>{
     const {id} = req.params;
     const {_id, createdAt, estado,...resto}= req.body;
     const venta = await Venta.findByIdAndUpdate(id, resto);
     res.json({
         venta
     })
 }
 const ventaPutActivar = async(req, res)=>{
     const {id} = req.params;
     const venta = await Venta.findByIdAndUpdate(id,{estado:1});

     res.json({
         venta
     })

 }
 const ventaPutDesactivar = async(req, res)=>{
    const {id} = req.params;
    const venta = await Venta.findByIdAndUpdate(id,{estado:0});

    res.json({
        venta
    })

}
const ventaDelete = async (req, res) => {
    const { id } = req.params;
    const venta = await Venta.findByIdAndDelete(id);
  
    res.json({
      venta
    })
  }
  



export {ventaPost,ventaGet, ventaGetQuery, ventaGetById,ventaPut, ventaPutActivar, ventaPutDesactivar, ventaDelete}