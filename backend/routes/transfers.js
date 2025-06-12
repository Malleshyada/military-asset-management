const express = require('express');
const db = require('../config/db');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, authorizeRole(['Admin', 'Base Commander', 'Logistics Officer']), (req, res) => {
  const query = req.user.role === 'Base Commander' || req.user.role === 'Logistics Officer'
    ? 'SELECT * FROM transfers WHERE fromBase = ? OR toBase = ?'
    : 'SELECT * FROM transfers';
  db.query(query, [req.user.base, req.user.base], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.post('/', authenticateToken, authorizeRole(['Admin', 'Logistics Officer']), (req, res) => {
  const { fromBase, toBase, equipmentType, quantity, date, type } = req.body;
  db.query(
    'INSERT INTO transfers (fromBase, toBase, equipmentType, quantity, date, type) VALUES (?, ?, ?, ?, ?, ?)',
    [fromBase, toBase, equipmentType, quantity, date, type],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Transfer recorded' });
    }
  );
});

module.exports = router;