import { pool } from "../config/database.js";

const getGifts = async (req, res) => {
  try {
    const results = await pool.query(`SELECT * FROM gifts ORDER BY id ASC`);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const getGiftsbyId = async (req, res) => {
  try {
    const selectQuery = `SELECT id, name, pricePoint, audience, image, description FROM gifts WHERE id = $1`;
    const giftId = req.params.giftId;
    const results = await pool.query(selectQuery, [giftId]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};
export default {
  getGifts,
  getGiftsbyId,
};
