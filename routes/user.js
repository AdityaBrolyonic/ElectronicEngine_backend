const express = require("express");
const app = express()
const cors = require("cors");
const mysql = require("mysql");

app.use(cors());
app.use(express.json());

// // Check if user with this email already exists
// db.query('SELECT * FROM users WHERE email = ?', [email], (error, results, fields) => {
//     if (error) {
//       console.error('Error querying MySQL: ', error);
//       res.status(500).send('Error querying MySQL');
//       return;
//     }