const express = require('express');
const session = require('express-session');
const pool = require('./configBdd.js');
const router = express.Router();

router.get('/getOptions', (req, resp) => {
    const {table, value} = req.query;
    const sql = 'SELECT ?? AS value FROM ??' ;

    pool.query(sql, [value, table], (err, results) => {
      if (err) throw err;
      resp.json(results);
    });

});

module.exports = router;