const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

const authenticateJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.sendStatus(403);
            }
            let dbUser;
            if (decoded && decoded.email) {
                // Si el token contiene el correo electrónico, buscar al usuario en la base de datos
                dbUser = await Usuario.findOne({ where: { correo: decoded.email } });
            }
            if (!dbUser) {
                console.log("USUARIO NO ENCONTRADO");
                return res.sendStatus(401);
            }
            console.log("USUARIO ENCONTRADO");
            req.user = dbUser;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = authenticateJWT;
