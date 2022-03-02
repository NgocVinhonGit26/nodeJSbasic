import mysql from 'mysql2/promise';

// create the connection to database
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '26072001',
//     database: 'nodejsbasic'
// });

console.log("Creating connection pool...")
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodejsbasic',
    password: '26072001'
})


export default pool; 