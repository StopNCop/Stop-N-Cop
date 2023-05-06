const session = require("express-session")

const list = async (req, res) => {
    const {
        session,
		db: { Bookmark },
	} = req;
    const userId = session.userId;
    const bookmarks = await Bookmark.list(userId);
    res.send(bookmarks)
}

module.exports = list;