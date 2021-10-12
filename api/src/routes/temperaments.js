const { Router } = require('express');
const router = Router();

const { Get_Temps } = require('../funciones/fn_temps')
router.get("/", Get_Temps)

module.exports = router;