// models/User.js
const db = require('../config/db');

class User {
  constructor(email, name, password, position) {
    this.email = email;
    this.name = name;
    this.password = password;
    this.position = position;
  }

  static async findOne(email) {
    const res = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return res.rows[0];
  }

  async save() {
 //   const hashedPassword = await bcrypt.hash(this.password, 10);
    const res = await db.query(
      'INSERT INTO users (email, name, password, position) VALUES ($1, $2, $3, $4) RETURNING *',
      [this.email, this.name, this.password, this.position]
    );
    return res.rows[0];
  }
}

module.exports = User;