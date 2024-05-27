const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { Usuario } = require('../models');
const jwt = require('jsonwebtoken');

passport.use('auth-google', new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_REDIRECT_URL,
    prompt: 'select_account',
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await Usuario.findOne({ where: { correo: profile.emails[0].value } });
      const payload = {
        userId: user ? user.id : null,
        email: profile.emails[0].value,
        name: profile.displayName,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

      if (user) {
        user.token = token;
        await user.save();
        return done(null, user);
      } else {
        user = await Usuario.create({
          nombreUsuario: profile.displayName,
          correo: profile.emails[0].value,
          token: token,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        user.token = token;
        await user.save();
        return done(null, user);
      }
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Usuario.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
