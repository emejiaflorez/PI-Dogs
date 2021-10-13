const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Dog, Temperament } = require("../db");
const axios = require('axios');

//Creacion de las raza de los perros. Ok
async function Add_Dog (req, res) {
      const { name, weight, height, life_span, image, temps} = req.body;
      try {
         const newDog = await Dog.create({ name, weight, height, life_span, image });
         await newDog.addTemperaments(temps);  
         res.json(newDog);
      } 
      catch (error) { res.send(error); }
}

//Obtener Listado de las Razas de los Perros tanto de la Api como de la BD.
async function Get_Dogs (req,res){
  try {
      const { name } = req.query;
      let allDogs = [];

      //Traida de los Datos desde la Api_Externa.
      !name ?  url ="https://api.thedogapi.com/v1/breeds"
      : url =`https://api.thedogapi.com/v1/breeds/search?q=${name}`;
        
      //Traida de los Datos desde la Base de Datos. 
      const condition = name 
         ? {where: { name : name }} 
         : {}
         condition.attributes = { exclude: ['createdAt','updatedAt','height','id','life_span'] }
      
      const dbDogs = await Dog.findAll(condition,);
      const apiDogs = (await axios.get(url)).data;

      //Concatenar Arrays. de los datos filtrados desde la Api y BD. 
      allDogs = apiDogs.concat(dbDogs);
      
      res.json(allDogs.length ? allDogs : 'No dogs found... - No se encontraron perros..');
    
  }
  catch(error){res.send(error)}
}

module.exports = {
  Add_Dog, 
  Get_Dogs
}


//const dbDogs = await Dog.findAll(condition 
  // include [{
  //    model : Temperament,  
  //    where : {id : 1 },
  //    attributes: ['name']}]
//);