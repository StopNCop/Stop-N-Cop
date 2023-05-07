const knex = require("../knex");

class Post {
	constructor({ id, user_id, name, link, city, price, username, email }) {
		this.id = id;
		this.user_id = user_id;
		this.name = name;
		this.link = link;
		this.city = city;
		this.price = price;
		this.username = username;
		this.email = email;
	}

	static async list() {
		try {
			const query = "SELECT posts.*, username, email FROM posts JOIN users ON posts.user_id = users.id ORDER BY posts.id DESC ";
			const { rows } = await knex.raw(query);
			return rows.map((post) => new Post(post));
		} catch (err) {
			console.error(err);
			return null;
		}
	}

	static async find(id) {
		try {
			const query = "SELECT * FROM posts WHERE id = ?";
			const {
				rows: [post],
			} = await knex.raw(query, [id]);
			return post ? new Post(post) : null;
		} catch (err) {
			console.error(err);
			return null;
		}
	}

	static async create(user_id, name, link, city, price) {
		try {
			const query = `INSERT INTO posts (user_id, name, link, city, price)
		      VALUES (?, ?, ?, ?, ?) RETURNING *`;
			const {
				rows: [posts],
			} = await knex.raw(query, [user_id, name, link, city, price]);
			return posts;
		} catch (err) {
			console.error(err);
			return null;
		}
	}

	update = async (name, link, city, price) => {
		// dynamic queries are easier if you add more properties
		try {
			const [updatedPost] = await knex('posts')
				.where({ id: this.id })
				.update({ name, link, city, price })
				.returning("*");
			return updatedPost ? new Post(updatedPost) : null;
		} catch (err) {
			console.error(err);
			return null;
		}
	};

    static async destroy(id) {
        try {
            const result = await knex.raw( `DELETE FROM posts WHERE id = ? RETURNING *`, [id]);
            return result;
        } catch (err) {
            console.error(err);
            return null;
                }
    }
}

module.exports = Post

const post = Post.list();