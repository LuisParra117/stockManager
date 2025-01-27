const express = require('express');
const pool = require('../assets/js/configBdd.js');
const router = express.Router();

router.post('/searchClient', (req, resp) => {
    const {client} = req.body;

    const consulta =   `SELECT nombre, apellidoPaterno, apellidoMaterno, rfc, telefono
                        FROM clientes
                        WHERE claveCliente = ? ;`;

    pool.query(consulta, [client], (error, result) => {

        if (error) {
            console.error('Error en la consulta:', error);
            console.error('consulta: ', consulta);
            return resp.send('Error en el servidor');
        }

        if(result.length > 0){

            resp.json({ name:        result[0].nombre,
                        ap:          result[0].apellidoPaterno,
                        am:          result[0].apellidoMaterno,
                        rfc:         result[0].rfc,
                        phone:       result[0].telefono,
            });

        }else{
            return resp.json(null);
        }

    });

});

router.post('/saveClient', (req, resp) => {
    const {client, name, ap, am, rfc, phone, newClient} = req.body;

    if(newClient == 'true'){
        const consulta =   `INSERT INTO clientes (claveCliente, nombre, apellidoPaterno, apellidoMaterno, rfc, telefono)
                            VALUES (?, ?, ?, ?, ?, ?);`;

        pool.query(consulta, [client, name, ap, am, rfc, phone], (error, result) => {

            if (error) {
                console.error('Error en la consulta:', error);
                console.error('consulta: ', consulta);
                return resp.json({ message: 'Error en el servidor'});
            }

            resp.json({ message: 'success'});
        });

    }else{
        const consulta =   `UPDATE clientes 
                            SET nombre = ?, apellidoPaterno = ?, apellidoMaterno = ?, rfc = ?, telefono = ?
                            WHERE claveCliente = ?;`;

        pool.query(consulta, [name, ap, am, rfc, phone, client], (error, result) => {

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