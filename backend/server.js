const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const assetsRoutes = require('./routes/assets');
const purchasesRoutes = require('./routes/purchases');
const transfersRoutes = require('./routes/transfers');
const assignmentsRoutes = require('./routes/assignments');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Military Asset Management API' });
});

// Login route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = { id: 1, username, role: 'Admin', base: 'Base1' };
  const token = jwt.sign(user, 'secret_key', { expiresIn: '1h' });
  res.json({ token });
});

// API routes
app.use('/api/assets', assetsRoutes);
app.use('/api/purchases', purchasesRoutes);
app.use('/api/transfers', transfersRoutes);
app.use('/api/assignments', assignmentsRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));