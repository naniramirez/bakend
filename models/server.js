//const express = require('express')
import express  from "express"
import cors from "cors"
import { dbConnection } from "../database/config.js"

//importar  rutas
import categorias from "../routes/categoria.js"
import articulos from "../routes/articulo.js"
import register from "../routes/register.js"
import login from "../routes/login.js"
import venta from "../routes/venta.js"
import cliente from "../routes/cliente.js"
import proveedor from "../routes/proveedor.js"
import ingreso from "../routes/ingreso.js"




class Server{
    constructor(){
        this.app=express()
        this.port = process.env.PORT
        this.middlewares()
        this.conexionDB()
        this.routes()
        }


routes(){
    this.app.use("/api/categoria", categorias)
    this.app.use("/api/articulo", articulos)
    this.app.use("/api/login", login)
    this.app.use("/api/register", register)
    this.app.use("/api/venta", venta)
    this.app.use("/api/cliente", cliente) 
    this.app.use("/api/proveedor", proveedor)
    this.app.use("/api/ingreso", ingreso)
    
  
    
    

}

middlewares(){
    this.app.use(cors())
    this.app.use(express.static("public"))
    this.app.use(express.json())
}

async conexionDB(){
   await dbConnection()
}

   listen(){
       this.app.listen(this.port,()=>{
           console.log(`Servidor corriendo en ${this.port}`)
       })
   }
}



export {Server}


 