//import bcryptjs from "bcryptjs";
import {response} from "express"
import Login from "../models/login.js"
import bcryptjs from "bcryptjs"
import {generarJWT} from "../middlewares/validar-jwt.js"



// login 

const login= async (req, res = response) =>{
  const { email, password} = req.body
    try{
        // verificar si exite
        const login =await Login.findOne({email})

        if (!login) {
            return res.status(400).json({
              msg:'usuario/ password no son correctos'
            })
        }

        if (login.estado===0) { // Contraseña es correcta!
            return res.status(400).json({
              msg: 'user/ Password no son correctos'
            })
        }

        // verificar contraseña 

        const validPassword= bcryptjs.compareSync(password, login.password);
        if(!validPassword){
          return res.status(400).json({
            msg: 'user/password no son correctos'
          })
        }
        // generar jwt

        const token= await generarJWT(login.id)
        res.json({
          login,
          token
        })

    } catch (error){
      console.log(error);
      return res.status(500).json({
        msg:'Hable con el administrador'
      })
    }
}

export {login}