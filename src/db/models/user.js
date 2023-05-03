const knex = require('../knex');
const { hashPassword, isValidPassword } = require('../../utils/auth-utils');

class User {
  #passwordHash = null;

  constructor({ id, username, password_hash, email }) {
    this.id = id;
    this.username = username;
    this.#passwordHash = password_hash;
    this.email = email;
  }

  static async list() {
    try {
      const query = 'SELECT * FROM users';
      const { rows } = await knex.raw(query);
      console.log(rows)
      return rows.map((user) => new User(user));
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async find(id) {
    try {
      const query = 'SELECT * FROM users WHERE id = ?';
      const { rows: [user] } = await knex.raw(query, [id]);
      return user ? new User(user) : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async findByUsername(username) {
    try {
      const query = 'SELECT * FROM users WHERE username = ?';
      const { rows: [user] } = await knex.raw(query, [username]);
      return user ? new User(user) : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async create(username, password, email) {
    try {
      const passwordHash = await hashPassword(password);

      const query = `INSERT INTO users (username, password_hash, email)
        VALUES (?, ?, ?) RETURNING *`;
      const { rows: [user] } = await knex.raw(query, [username, passwordHash, email]);
      return new User(user);
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async deleteAll() {
    try {
      return knex.raw('DELETE FROM users;');
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  update = async (username) => { // dynamic queries are easier if you add more properties
    try {
      const [updatedUser] = await knex('users')
        .where({ id: this.id })
        .update({ username })
        .returning('*');
      return updatedUser ? new User(updatedUser) : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  isValidPassword = async (password) => (
    isValidPassword(password, this.#passwordHash)
  );

  static async createListing(user_id, name, link, city, price) {
    try {
      const query = `INSERT INTO posts (user_id, name, link, city, price)
        VALUES (?, ?, ?, ?, ?) RETURNING *`;
      const { rows: [listing] } = await knex.raw(query, [user_id, name, link, city, price]);
      return listing;
    }
    catch(err){
      console.error(err);
      return null;
    }
  }

  static async addToBookmarks(post_id, user_id) {
    try {
      const query = `INSERT INTO bookmarks (post_id, user_id)
        VALUES (?, ?) RETURNING *`;
      const { rows: [bookmarks] } = await knex.raw(query, [post_id, user_id]);
      return bookmarks;
    }
    catch(err){
      console.error(err);
      return null;
    }
  }
}

module.exports = User;


const user = User.list();
console.log(user);