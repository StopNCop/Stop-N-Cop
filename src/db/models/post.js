const knex = require("../knex");

class Post {
	constructor({ id, user_id, name, link, city, price }) {
		this.id = id;
		this.user_id = user_id;
		this.name = name;
		this.link = link;
		this.city = city;
		this.price = price;
	}

	static async list() {
		try {
			const query = "SELECT * FROM posts";
			const { rows } = await knex.raw(query);
			return rows.map((post) => new Post(post));
		} catch (err) {
			console.error(err);
			return null;
		}
	}

	static async create(user_id, name, link, city, price) {
		  try {
		    const query = `INSERT INTO posts (user_id, name, link, city, price)
		      VALUES (?, ?, ?, ?, ?) RETURNING *`;
		    const { rows: [posts] } = await knex.raw(query, [user_id, name, link, city, price]);
		    return posts;
		  }
		  catch(err){
		    console.error(err);
		    return null;
		  }
		}
}

module.exports = Post
