const express = require('express');
const db = require('../config/db');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, authorizeRole(['Admin', 'Base Commander']), (req, res) => {
  const query = req.user.role === 'Base Commander'
    ? 'SELECT * FROM assignments WHERE base = ?'
    : 'SELECT * FROM assignments';
  db.query(query, [req.user.base], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.post('/', authenticateToken, authorizeRole(['Admin', 'Base Commander']), (req, res) => {
  const { base, personnel, equipmentType, quantity, date, status } = req.body;
  db.query(
    'INSERT INTO assignments (base, personnel, equipmentType, quantity, date, status) VALUES (?, ?, ?, ?, ?, ?)',
    [base, personnel, equipmentType, quantity, date, status],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Assignment recorded' });
    }
  );
});

module.exports = router;