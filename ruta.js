const express = require("express");
const APP = express();
const ROUTE = express.Router();
const DATA = require("./data");
let USUARIOS = DATA.usuarios;


ROUTE.get("/", (req, res) => {
    res.send(`
        <h1>Lista de usuarios</h1>
        <ul>
            ${USUARIOS.map((usuario) => `
                <li>
                    <form action="/eliminar/${usuario.nombre}" method="POST">
                        <input type="hidden" name="_method" value="DELETE"> <button type="submit">Eliminar</button>
                        ID: ${usuario.id} | Nombre: ${usuario.nombre} | Edad: ${usuario.edad} | Lugar: ${usuario.lugarProcedencia}
                    </form>
                </li>
            `).join("")}
        </ul>
        <form action="/usuarios" method="POST">
            <label for="nombre">Nombre</label>
            <input type="text" id="nombre" name="nombre" required><br>
            <label for="edad">Edad</label>
            <input type="text" id="edad" name="edad" required><br>
            <label for="lugar">Lugar</label>
            <input type="text" id="lugarProcedencia" name="lugarProcedencia" required><br>
            <button type="submit">Agregar usuario</button>
            <a href="/usuarios">Usuarios</a>
        </form>
    `);
});


ROUTE.post("/eliminar/:nombre", (req, res) => {
    const FS = require('fs');
    const NOMBRE = req.params.nombre;
    const _METHOD = req.body._method;
    if (_METHOD === 'DELETE') {
      const INDEX = USUARIOS.findIndex((usuario) => usuario.nombre === NOMBRE);
      if (INDEX !== -1) {
        USUARIOS.splice(INDEX, 1);
        const DATA = JSON.stringify(USUARIOS);
        FS.writeFileSync('data.json', DATA);
         USUARIOS = require('./data').usuarios;
        res.redirect("/");
      } else {
        res.status(404).send("Usuario no encontrado");
      }
    } else {
      res.status(405).send('Método no permitido');
    }
  });



ROUTE.get("/usuarios", (req, res) => {
	res.json(USUARIOS);
});

ROUTE.post("/usuarios", (req, res) => {
	const NUEVO_USUARIO = {
		id: USUARIOS.length + 1,
		nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.lugarProcedencia
	};
    USUARIOS.push(NUEVO_USUARIO);
	res.redirect("/");
});

module.exports = ROUTE;