const express = require('express');
const pool = require('../config/db');
const authenticateRole = require('../middleware/auth');
const router = express.Router();

router.get('/metrics', authenticateRole(['Admin', 'Base Commander', 'Logistics Officer']), async (req, res) => {
  const { date, base, equipmentType } = req.query;
  try {
    const query = `
      SELECT 
        SUM(CASE WHEN type = 'opening' THEN quantity ELSE 0 END) as opening_balance,
        SUM(CASE WHEN type = 'closing' THEN quantity ELSE 0 END) as closing_balance,
        SUM(CASE WHEN type IN ('purchase', 'transfer_in') THEN quantity ELSE -quantity END) as net_movement,
        SUM(CASE WHEN type = 'assigned' THEN quantity ELSE 0 END) as assigned,
        SUM(CASE WHEN type = 'expended' THEN quantity ELSE 0 END) as expended
      FROM asset_movements
      WHERE ($1::date IS NULL OR created_at >= $1)
        AND ($2::text IS NULL OR base_id = $2)
        AND ($3::text IS NULL OR equipment_type = $3)
    `;
    const params = [date || null, req.user.role === 'Base Commander' ? req.user.base_id : base || null, equipmentType || null];
    const result = await pool.query(query, params);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/net-movement-details', authenticateRole(['Admin', 'Base Commander', 'Logistics Officer']), async (req, res) => {
  const { date, base, equipmentType } = req.query;
  try {
    const query = `
      SELECT id, base_id, equipment_type, quantity, type, created_at
      FROM asset_movements
      WHERE type IN ('purchase', 'transfer_in', 'transfer_out')
        AND ($1::date IS NULL OR created_at >= $1)
        AND ($2::text IS NULL OR base_id = $2)
        AND ($3::text IS NULL OR equipment_type = $3)
    `;
    const params = [date || null, req.user.role === 'Base Commander' ? req.user.base_id : base || null, equipmentType || null];
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;