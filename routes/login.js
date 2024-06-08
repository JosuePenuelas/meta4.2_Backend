const express = require('express');
const router = express.Router();
const passport = require('passport');

// Ruta para autenticarse con Google
router.get('/google', passport.authenticate('auth-google', {
  scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
  session: false
}));

// Ruta de callback después de la autenticación
router.get('/google/callback', passport.authenticate('auth-google', { session: false }), (req, res) => {
  if (!req.user) {
    console.error('No se encontró el usuario después de la autenticación');
    return res.redirect('/auth/google'); // Redirigir a Google Auth si no hay usuario
  }
  const token = req.user.token;
  const nombreUsuario = req.user.nombreUsuario;
  const correo = req.user.correo;

  console.log('Usuario autenticado:', { token, nombreUsuario, correo }); // Log del usuario autenticado

  // Redirigir al frontend con el token y el nombre de usuario
  res.redirect(`http://localhost:3000/activos?token=${token}&name=${encodeURIComponent(nombreUsuario)}&correo=${encodeURIComponent(correo)}`);
});

module.exports = router;
