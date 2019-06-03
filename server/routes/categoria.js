const express = require('express');

let { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

let app = express();

let Categoria = require('../models/categoria');

//============================
//Mostrar todas las categorias
//============================
app.get('/categoria', verificaToken, (req, res) => {

    Categoria.find({})
        //Procedimiento populate revisa que objects id existen en la categoria 
        //y nos permite cargar información de estos objetos
        .populate('usuario', 'nombre email')
        .sort('descripcion')
        .exec((err, categoriasDB) => {

            if (err) {
                return res.status(00).json({
                    ok: false,
                    err,
                });
            };

            res.json({
                ok: true,
                categorias: categoriasDB,
            });

        });
});

//============================
//Mostrar una categoria por ID
//============================
app.get('/categoria/:id', verificaToken, (req, res) => {

    let id = req.params.id; +
    Categoria.findById(id, (err, categoriaDB) => {

        if (err) {

            return res.status(500).json({
                ok: false,
                err,
            });

        };
        if (!categoriaDB) {

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'ID incorrecto! Categoria no encontrada'
                },
            });

        }

        res.json({
            ok: true,
            categoria: categoriaDB,
        });

    })
});

//============================
//   Crear nueva categoria
//============================

app.post('/categoria', verificaToken, (req, res) => {

    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id,
    });

    categoria.save((err, categoriaDB) => {

        if (err) {

            return res.status(500).json({
                ok: false,
                err,
            });

        };
        if (!categoriaDB) {

            return res.status(400).json({
                ok: false,
                err,
            });

        }
        res.json({
            ok: true,
            categoria: categoriaDB,
        });

    });

});

//============================
//  Modificar una categoria
//============================
app.put('/categoria/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let descCategoria = {
        descripcion: body.descripcion
    }

    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {

        if (err) {

            return res.status(500).json({
                ok: false,
                err,
            });

        };
        if (!categoriaDB) {

            return res.status(400).json({
                ok: false,
                err,
            });

        }
        res.json({
            ok: true,
            categoria: categoriaDB,
        })
    })

});

//============================
//   Eliminar una categoria
//============================
app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;
    Categoria.findByIdAndRemove(id, (err, categoriaEliminada) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        };

        if (!categoriaEliminada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'ID incorrecto! Categoria no encontrada'
                }
            });
        };

        res.json({
            ok: true,
            message: 'Categoria borrada',
            categoriaEliminada,
        })
    });

});

module.exports = app;