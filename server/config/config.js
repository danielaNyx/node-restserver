// Declarar variables, constantes de forma global

//Objeto global que está corriendo a lo largo de toda la aplicación de node
//Es actualizado dependiendo del environment donde está corriendo
// ===========================
// ========= Puerto ========== 
// ===========================

process.env.PORT = process.env.PORT || 3000;

// ===========================
// ========= Entonrno ========
// ===========================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ===========================
// ===== Base de Datos =======
// ===========================

let urlDB;

if (process.env.NODE_ENV === 'dev') {

    urlDB = 'mongodb://localhost:27017/cafe';

} else {

    urlDB = 'mongodb+srv://danielaNyx:DNceSiY9DpXcBDc@cluster0-ydioj.mongodb.net/cafe';
}

process.env.URLDB = urlDB