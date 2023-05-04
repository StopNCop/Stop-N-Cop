const create = async (req, res) => {
	const {
		db: { Bookmark },
		body: { post_id, user_id },
	} = req;
	const bookmark = await Bookmark.create(post_id, user_id);
	res.send(bookmark);
};

module.exports = create;
