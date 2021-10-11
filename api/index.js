//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { Precarga_Temps } = require('./src/funciones/fn_temps')

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
   server.listen(3001, async () => {
     //Precargamos a la BD: dogs todos los paises desde la Api restCountries
       console.log('Procesando Precarga de Temperamentos...'); // eslint-disable-line no-console
       const preCarga = await Precarga_Temps()
       console.log(preCarga)
       console.log('%s listening at 3001 - Servidor Escuchando por el puerto 3001');
   });
});
