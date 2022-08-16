const pool = require('../utils/pool');

module.exports = class Review {
  id;
  restaurant_id;
  user_id;
  stars;
  detail;

  constructor(row) {
    this.id = row.id;
    this.restaurant_id = row.restaurant_id;
    this.user_id = row.user_id;
    this.stars = row.stars;
    this.detail = row.detail;
  }

  static async insert({ user_id, restaurant_id, stars, detail }) {
    const { rows } = await pool.query(
      `
        INSERT INTO reviews (user_id, restaurant_id, stars, detail)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
      [user_id, restaurant_id, stars, detail]
    );
    return new Review(rows[0]);
  }
};
