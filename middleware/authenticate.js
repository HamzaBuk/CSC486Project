const jwt = require('jsonwebtoken');
const pool = require('../db');

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

module.exports = authenticate;
