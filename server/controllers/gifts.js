import { pool } from "../config/database.js";

const getGifts = async (req, res) => {
  try {
    const results = await pool.query(
      `SELECT id, name, pricePoint, audience, image, description, submittedby, submittedon FROM gifts ORDER BY id ASC`
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const getGiftsbyId = async (req, res) => {
  try {
    const selectQuery = `SELECT id, name, pricepoint, audience, image, description, submittedby, submittedon FROM gifts WHERE id = $1`;
    const giftId = req.params.giftId;
    const results = await pool.query(selectQuery, [giftId]);
    if (results.rows.length === 0) {
      return res
        .status(404)
        .json({ error: `Gift with id ${giftId} not found` });
    }
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const createGift = async (req, res) => {
  try {
    const {
      name,
      pricepoint,
      audience,
      image,
      description,
      submittedby,
      submittedon,
    } = req.body;
    // Note: Postgres folds unquoted identifiers to lowercase. "pricePoint" here is equivalent to "pricepoint" in the created table.
    const insertQuery = `INSERT INTO gifts (name, pricepoint, audience, image, description, submittedby, submittedon) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
    const valuesArray = [
      name,
      pricepoint,
      audience,
      image,
      description,
      submittedby,
      submittedon,
    ];
    const results = await pool.query(insertQuery, valuesArray);
    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const updateGift = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const {
      name,
      pricepoint,
      audience,
      image,
      description,
      submittedby,
      submittedon,
    } = req.body;
    const patchQuery = `UPDATE gifts SET name = $1, pricepoint = $2, audience = $3, image = $4, description = $5, submittedby = $6, submittedon = $7 WHERE id = $8 RETURNING *`;
    const valuesArray = [
      name,
      pricepoint,
      audience,
      image,
      description,
      submittedby,
      submittedon,
      id,
    ];
    const results = await pool.query(patchQuery, valuesArray);
    if (results.rows.length === 0) {
      return res.status(404).json({ error: `Gift with id ${id} not found` });
    }
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const deleteGift = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deleteQuery = `DELETE FROM gifts WHERE id = $1`;
    const result = await pool.query(deleteQuery, [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: `Gift with id ${id} not found` });
    }
    // No content on successful delete
    res.status(204).send();
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};
export default {
  getGifts,
  getGiftsbyId,
  createGift,
  updateGift,
  deleteGift,
};
