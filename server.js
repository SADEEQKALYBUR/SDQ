const express = require("express");
const session = require("express-session");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const path = require("path");

const app = express();

// ===== DATABASE =====
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "sadeeqkalybur",
    database: "shago_na"
});

db.connect(err => {
    if (err) {
        console.log("❌ Database connection failed:", err.message);
    } else {
        console.log("✅ Database connected successfully!");
    }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

app.use(session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false
}));


// ===== LOGIN =====
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    db.query(
        "SELECT * FROM admins WHERE username = ?",
        [username],
        async (err, results) => {

            if (err) return res.send("Database error");
            if (results.length === 0) return res.send("User not found");

            const user = results[0];
            const match = await bcrypt.compare(password, user.password);

            if (!match) return res.send("Wrong password");

            req.session.user = user;
            res.redirect("/admin.html");
        }
    );
});


// ===== PROTECT ADMIN =====
app.get("/admin.html", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login.html");
    }
    res.sendFile(path.join(__dirname, "admin.html"));
});


// ===== LOGOUT =====
app.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login.html");
    });
});


// ===== BOOKING ROUTE (DAI-DAI DA HTML) =====
app.post("/book", (req, res) => {

    const { service, date, time, name, phone, note } = req.body;

    const sql = `
        INSERT INTO bookings
        (service, booking_date, booking_time, full_name, phone, note)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [service, date, time, name, phone, note],
        (err) => {
            if (err) {
                console.log("❌ MySQL Error:", err);
                return res.status(500).send("Server bai amsa ba ❌");
            }

            res.send("Booking ya tafi successfully ✅");
        }
    );
});


// ===== SERVER =====
app.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
});

app.get("/bookings", (req, res) => {
  db.query(
    "SELECT * FROM bookings ORDER BY created_at DESC",
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json([]);
      }
      res.json(results);
    }
  );
});

// ===== GET ALL BOOKINGS =====
app.get("/api/bookings", (req, res) => {
  db.query(
    "SELECT * FROM bookings ORDER BY booking_date DESC, booking_time DESC",
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json([]);
      }
      res.json(results);
    }
  );
});


// ===== TODAY TOTAL =====
app.get("/api/today-total", (req, res) => {
  const sql = `
    SELECT COUNT(*) AS total
    FROM bookings
    WHERE booking_date = CURDATE()
  `;

  db.query(sql, (err, result) => {
    if (err) return res.json({ total: 0 });
    res.json(result[0]);
  });
});


// ===== MONTH TOTAL =====
app.get("/api/month-total", (req, res) => {
  const sql = `
    SELECT COUNT(*) AS total
    FROM bookings
    WHERE MONTH(booking_date) = MONTH(CURDATE())
      AND YEAR(booking_date) = YEAR(CURDATE())
  `;

  db.query(sql, (err, result) => {
    if (err) return res.json({ total: 0 });
    res.json(result[0]);
  });
});

app.get("/orders", (req, res) => {
    db.query("SELECT * FROM orders", (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

const axios = require("axios");

app.post("/api/verify-payment", async (req, res) => {

  const { reference, product_name, price, qty, total } = req.body;

  try {

    const verify = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer YOUR_SECRET_KEY`
        }
      }
    );

    if (verify.data.data.status === "success") {

      const receiptNo = "RCPT-" + Date.now();

      db.query(
        `INSERT INTO payments 
        (receipt_no, product_name, price, qty, total, paystack_ref, payment_status)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [receiptNo, product_name, price, qty, total, reference, "success"],
        (err) => {
          if (err) return res.status(500).json({ message: "DB error" });

          res.json({ receiptNo });
        }
      );

    } else {
      res.status(400).json({ message: "Payment not verified" });
    }

  } catch (error) {
    res.status(500).json({ message: "Verification failed" });
  }
});

const PDFDocument = require("pdfkit");
const fs = require("fs");

app.get("/api/receipt/:receiptNo", (req, res) => {

  const receiptNo = req.params.receiptNo;

  db.query("SELECT * FROM payments WHERE receipt_no = ?", [receiptNo], (err, result) => {

    if (result.length === 0) return res.send("Not found");

    const payment = result[0];

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    doc.pipe(res);

    doc.fontSize(20).text("Payment Receipt", { align: "center" });
    doc.moveDown();

    doc.text("Receipt No: " + payment.receipt_no);
    doc.text("Product: " + payment.product_name);
    doc.text("Quantity: " + payment.qty);
    doc.text("Total: ₦" + payment.total);
    doc.text("Date: " + payment.created_at);

    doc.end();
  });
});