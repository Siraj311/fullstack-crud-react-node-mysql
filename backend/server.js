const express = require('express');
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json());

app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Siraj1234!',
  database: 'crud'
})

app.get("/", (req, res) => {
  const sql = "SELECT * FROM student";
  db.query(sql, (err, data) => {
    if(err) res.json("error");
    res.json(data);
  })
})

app.get("/:id", (req, res) => {
  const sql = "SELECT * FROM student WHERE id = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, data) => {
    if(err) res.json("error");
    res.json(data);
  })
})

app.post('/create', (req, res) => {
  const sql = "INSERT INTO student (name, email) VALUES (?)";
  if(req.body.name.length === 0 || req.body.email.length === 0) {
    return res.status(400).json("Fields cannot be empty.")
  }

  const values = [
    req.body.name,
    req.body.email
  ]

  db.query(sql, [values], (err, data) => {
    if(err) return res.json("Error")
    return res.json(data)
  })
})

app.put('/update/:id', (req, res) => {
  const sql = "UPDATE student SET name = ? , email = ? WHERE id = ?";
  if(req.body.name.length === 0 || req.body.email.length === 0) {
    return res.status(400).json("Fields cannot be empty.")
  }

  const values = [
    req.body.name,
    req.body.email
  ];

  const id = req.params.id;
  db.query(sql, [...values, id], (err, data) => {
    if(err) return res.json("Error");
    return res.json(data);
  })
})

app.delete('/student/:id', (req, res) => {
  const sql = "DELETE FROM student WHERE id = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, data) => {
    if(err) return res.json("Error");
    return res.json(data);
  })
})

app.listen(4000, () => {
  console.log("Server is listening on port 4000....")
})