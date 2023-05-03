const create = async (req, res) => {
    const {
      db: { Post },
      body: { user_id, name, link, city, price},
    } = req;
    const listing = await Post.create(user_id, name, link, city, price);
    res.send(listing);
  };
  
  module.exports = create;