const express = require('express');
const db = require('../config/db');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, authorizeRole(['Admin', 'Base Commander']), (req, res) => {
  const query = req.user.role === 'Base Commander'
    ? 'SELECT * FROM assets WHERE base = ?'
    : 'SELECT * FROM assets';
  db.query(query, [req.user.base], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

module.exports = router;