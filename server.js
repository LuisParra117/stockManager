require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(session({
  secret: process.env.secret, 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Usa `true` en producción si tienes HTTPS
}));

app.use(express.json()); // Esto es necesario para poder leer req.body
app.use(express.urlencoded({ extended: true })); // Esto es necesario para formularios HTML

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname))); // Sirve archivos de la carpeta 'public'
app.use('/controller', express.static(path.join(__dirname, 'controller')));

// Ruta para servir el archivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const userRoutes = require('./controller/userSession.js'); 
app.use('/', userRoutes);

const HOST = '0.0.0.0';

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
});