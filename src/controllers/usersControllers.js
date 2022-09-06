const fs = require("fs");
const path = require("path");
const Users = require('../../models/Users')

const { crearUsers, cargarUsers} = require("../data/db_usersModules");
const { validationResult } = require("express-validator");

const bcryptjs = require('bcryptjs');
    
    module.exports = {
        registro : (req,res) => {
            return res.render('./register')
        },
        prosesarRegistro : (req,res) => {
            const errors = validationResult(req);

            if (req.fileValidationError) {
                errors = {
                    ...errors,
                    images: {
                        msg: req.fileValidationError,
                    },
                };
            }
    
            if(errors.isEmpty()){
                const users = cargarUsers();
                let avatar;
            if (req.files.length > 0) {
                avatar = req.files.map((avatar) => avatar.filename);
            }
            const {first_name,last_name,email,password} = req.body;
               const newUser = {
                id: users[users.length - 1] ? users[users.length - 1].id + 1 : 1,
                first_name : first_name.trim(),
                last_name : last_name.trim(),
                email : email.trim(),
                password : bcryptjs.hashSync(password.trim(),10),
                avatar:  [`../images/avatar/${avatar}`] ? [`../images/avatar/${avatar}`] : [`../images/avatar/imagenDefault.jpg`]
               }
        
               const usersModify = [...users, newUser];
        
               crearUsers(usersModify);
               return res.redirect('./users/perfil')
            }else{
                if(req.files.length > 0){
                    req.files.forEach(({filename}) => {
                        fs.existsSync(path.resolve(__dirname,'..','public','images','avatar',filename)) &&  fs.unlinkSync(path.resolve(__dirname,'..','public','images','avatar',filename))
                    })
                }
            
                return res.render('./register', {
                    errors,
                    old : req.body
                })
            }
    
        
        },
        login : (req,res) => {
            return res.render('./login')
        },
        procesarLogin : (req,res) => {
            let errors = validationResult(req);
    
            if(errors.isEmpty()){
    
                let {id, firstName, rol, avatar} = cargarUsers().find(user => user.email === req.body.email);
    
                req.session.userLogin = {
                    id,
                    first_name,
                    rol,
                    avatar
                }
                return res.redirect('/')
            }else {
                let errors = validationResult(req);
                return res.render('./login',{
                    errors : errors.mapped()
                })
            }
        },
        perfil : (req,res) => {
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