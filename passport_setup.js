const passport = require('passport')
require('dotenv').config()
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {
    createUser,
    getUser,
    updateAnUser,
    deleteOneUser,
    createFavorite,
    deleteOneFavorite,
    getAllUserFavorites
} = require('./models/users')

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    //User.findById(id, function (err, user) {
    done(null, user);
    //  });
});
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
    function (accessToken, refreshToken, profile, done) {
        const user_id = profile.id
        const user_email = profile._json.email
        const user_surname = profile._json.family_name
        const user_name = profile._json.given_name
        const user_password = randomPass()
        const googleUserCheck = async () => {
            const checkUser = await getUser(user_email)
            if (checkUser.length !== 0) {
                // add token
                console.log(`Usuario encontrado`);
            } else {
                const newUser = createUser(user_name, user_surname, user_email, user_password)
                if (newUser) {
                    await fetch('/api/login', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: user_email,
                            password: user_password,
                        })
                    })
                }
                console.log(`Debemos crear un usuario`);
            }
        }
        googleUserCheck()
        return done(null, profile);
    }
));
