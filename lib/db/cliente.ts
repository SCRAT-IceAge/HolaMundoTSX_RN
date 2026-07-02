import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('holamundo.db');

const verTablas = async () => {
  const tablas = await db.getAllAsync(
    "SELECT name FROM sqlite_master WHERE type='table'"
  );
  console.log('Tablas que existen:', tablas);
};


verTablas();





export function inicializarDB() {
  db.execSync(
    'CREATE TABLE IF NOT EXISTS usuario (' +
    'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
    'nombre TEXT NOT NULL,' +
    'email TEXT NOT NULL,' +
    'contrasena TEXT NOT NULL,' +
    'cadenciaEjercicio REAL DEFAULT 0,' +
    'cadenciaPromedio REAL DEFAULT 0);' +

    'CREATE TABLE IF NOT EXISTS ejercicio (' +
    'id TEXT PRIMARY KEY,' +
    'nombre TEXT NOT NULL,' +
    'leccion TEXT NOT NULL);' +

    'CREATE TABLE IF NOT EXISTS intento (' +
    'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
    'id_usuario INTEGER NOT NULL,' +
    'id_ejercicio TEXT NOT NULL,' +
    'tiempo REAL NOT NULL,' +
    'fecha TEXT NOT NULL,' +
    'recordatorio_1 TEXT,' +
    'recordatorio_3 TEXT,' +
    'recordatorio_7 TEXT,' +
    'FOREIGN KEY (id_usuario) REFERENCES usuario(id),' +
    'FOREIGN KEY (id_ejercicio) REFERENCES ejercicio(id));' +

    'CREATE TABLE IF NOT EXISTS recordatorio (' +
    'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
    'id_usuario INTEGER NOT NULL,' +
    'titulo TEXT NOT NULL,' +
    'descripcion TEXT NOT NULL,' +
    'fecha_recordatorio TEXT NOT NULL,' +
    'visto INTEGER DEFAULT 0,' +
    'fecha_creacion TEXT NOT NULL,' +
    'FOREIGN KEY (id_usuario) REFERENCES usuario(id));'
  );
}

export default db;