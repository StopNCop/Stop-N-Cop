const createListing = async (req, res) => {
    const {
      session,
      db: { User },
      body: { name, link, city, price},
    } = req;
    const userId = session.userId;
    const listing = await User.createListing(userId, name, link, city, price);
    console.log(listing)
    res.send(listing);
  };
  
  module.exports = createListing;
  