const { Router } = require('express');
const router = Router();
const { Add_Dog, Get_Dogs, Get_Dog_ById } = require('../funciones/fn_dogs.js')

router.post("/add", Add_Dog)
router.get("/", Get_Dogs)
router.get("/:id", Get_Dog_ById)

module.exports = router;