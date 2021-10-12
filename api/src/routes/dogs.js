const { Router } = require('express');
const router = Router();
 const { Add_Dog, Get_Dogs, Get_Dog_ById } = require('../funciones/fn_dogs.js')

router.post("/add", Add_Dog)
// router.get("/", getDogs)
// router.get("/:id", getDogById)

module.exports = router;