const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// DB Connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: 'pantry_app',
  password: process.env.DB_PASSWORD,
  port: 5432,
});

// Middleware to verify JWT
const authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send('Access denied');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [decoded.userId]);
    if (!user.rows.length) throw new Error('User not found');
    
    req.user = user.rows[0];
    next();
  } catch (err) {
    res.status(401).send('Invalid token');
  }
};

// Register
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id',
      [username, email, hashedPassword]
    );
    const token = jwt.sign({ userId: result.rows[0].id }, process.env.JWT_SECRET);
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ error: 'Email/username already exists' });
  }
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

  if (!user.rows.length || !(await bcrypt.compare(password, user.rows[0].password_hash))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user.rows[0].id }, process.env.JWT_SECRET);
  res.json({ token });
});

// Protected route example
app.get('/profile', authenticate, (req, res) => {
  res.json(req.user);
});

// Logout (optional - adds token to blacklist)
app.post('/logout', authenticate, async (req, res) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  await pool.query('INSERT INTO revoked_tokens (token) VALUES ($1)', [token]);
  res.send('Logged out');
});

app.listen(3000, () => console.log('Auth server running on port 3000'));
