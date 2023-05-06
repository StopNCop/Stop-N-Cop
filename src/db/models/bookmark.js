const knex = require('../knex');

class Bookmark {
	constructor({ id, post_id, user_id, name, link, city, price }) {
		this.id = id;
		this.post_id = post_id;
		this.user_id = user_id;
		this.name = name;
		this.link = link;
		this.city = city;
		this.price = price;

	}
	static async list(userId) {
		try {
			const query = `SELECT posts.*, bookmarks.user_id
			FROM bookmarks
			JOIN posts
			ON bookmarks.post_id = posts.id
			WHERE bookmarks.user_id = ?;
			`;
			const { rows } = await knex.raw(query, [userId]);
			return rows.map((bookmark) => new Bookmark(bookmark));
		} catch (err) {
			console.error(err);
			return null;
		}
	}

	static async find(id) {
		try {
			const query = "SELECT * FROM bookmarks WHERE id = ?";
			const {
				rows: [bookmark],
			} = await knex.raw(query, [id]);
			return bookmark ? new Bookmark(bookmark) : null;
		} catch (err) {
			console.error(err);
			return null;
		}
	}

	static async create(post_id, user_id) {
		try {
			const query = `INSERT INTO bookmarks (post_id, user_id)
		      VALUES (?, ?) RETURNING *`;
			const {
				rows: [bookmarks],
			} = await knex.raw(query, [post_id, user_id]);
			return bookmarks;
		} catch (err) {
			console.error(err);
			return null;
		}
	}

	static async destroy(id) {
		try {
			const result = await knex.raw( `DELETE FROM bookmarks WHERE id = ? RETURNING *`, [id]);
			return result;
		}
		catch (err) {
			console.log(err);
			return null;
		}
	}
}

module.exports = Bookmark;

const bookmark = Bookmark.list();