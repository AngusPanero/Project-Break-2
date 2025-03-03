const admin = require("firebase-admin");
const auth = admin.auth();

const checkAuth = async (req, res, next) => {
    try {
        const idTokenCookie = req.cookies.token;
        
        if (!idTokenCookie) {
            return res.redirect("/login"); 
        }

        const decodedToken = await auth.verifyIdToken(idTokenCookie);
        req.user = decodedToken;
        next();
        
    } catch (error) {
        console.log("498 - No es Posible Iniciar Sesión", error);
        return res.redirect("/login"); 
    }
};

module.exports = checkAuth;