const jwt = require('jsonwebtoken');



// ===========================
// ===== Verificar token =====
// ===========================

//middleware
let verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        console.log(token);
        console.log(process.env.SEED);

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido',
                }
            });
        }

        req.usuario = decoded.usuario;
        next();

    });

};

// ============================
// ==== Verifica AdminRole ====
// ============================

//middleware
let verificaAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {

        next();

    } else {

        res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            },
        });

    }



};


module.exports = {

    verificaToken,
    verificaAdmin_Role,

}