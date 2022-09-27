const fs = require("fs");
const path = require("path");
const Users = require('../../models/Users')

const { crearUsers, cargarUsers} = require("../data/db_usersModules");
const { validationResult } = require("express-validator");

const bcryptjs = require('bcryptjs');
    
    module.exports = {
        registro : (req,res) => {
            const users = cargarUsers();
            return res.render('./register',{
                users
            })
        },
        prosesarRegistro : (req,res) => {
            const errors = validationResult(req);
            const users = cargarUsers();
            if(errors.isEmpty()){
            const {first_name,last_name,user_name,email,fecha_nacimiento,domicilio,password,perfil_usuario,categorias} = req.body;
               const newUser = {
                    id: users[users.length - 1] ? users[users.length - 1].id + 1 : 1,
                    first_name : first_name.trim(),
                    last_name : last_name.trim(),
                    user_name : user_name.trim(),
                    email : email.trim(),
                    fecha_nacimiento,
                    domicilio,
                    perfil_usuario,
                    password : bcryptjs.hashSync(password.trim(),10),
                    password2 :  password2 = () => {if(password2 == true || password2 == false){
                        return delete password2
                        }},
                    categorias: categorias && categorias.length > 1 ? categorias : [categorias],
                    avatar: req.file ? req.file.filename : req.session.userLogged.avatar
               }
              
        
               const usersModify = [...users, newUser];
        
               crearUsers(usersModify);
               return res.redirect('/')
            }else {
                return res.render('./register', {
                    errors : errors.mapped(),
                    old : req.body
                })
            }
        },
        login : (req,res) => {
            return res.render('./login')
        },
        procesarLogin : (req,res) => {
            const users = cargarUsers();
            let errors = validationResult(req);
            let userGuardado = users.find(user => user["user_name"] === req.body.user_name)

            if(userGuardado){
                let {user_name, password } = userGuardado;
                return res.redirect('/')
            }else {
                return res.render('./login',{
                    errors: {
                        ...errors,
                        user_name: {
                            msg: "Las credenciales son invalidas"
                        }
                    },
                    old: req.body
                })
            }
        },
        perfil : (req,res) => {
           return res.render('./perfil', {
           user : req.session.userLogin
           })
        },
        processperfil : (req,res) => {
            const {first_name, last_name ,email, password, avatar} = req.body;

            let usersModify = cargarUsers().map(user => {
                if(user.id === +req.params.id){
                    return {
                        ...user,
                        ...req.body,
                        recordarColor,
                        avatar : req.file ? req.file.filename : req.session.userLogin.avatar
                    }
                }
                return user
            });
    
            if(req.file && req.session.usuario.avatar){
                if(fs.existsSync(path.resolve(__dirname,'..','public','images','avatar',req.session.userLogin.avatar))){
                    fs.unlinkSync(path.resolve(__dirname,'..','public','images','avatar',req.session.userLogin.avatar))
                }
            }
        
            req.session.userLogin = {
                ...req.session.userLogin,
                first_name,
                avatar : req.file ? req.file.filename : req.session.userLogin.avatar
            }
    
            storeUsers(usersModify);
            return res.redirect('./users/perfil')
            
        },
        logout : (req,res) => {
            req.session.destroy()
            return res.redirect('/')
        }
    }