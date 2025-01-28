const express = require('express');
const pool = require('../assets/js/configBdd.js');
const router = express.Router();

router.post('/searchProvider', (req, resp) => {
    const {provider} = req.body;

    const consulta =   `SELECT nombre, telefono
                        FROM proveedores
                        WHERE claveProveedor = ? ;`;

    pool.query(consulta, [provider], (error, result) => {

        if (error) {
            console.error('Error en la consulta:', error);
            console.error('consulta: ', consulta);
            return resp.send('Error en el servidor');
        }

        if(result.length > 0){

            resp.json({ name:        result[0].nombre,
                        phone:       result[0].telefono,
            });

        }else{
            return resp.json(null);
        }

    });

});

router.post('/saveProvider', (req, resp) => {
    const {provider, name, phone, newProvider} = req.body;

    if(newProvider == 'true'){
        const consulta =   `INSERT INTO proveedores (claveProveedor, nombre, telefono)
                            VALUES (?, ?, ?);`;

        pool.query(consulta, [provider, name, phone], (error, result) => {

            if (error) {
                console.error('Error en la consulta:', error);
                console.error('consulta: ', consulta);
                return resp.json({ message: 'Error en el servidor'});
            }

            resp.json({ message: 'success'});
        });

    }else{
        const consulta =   `UPDATE proveedores 
                            SET nombre = ?, telefono = ?
                            WHERE claveProveedor = ?;`;

        pool.query(consulta, [name, phone, provider], (error, result) => {

            if (error) {
                console.error('Error en la consulta:', error);
                console.error('consulta: ', consulta);
                return resp.json({ message: 'Error en el servidor'});
            }

            resp.json({ message: 'success'});
        });

    }

});

module.exports = router;