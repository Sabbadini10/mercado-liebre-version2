const fs = require('fs')

const Users = {
    fileName : './database/users.json',
    getData : function(){
        return JSON.parse(fs.readFileSync(this.fileName, "utf-8")) //devuelve el json en un array de objetos con clave valor
    },

    findAll: function (){ 
        return this.getData();
    },

    generateId: function() {
    let allUsers = this.findAll();
    let lastUsers = allUsers.pop()
    if(lastUsers){
        return lastUsers.id + 1; 
    }
    return 1
      
},

    findByPk: function(id){ //buscar usuario por id Pk es primary key
        let allUsers = this.findAll();
        let usersFound = allUsers.find(user => user.id === id)
        return usersFound
    },
    findFullInput: function(field, text){ //buscar usuario por campos
        let allUsers = this.findAll();
        let usersFound = allUsers.find(user => user[field]=== text)
        return usersFound
    },

    
    createUsers : function(userData) { // crear un usuario
        let allUsers = this.findAll();
        let newUsers = {
            id : this.generateId(),
            ...userData
        }
        allUsers.push(newUsers);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '));
        return newUsers
    },
    deleteUsers: function(id){
        let allUsers = this.findAll();
        let finalUser = allUsers.filter(user => user.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUser, null, ' '));
        return true
    }
}

module.exports = Users;