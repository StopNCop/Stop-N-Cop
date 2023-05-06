const create = async (req, res) => {
	const {
		session,
		db: { Bookmark },
		body: { postId },
	} = req;
	const userId = session.userId;
	const bookmark = await Bookmark.create(postId, userId);
	res.send(bookmark);
};

module.exports = create;
