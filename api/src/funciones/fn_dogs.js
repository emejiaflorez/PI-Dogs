const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Dog } = require("../db");
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
      //Traida de los Datos desde la Api. Falta

      //Traida de los Datos desde la Base de Datos. OK
      const { name } = req.query;
      const condition = name
            ? {where: { name : name }} 
            : {}
            condition.attributes = { exclude: ['createdAt','updatedAt','weight','height','id','life_span'] }
      const dogs = await Dog.findAll(condition);
      //Concatenar Array. de los datos filtrados desde Api y BD. Falta
      res.json(dogs.length ? dogs : 'No dogs found... - No se encontraron perros..');
  }
  catch(error){res.send(error)}
}

module.exports = {
  Add_Dog, 
  Get_Dogs
}