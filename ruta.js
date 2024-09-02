const express = require("express");
const APP = express();
const ROUTE = express.Router();
const DATA = require("./data");
const USUARIOS = DATA.usuarios;


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
            <input type="text" id="lugar" name="lugar" required><br>
            <button type="submit">Agregar usuario</button>
            <a href="/usuarios">Usuarios</a>
        </form>
    `);
});



ROUTE.get("/usuarios", (req, res) => {
	res.json(USUARIOS);
});

ROUTE.post("/usuarios", (req, res) => {
	const NUEVO_USUARIO = {
		id: USUARIOS.length + 1,
		nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.edad
	};
    USUARIOS.push(NUEVO_USUARIO);
	res.redirect("/");
});

module.exports = ROUTE;