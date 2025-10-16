import { pool } from "./database.js";
import "./dotenv.js";
import giftData from "../data/gifts.js";

const createTableQuery = `
    DROP TABLE IF EXISTS gifts;
    CREATE TABLE IF NOT EXISTS gifts (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            pricepoint VARCHAR(10) NOT NULL,
            audience VARCHAR(255) NOT NULL,
            image TEXT NOT NULL,
            description TEXT NOT NULL,
            submittedby VARCHAR(255) NOT NULL,
            submittedon TIMESTAMP NOT NULL
        )
`;

const createGiftsTable = async () => {
  try {
    const res = await pool.query(createTableQuery);
    console.log("🎉 gifts table created successfully");
  } catch (err) {
    console.error("⚠️ error creating gifts table", err);
  }
};

const seedGiftsTable = async () => {
  await createGiftsTable();
  giftData.forEach((gift) => {
    const insertQuery = {
      text: "INSERT INTO gifts (name, pricepoint, audience, image, description, submittedby, submittedon) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    };
    const values = [
      gift.name,
      gift.pricePoint,
      gift.audience,
      gift.image,
      gift.description,
      gift.submittedby,
      gift.submittedon,
    ];
    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting gift", err);
        return;
      }

      console.log(`✅ ${gift.name} added successfully`);
    });
  });
};

seedGiftsTable();
