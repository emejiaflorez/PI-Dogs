const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Dog, Temperament } = require("../db");
const axios = require('axios');

//Creacion de las raza de los perros. -----------------------------------------------------
async function Add_Dog (req, res) {
      const { name, weight, height, life_span, image, temps} = req.body;
      try {
         const newDog = await Dog.create({ name, weight, height, life_span, image });
         await newDog.addTemperaments(temps);  
         res.json(newDog);
      } 
      catch (error) { res.send(error); }
}

//Obtener Listado de las Razas de los Perros tanto de la Api como de la BD.----------------
async function Get_Dogs (req,res){
  try {
      const { name } = req.query;
      let allDogs = [];

      //Únicos Endpoints/Flags que pueden utilizar.
      !name ? url ="https://api.thedogapi.com/v1/breeds"
      : url = `https://api.thedogapi.com/v1/breeds/search?q=${name}`;
        
      //Preparacion de la consulta en la Base de Datos.
      const condition = name 
      ? {where: { name :{[Op.like]: name } }}
      : {}
        condition.attributes = { exclude: ['createdAt','updatedAt','height','id','life_span'] }

     //Me falta traer los temperamentos asociados a los perros dese la B.D
     //const dbDogs = await Dog.findAll({include: Temperament }, condition);
     
     //Traida de los Datos desde la Base de Datos. 
     //Traida de los Datos desde la Api_Externa.
      const dbDogs  = await Dog.findAll(condition);
      const apiDogs = (await axios.get(url)).data;
      
      //Concatenar Arrays. de los datos filtrados desde la Api y BD. y respuesta
      allDogs = apiDogs.concat(dbDogs);
      res.json(allDogs.length ? allDogs : 'Dogs Not found... - No se encontraron perros..');
    
  }
  catch(error){res.send(error)}
}

//Obtener detalle de una raza en particular haciendo uso Id. ---------------------------------
//OJO con el id de la api que se puede solapar con el de la base de datos---------------------
async function Get_Dog_ById (req,res){
  try {
    const { id } = req.params ;
    const {name} = req.body;
    
    // ----------------------------SOLUCION---------------------------------------------------
    // ojo habria que tener una validacion en el post/add de no insertar en la BD razas que
    // ya estan en la api. y no tendria que modelar nada en la BD. asi se repitan los id ya 
    // que en la plantilla voy a Obtener el nombre de la raza del perro.

    //1. Primero consulto en la base de datos por id y name si se encuentra respondo sino
    //2. Consulto por la api ahi lo deberia encontrar.-----------------------------------------
    
    //Faltaria incluir los Temperamentos desde la BD. (falta)
    const dbDog = await Dog.findOne({ where: {id: id, name: name}})    
    if (!!dbDog){
        res.json(dbDog)
    }
    else {
      let apiDog = (await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)).data;
      res.json(apiDog);
      // let apiDog = (await axios.get("https://api.thedogapi.com/v1/breeds")).data;
      // apiDog = apiDog.find(e => e.id == id && e.name == name);
      // console.log(apiDog);
      // res.json(apiDog);
    }
    
  }
  catch {res.send(error)}
}

module.exports = {
  Add_Dog, 
  Get_Dogs,
  Get_Dog_ById
}


//const dbDogs = await Dog.findAll(condition 
  // include [{
  //    model : Temperament,  
  //    where : {id : 1 },
  //    attributes: ['name']}]
//);