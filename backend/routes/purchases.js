const express = require('express');
const db = require('../config/db');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, authorizeRole(['Admin', 'Base Commander', 'Logistics Officer']), (req, res) => {
  const query = req.user.role === 'Base Commander' || req.user.role === 'Logistics Officer'
    ? 'SELECT * FROM purchases WHERE base = ?'
    : 'SELECT * FROM purchases';
  db.query(query, [req.user.base], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.post('/', authenticateToken, authorizeRole(['Admin', 'Logistics Officer']), (req, res) => {
  const { base, equipmentType, quantity, date } = req.body;
  db.query(
    'INSERT INTO purchases (base, equipmentType, quantity, date) VALUES (?, ?, ?, ?)',
    [base, equipmentType, quantity, date],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Purchase recorded' });
    }
  );
});

module.exports = router;