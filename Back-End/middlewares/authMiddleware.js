const admin = require("firebase-admin");
const auth = admin.auth();

const checkAuth = (req, res, next) => {
    const idTokenCookie = req.cookies.token
    if(!idTokenCookie){
        res.redirect("/login")
    }
    auth.verifyIdToken(idTokenCookie)
    .then((decodedToken) => {
        req.user = decodedToken
        next()
    })
    .catch((error) => {
        console.log("498 - No es Posible Iniciar Sesión", error);
        ;
    })
}

module.exports = checkAuth;