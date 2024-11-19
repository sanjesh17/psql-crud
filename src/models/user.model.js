const pool = require("../config/db.config");
const logger = require("../utils/logger");

class userModel {
  static async create(userData) {
    const { name, email } = userData;
    const query = "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *";

    try {
      const { rows } = await pool.query(query, [name, email]);
      return rows[0];
    } catch (error) {
      logger.error("Error in creating user:", error);
      throw error;
    }
  }

  static async findAll() {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users ORDER BY created_at ASC"
      );
      return rows;
    } catch (error) {
      logger.error("Error in fetching all users:", error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE id=$1", [
        id,
      ]);
      return rows[0];
    } catch (error) {
      logger.error("Error in fetching the id:", error);
      throw error;
    }
  }

  static async update(id, userData) {
    const { name, email } = userData;
    const query =
      "UPDATE users SET NAME = $1, email = $2, updated_at = NOW() WHERE id = $3 RETURNING *";
    try {
      const { rows } = await pool.query(query, [name, email, id]);
      return rows[0];
    } catch (error) {
      logger.error("Error in updating the row:", error);
      throw error;
    }
  }

  static async deleteId(id) {
    try {
      const { rows } = await pool.query(
        "DELETE FROM users WHERE id = $1 RETURNING *",
        [id]
      );
      return rows[0];
    } catch (error) {
      logger.error("Error in deleting user:", error);
      throw error;
    }
  }
}

module.exports = userModel;
