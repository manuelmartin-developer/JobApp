const passport = require('passport')
require('dotenv').config()
const fetch = (...args) => import('node-fetch').then(({
    default: fetch
}) => fetch(...args));
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {
    createUser,
    getUser,
    updateAnUser,
    deleteOneUser,
    createFavorite,
    deleteOneFavorite,
    getAllUserFavorites
} = require('../models/users')

// Crear una contraseña random para el usuario registrado con Google
function randomPass() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 9; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/api/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
        const user_id = profile.id
        const user_email = profile._json.email
        const user_surname = profile._json.family_name
        const user_name = profile._json.given_name
        const user_password = randomPass()
        const googleUserCheck = await getUser(user_email)
        if (googleUserCheck.length !== 0) {
            const userToLogin = await getUser(user_email)
            done(null, userToLogin[0])
        } else {
            const newUser = await createUser(user_name, user_surname, user_email, user_password)
            if (newUser) {
                const userToLogin = await getUser(user_email)
                done(null, userToLogin[0])
            }
        }
    }
));

passport.serializeUser(function (user, done) { // Used to stuff a piece of information into a cookie
    done(null, user);
});

passport.deserializeUser(function (user, done) { // Used to decode the received cookie and persist session
    done(null, user);
});