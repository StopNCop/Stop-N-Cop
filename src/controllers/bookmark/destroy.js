const destory = async (req, res) => {
    const {
        db: { Bookmark },
        params: { id },
     } = req;

     const result = await Bookmark.destroy(Number(id));
     res.sendStatus( result ? 204 : 404 );
}

module.exports = destory;