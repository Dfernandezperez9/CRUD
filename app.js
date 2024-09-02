const EXPRESS = require("express");
const APP = EXPRESS();
const ROUTE = require("./ruta");
const DATA = require("./data");
const PORT = 3000;

APP.use(EXPRESS.json());
APP.use(EXPRESS.urlencoded({ extended: true }));

APP.use("/", ROUTE);
APP.use("/usuarios", ROUTE);

APP.post('/eliminar/:nombre', (req, res) => {
    const NOMBRE = req.params.nombre;
    const _METHOD = req.body._method;
    if (_METHOD === 'DELETE') {
        res.send(`
        <h1>Usuario ${NOMBRE} eliminado con éxito</h1>
        <a href="/">Volver</a>
        `);
    } else {
        res.status(405).send('Método no permitido');
    }
});

APP.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});