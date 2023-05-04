const list = async (req, res) => {
    const { Bookmark } = req.db
    const bookmarks = await Bookmark.list()
    res.send(bookmarks)
}

module.exports = list;