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
// == Vencimiento del token ==
// ===========================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// ===========================
// == SEED de autenticación ==
// ===========================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// ===========================
// ===== Base de Datos =======
// ===========================

let urlDB;

if (process.env.NODE_ENV === 'dev') {

    urlDB = 'mongodb://localhost:27017/cafe';

} else {

    urlDB = process.env.MONGO_URL;
}

process.env.URLDB = urlDB