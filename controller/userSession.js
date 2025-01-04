const express = require('express');
const session = require('express-session');
const pool = require('../assets/js/configBdd.js');
const router = express.Router();

router.post('/login', (req, resp) => {
    const {username, password} = req.body;
    
    const consulta =   `SELECT idUsuario, usuario, contrasena, nombre, apellidoPaterno, apellidoMaterno 
                        FROM usuarios 
                        WHERE usuario = sha1(?) AND contrasena = sha1(?);`;

    pool.query(consulta, [username, password], (error, resultados) => {
        
        if (error) {
            console.error('Error en la consulta:', error);
            console.error('consulta: ', consulta);
            return resp.send('Error en el servidor');
        }
    
        

        if (resultados.length > 0) {
            req.session.isAuthenticated = true;
            const usuario = resultados[0];
            
            req.session.user = {
                id: usuario.idUsuario,
                username: usuario.usuario,
                nombre: usuario.nombre,
                apellidoPaterno: usuario.apellidoPaterno,
                apellidoMaterno: usuario.apellidoMaterno,
            };

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

router.get('/getUserData', (req, resp) => {

    if (req.session.isAuthenticated) {
        resp.json(req.session.user);
    } else {
        resp.status(401).json({ error: 'Usuario no autenticado' });
    }

});


module.exports = router; //Exporta el enrutador