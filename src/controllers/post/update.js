const updatePost = async (req, res) => {
    const{
        db: { Post },
        params: { id },
        body: { name, link, city, price }
    } = req;

    const post = await Post.find(id);
    if (!post) return res.sendStatus(404);

    const updatedPost = await post.update(name, link, city, price);
    res.send(updatedPost);
}

module.exports = updatePost;