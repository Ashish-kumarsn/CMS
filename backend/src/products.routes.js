
import express from 'express';
import { pool } from './db.js';

export const router = express.Router();

// Helper: map DB rows to API objects (optional, here it's 1:1)
const mapRow = (r) => ({
  product_id: r.product_id,
  product_name: r.product_name,
  product_desc: r.product_desc,
  status: r.status,
  created_by: r.created_by,
  created_at: r.created_at,
  updated_by: r.updated_by,
  updated_at: r.updated_at,
  is_deleted: !!r.is_deleted
});

// List products (with filters):
//   GET /api/products?status=Published&includeDeleted=false
router.get('/products', async (req, res) => {
  try {
    const { status, includeDeleted } = req.query;
    const includeDeletedBool = String(includeDeleted || 'false').toLowerCase() === 'true';

    let sql = 'SELECT * FROM Products WHERE 1=1';
    const params = [];

    if (status) {
      sql += ' AND status = ?';
      params.push(status);
    }
    if (!includeDeletedBool) {
      sql += ' AND is_deleted = FALSE';
    }

    sql += ' ORDER BY product_id DESC';

    const [rows] = await pool.execute(sql, params);
    res.json(rows.map(mapRow));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get single product
router.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute('SELECT * FROM Products WHERE product_id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(mapRow(rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Create product (expects: product_name, product_desc, status, created_by)
router.post('/products', async (req, res) => {
  try {
    const { product_name, product_desc, status = 'Draft', created_by } = req.body;
    if (!product_name || !created_by) {
      return res.status(400).json({ error: 'product_name and created_by are required' });
    }
    const [result] = await pool.execute(
      'INSERT INTO Products (product_name, product_desc, status, created_by) VALUES (?, ?, ?, ?)',
      [product_name, product_desc || null, status, created_by]
    );
    const [rows] = await pool.execute('SELECT * FROM Products WHERE product_id = ?', [result.insertId]);
    res.status(201).json(mapRow(rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Update product (full update). Expects: product_name?, product_desc?, status?, updated_by
router.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { product_name, product_desc, status, updated_by } = req.body;
    if (!updated_by) return res.status(400).json({ error: 'updated_by is required' });

    // Build dynamic SQL safely
    const fields = [];
    const params = [];

    if (typeof product_name !== 'undefined') { fields.push('product_name = ?'); params.push(product_name); }
    if (typeof product_desc !== 'undefined') { fields.push('product_desc = ?'); params.push(product_desc); }
    if (typeof status !== 'undefined')       { fields.push('status = ?');       params.push(status); }
    fields.push('updated_by = ?'); params.push(updated_by);

    if (fields.length === 1) { // only updated_by added
      return res.status(400).json({ error: 'No updatable fields provided' });
    }

    const sql = `UPDATE Products SET ${fields.join(', ')} WHERE product_id = ?`;
    params.push(id);

    const [result] = await pool.execute(sql, params);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });

    const [rows] = await pool.execute('SELECT * FROM Products WHERE product_id = ?', [id]);
    res.json(mapRow(rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Update status (PATCH)
router.patch('/products/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, updated_by } = req.body;
    if (!updated_by || !status) return res.status(400).json({ error: 'status and updated_by are required' });

    const [result] = await pool.execute(
      'UPDATE Products SET status = ?, updated_by = ? WHERE product_id = ?',
      [status, updated_by, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });

    const [rows] = await pool.execute('SELECT * FROM Products WHERE product_id = ?', [id]);
    res.json(mapRow(rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update status' });
  }
});

// Soft delete
router.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { updated_by } = req.body;
    if (!updated_by) return res.status(400).json({ error: 'updated_by is required' });

    const [result] = await pool.execute(
      'UPDATE Products SET is_deleted = TRUE, updated_by = ? WHERE product_id = ?',
      [updated_by, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });

    const [rows] = await pool.execute('SELECT * FROM Products WHERE product_id = ?', [id]);
    res.json(mapRow(rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to soft delete' });
  }
});

// Live products endpoint (convenience)
router.get('/live/products', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      "SELECT product_id, product_name, product_desc FROM Products WHERE status = 'Published' AND is_deleted = FALSE ORDER BY product_id DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch live products' });
  }
});
