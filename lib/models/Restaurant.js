const pool = require('../utils/pool');

module.exports = class Restaurant {
  id;
  name;
  type;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
  }

  static async getAllRestaurants() {
    const { rows } = await pool.query('SELECT * FROM restaurants');
    return rows.map((row) => new Restaurant(row));
  }

  static async getRestaurantById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM restaurants WHERE id=$1;',
      [id]
    );
    if (!rows[0]) return null;
    return new Restaurant(rows[0]);
  }

  async getReviews() {
    const { rows } = await pool.query(
      `SELECT reviews.detail FROM restaurants
    LEFT JOIN reviews ON restaurants.id = reviews.restaurant_id
    WHERE reviews.restaurant_id = $1`,
      [this.id]
    );
    this.reviews = rows;
    return this;
  }
};
