const { Router } = require('express');
const router = Router();

/* Importar todos los routers;
   Ejemplo: const authRouter = require('./auth.js');*/
const dogs = require('./dogs')
const temperaments = require('./temperaments')

/* Configurar los routers
   Ejemplo: router.use('/auth', authRouter); */
router.use("/dogs", dogs )
router.use("/temperaments", temperaments )

module.exports = router;
