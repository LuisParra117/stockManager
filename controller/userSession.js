const express = require('express');
const session = require('express-session');
const pool = require('../assets/js/configBdd.js');
const router = express.Router();

router.post('/login', (req, resp) => {
    const {username, password} = req.body;
    
    const consulta =   `SELECT idUsuario, usuario, contraseña, nombre, apellidoP, apellidoM 
                        FROM usuarios 
                        WHERE usuario = sha1(?) AND contraseña = sha1(?);`;

    pool.query(consulta, [username, password], (error, resultados) => {
        
        if (error) {
            console.error('Error en la consulta:', error);
            console.error('consulta: ', consulta);
            return resp.send('Error en el servidor');
        }
    
        if (resultados.length > 0) {
            req.session.isAuthenticated = true;
            req.session.user = resultados[0]; //pendiente
            resp.send('success'); //Credenciales correctas
        } else {
            resp.send('error'); //Credenciales incorrectas
        }

    });

});

router.post('/logout', (req, resp) => {

    req.session.destroy((error) => {

        if (error) {
            console.error('Error al cerrar sesión:', error);
            return resp.status(500).send('Error en el servidor al cerrar sesión');
        }

        resp.send('logout');
    });

});

router.get('/isAuthenticated', (req, resp) => {
    
    if (req.session && req.session.isAuthenticated) {
        resp.json({ authenticated: true });
    } else {
        resp.json({ authenticated: false });
    }

});

module.exports = router; //Exporta el enrutador