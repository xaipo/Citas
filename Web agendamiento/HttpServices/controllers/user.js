'use strict'
//modulos
var bcrypt = require('bcrypt-nodejs');

//modelos
var User= require('../models/user');
//servicios

var jwt = require('../service/jwt');


//acciones
function pruebas(req,res){
    res.status(200).send({
        message:'test controller pruebas',
        user:req.user
    });
    
}


function saveUser(req,res) {
    //instancia
    var user = new User();
    //body
    var params = req.body;


    if (params.password && params.name && params.surname && params.surname && params.role) {
        user.name = params.name;
        user.surname = params.surname;
        user.email = params.email;
        user.role = params.role;
        user.image = null;

        User.findOne({email:user.email.toLowerCase()}, (err,issetUser)=>{
            if(err){
                res.status(500).send({message: 'Error al comprobar el usuario'});

            }else{
                if(!issetUser){
                    bcrypt.hash(params.password, null, null, function (err, hash) {
                        user.password = hash;
                        user.save((err, userStored)=> {

                            if (err) {
                                res.status(500).send({message: 'Error al guardar el usuario'});
                            } else {
                                if (!userStored) {
                                    res.status(404).send({message: 'No se ha registrado el usuario'});
                                } else {
                                    res.status(200).send({user: userStored});
                                }
                            }

                        })
                    });

                }else{
                    res.status(200).send({message: 'Ya existe el usuario'});

                }
            }


        });

    } else {
        res.status(200).send({message: 'Ingrese todos los datos para registrar el usuario'});

        
    }

}


function login (req,res){
    var params = req.body;

    var email= params.email;
    var password = params.password;
  //  console.log(params);
    User.findOne({email:email.toLowerCase()},(err, issetUser)=>{
        if(err){
            res.status(500).send({message:'Error al comprobar el usuario'})
        }else{
            if(issetUser){
                bcrypt.compare(password,issetUser.password, function(err,check){
                    if(check){
                        if(params.gettoken){
                            res.status(200).send({token:jwt.createToken(issetUser)});
                        }else{
                            res.status(200).send({issetUser})
                        }

                    }else{
                        res.status(404).send({message: 'El usuario no pudo logearse correctamente'});

                    }
                });

            }else{
                res.status(404).send({message: 'El usuario no pudo logearse'});
            }
        }


    })




}


module.exports={
    
    pruebas,
    saveUser,
    login
}