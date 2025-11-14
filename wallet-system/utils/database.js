const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',  
    user: 'root',
    password: 'Blackmagic10',
    database: 'wallet_db'
});
db.connect((err) => {
    if (err) {
        console.log('Database connection failed:', err.stack);
    } else {
        console.log('Database connected successfully');
    } 
});
module.exports = db;
