const express = require('express');
const pool = require('../assets/js/configBdd.js');
const router = express.Router();

router.post('/searchProduct', (req, resp) => {
    const {product} = req.body;

    const consulta =   `SELECT sku, descripcion, precio, costo, existencia
                        FROM productos
                        WHERE sku = ? ;`;

    pool.query(consulta, [product], (error, result) => {

        if (error) {
            console.error('Error en la consulta:', error);
            console.error('consulta: ', consulta);
            return resp.send('Error en el servidor');
        }

        if(result.length > 0){

            resp.json({ descript:        result[0].descripcion,
                        price:           result[0].precio,
                        cost:            result[0].costo,
                        stock:           result[0].existencia,
            });

        }else{
            return resp.json(null);
        }

    });

});

router.post('/saveProduct', (req, resp) => {
    const {product, descript, price, cost, stock, newProduct} = req.body;

    if(newProduct == 'true'){
        const consulta =   `INSERT INTO productos (sku, descripcion, precio, costo, existencia)
                            VALUES (?, ?, ?, ?, ?);`;

        pool.query(consulta, [product, descript, price, cost, stock], (error, result) => {

            if (error) {
                console.error('Error en la consulta:', error);
                console.error('consulta: ', consulta);
                return resp.json({ message: 'Error en el servidor'});
            }

            resp.json({ message: 'success'});
        });

    }else{
        const consulta =   `UPDATE productos 
                            SET descripcion = ?, precio = ?, costo = ?, existencia = ?
                            WHERE sku = ?;`;

        pool.query(consulta, [descript, price, cost, stock, product], (error, result) => {

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