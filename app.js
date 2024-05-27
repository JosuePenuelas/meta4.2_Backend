const dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const app = express();
const fs = require('fs');
const https = require('https');
const cors = require("cors");

const session = require('express-session');
const passport = require("./middlewares/google.js"); // cargar después de dotenv

app.use(session({
  secret: process.env.SESSION_SECRET, // usa SESSION_SECRET del .env
  resave: false,
  saveUninitialized: true,
}));

app.use(cors());
app.use(express.json());

// Configuración de Passport
app.use(passport.initialize());
app.use(passport.session());

const activoRoute = require('./routes/activoRoute');
const responsableRoute = require('./routes/responsableRoute');
const ubicacionRoute = require('./routes/ubicacionRoute');
const tagRoute = require('./routes/tagRoute');
const activoTagRoute = require('./routes/activoTagRoute');

// Google Authentication Route
const loginRoute = require('./routes/login');
app.use('/auth', loginRoute);

app.get("/", (req, res) => {
  res.send("Backend meta 3.3.1");
});

app.use("/activos", activoRoute);
app.use("/responsables", responsableRoute);
app.use("/ubicaciones", ubicacionRoute);
app.use("/tags", tagRoute);
app.use("/activoTags", activoTagRoute);
app.use('/uploads', express.static('uploads'));

const llavePrivada = fs.readFileSync("server.key");
const certificado = fs.readFileSync("server.crt");
const credenciales = {
  key: llavePrivada,
  cert: certificado,
  passphrase: "password"
};

const httpsServer = https.createServer(credenciales, app);

httpsServer.listen(process.env.PORT, () => {
  console.log('Servidor escuchando el puerto:', process.env.PORT);
}).on('error', err => {
  console.log('Error al iniciar el servidor:', err);
});
