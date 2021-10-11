const { Temperament } = require("../db");
const axios = require('axios');

//Precarga de Temperamentos
async function Precarga_Temps(){ 
    try {
        let temps = (await axios.get("https://api.thedogapi.com/v1/breeds")).data;
        let sarta = "";
        temps.forEach(t => { sarta = sarta + t.temperament;})
        temps = sarta.split(",");
        temps = temps.filter((t, i) => { return temps.indexOf(t) === i;}).sort();
        await Promise.all(temps.map( t => Temperament.create({ name : t})))
        return "Temperamentos Cargados Exitosamente... - Successfully charged temperaments..."
    }
    catch (error) {
        console.log(error);
        return "No se pudieron cargar Exitosamente los Temperamentos..- Temperaments could not be successfully charged ..."
    }
}

module.exports = {
   Precarga_Temps
}

