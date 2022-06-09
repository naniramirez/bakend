import { response } from 'express'
import jwt from 'jsonwebtoken'
import Login from "../models/login.js";


const validarJWT = async(req,res=response,next)=>{
    const token=req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg:'No hay token en la peticion'
        })
    }

    try {
        //la funcion si da error dispara un thown new werro por eso el try
        const {uid}=jwt.verify(  token   ,process.env.SECRETORPRIVATEKEY);

        const login=await Login.findById({_id:uid});

        if( !login ) {
            return res.status(401).json({
                msg: 'Token no válido '//- usuario no existe DB
            })
        }

        // Verificar si el uid tiene estado true
        if ( login.estado ==0) {
            return res.status(401).json({
                msg: 'Token no válido ' //- usuario con estado: false
            })
        }
        req.login=login;
        
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'Token no valido'
        })
    }   
}

async function checkToken(token){
    let __id=null;
    try {
        const{_id}=await jwt.decode(token);
        __id=_id;
    } catch (error) {
        return false;
    }
    //const existeUsuario=existeUsuarioPorId(__id);  
   
}

const generarJWT=( uid='')=>{//identificador unico de usuario
    return new Promise((resolve,reject)=>{
        //checkToken();
        const payload={uid};

        jwt.sign(payload,process.env.SECRETORPRIVATEKEY,{
            expiresIn:'4h'//4h
        },(err,token)=>{
            if(err){
                console.log(err);
                reject('No se pudo generar el token')
            }else{
                resolve(token)
            }
        })
    })
}



export  {validarJWT,generarJWT}