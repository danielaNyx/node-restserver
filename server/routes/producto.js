const express = require('express');

const { verificaToken } = require('../middlewares/autenticacion');

let app = express();

let Producto = require('../models/producto');

//============================
//Obtener todos los productos
//============================
app.get('/producto/', verificaToken, (req, res) => {

    //trae todos los productos
    //populate: usuario y categoria
    //paginado

    let desde = req.query.desde || 0;
    desde = Number(desde);

    Producto.find({ disponible: true })
        //Procedimiento populate revisa que objects id existen en la categoria 
        //y nos permite cargar información de estos objetos
        .skip(desde)
        .limit(10)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productosDB) => {

            if (err) {
                return res.status(00).json({
                    ok: false,
                    err,
                });
            };

            res.json({
                ok: true,
                productos: productosDB,
            });

        });


});

//============================
//Mostrar un producto por ID
//============================
app.get('/producto/:id', verificaToken, (req, res) => {
    //populate: usuario y categoria
    let id = req.params.id; +
    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productoDB) => {

            if (err) {

                return res.status(500).json({
                    ok: false,
                    err,
                });

            };
            if (!productoDB) {

                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'ID incorrecto! Producto no encontrado'
                    },
                });

            }

            res.json({
                ok: true,
                producto: productoDB,
            });

        })

});

//============================
//Buscar productos
//============================
app.get('/producto/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex })
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {

            if (err) {

                return res.status(500).json({
                    ok: false,
                    err,
                });

            };
            res.json({
                ok: true,
                productos,
            })
        })
});



//============================
//Crear nuevo producto
//============================
app.post('/producto', verificaToken, (req, res) => {
    //Grabar el usuario
    //Grabar una categoria del listado
    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: req.usuario._id,
    });

    producto.save((err, productoDB) => {

        if (err) {

            return res.status(500).json({
                ok: false,
                err,
            });

        };
        if (!productoDB) {

            return res.status(400).json({
                ok: false,
                err,
            });

        }
        res.status(201).json({
            ok: true,
            producto: productoDB,
        });

    });


});

//============================
//Actualizar un producto
//============================
app.put('/producto/:id', verificaToken, (req, res) => {
    //Grabar el usuario
    //Grabar una categoria del listado

    let id = req.params.id;
    let body = req.body;

    Producto.findById(id, (err, productoDB) => {

        if (err) {

            return res.status(500).json({
                ok: false,
                err,
            });

        };
        if (!productoDB) {

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'ID incorrecto! Producto no encontrado'
                },
            });

        }

        productoDB.nombre = body.nombre;
        productoDB.precioUni = body.precioUni;
        productoDB.categoria = body.categoria;
        productoDB.disponible = body.disponible;
        productoDB.descripcion = body.descripcion;

        productoDB.save((err, productoActualizado) => {

            if (err) {

                return res.status(500).json({
                    ok: false,
                    err,
                });

            };
            res.json({
                ok: true,
                producto: productoActualizado,
            });
        })

    })

});



//============================
//Borrar un producto
//============================
app.delete('/producto/:id', verificaToken, (req, res) => {
    //disponible = false
    //Grabar el usuario
    //Grabar una categoria del listado

    let id = req.params.id;

    Producto.findById(id, (err, productoDB) => {

        if (err) {

            return res.status(500).json({
                ok: false,
                err,
            });

        };
        if (!productoDB) {

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'ID incorrecto! Producto no encontrado'
                },
            });

        }

        productoDB.disponible = false;

        productoDB.save((err, productoEliminado) => {

            if (err) {

                return res.status(500).json({
                    ok: false,
                    err,
                });

            };
            res.json({
                ok: true,
                producto: productoEliminado,
            });
        })

    })

});

module.exports = app;