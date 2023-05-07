const destroy = async (req, res) => {
    const {
        session,
        db: { Bookmark },
        body: { postId },
     } = req;
     
     const userId = session.userId
     console.log(postId)
     const result = await Bookmark.destroy(userId, postId);
     res.sendStatus( result ? 204 : 404 );
}

module.exports = destroy;