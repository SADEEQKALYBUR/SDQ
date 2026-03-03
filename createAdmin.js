const mysql = require('mysql2');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sadeeqkalybur',
    database: 'shago_na'
});

const sunanAdmin = 'sadeeq_admin';
const passwordAdmin = 'admin12345';

console.log("Ana kokarin hadawa da Database...");

db.connect((err) => {
    if (err) {
        console.error("Haba! An samu matsala wajen shiga MySQL:", err.message);
        return;
    }

    console.log("✅ Database ya bude cikin nasara!");

    bcrypt.hash(passwordAdmin, 10, (err, hash) => {

        const sql = "INSERT INTO admins (username, password) VALUES (?, ?)";

        db.query(sql, [sunanAdmin, hash], (err, result) => {

            if (err) {
                if (err.errno === 1062) {
                    console.log("⚠️ Admin din ya riga ya wanzu.");
                } else {
                    console.error("Kuskure:", err.message);
                }
            } else {
                console.log("🚀 An samar da Admin cikin nasara!");
            }

            db.end();
        });
    });
});