const passport = require('passport')
require('dotenv').config()
const GitHubStrategy = require('passport-github2').Strategy;
const {
    createUser,
    getUser
} = require('../models/users')

// Crear una contraseña random para el usuario registrado con github
function randomPass() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 9; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        scope: ['user:email'],
        callbackURL: "http://localhost:3000/api/github/callback"
    },
    async (accessToken, refreshToken, profile, cb) => {

        const user_email = profile.emails[0].value
        const user_surname = profile.displayName
        const user_name = profile.displayName
        const user_password = randomPass()
        const githubUserCheck = await getUser(user_email)
        if (githubUserCheck.length !== 0) {
            const userToLogin = await getUser(user_email)
            cb(null, userToLogin[0])
        } else {
            const newUser = await createUser(user_name, user_surname, user_email, user_password)
            if (newUser) {
                const userToLogin = await getUser(user_email)
                cb(null, userToLogin[0])
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