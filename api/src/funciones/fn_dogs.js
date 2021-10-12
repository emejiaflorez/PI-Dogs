const { Dog } = require("../db");
const axios = require('axios');

async function Add_Dog (req, res) {
      //console.log(req.body);
      const { name, weight, height, life_span, image, temps} = req.body;
      try {
           const newDog = await Dog.create(
              { name, weight, height, life_span, image }
           );
           //console.log(temps);
           //console.log(image);
           await newDog.addTemperaments(temps);  
           res.json(newDog);
      } 
      catch (error) { res.send(error); }
}

module.exports = {
  Add_Dog
}