// server/routes/menu.js
const express = require("express");
const db = require("../db"); // MySQL connection
const router = express.Router();

// GET all foods with category names
router.get("/", (req, res) => {
  const sql = `
    SELECT f.id, f.name, f.type, f.price, f.description, f.image, f.available,
           f.category_id, c.name AS categoryName
    FROM foods f
    JOIN categories c ON f.category_id = c.id
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Error fetching menu:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

module.exports = router;
