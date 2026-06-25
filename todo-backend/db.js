const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Rishi@061207",
    database: "todo"
});

db.connect((err) => {
    if (err) {
        console.log("Connection Failed");
        console.log(err);
        return;
    }

    console.log("MySQL Connected");
});

module.exports = db;