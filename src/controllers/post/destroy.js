const destroy = async (req, res) => {
    const {
        db: { Post },
        params: { id },
    } = req;

    const result = await Post.destroy(Number(id));
    res.sendStatus( result ? 204 : 404 );
}

module.exports = destroy;