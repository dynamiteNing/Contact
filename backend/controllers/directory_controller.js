const Directory = require('../models/directory_model');

const getFriends = async (req, res) => {
  const { email } = req.query;

  const result = await Directory.getFriends(email);

  if (result.error) {
    res.status(403).send({ error: result.error });
    return;
  }
    
  if (result.length <= 0) {
    res.status(404).send({ message: `The email ${email} has no friend.` });
    return;
  }
    
  res.status(200).send({
    data: {
      friends: result,
    },
  });
};

const getNotfriends = async (req, res) => {
  const { email } = req.query;

  const result = await Directory.getNotfriends(email);

  if (result.error) {
    res.status(403).send({ error: result.error });
    return;
  }
    
  if (result.length <= 0) {
    res.status(404).send({ message: `The email ${email} is all friends to our artists.` });
    return;
  }
    
  res.status(200).send({
    data: {
      notfriends: result,
    },
  });
};

const getProfile = async (req, res) => {
  const { artist } = req.query;

  const result = await Directory.getProfile(artist);

  if (result.error) {
    res.status(403).send({ error: result.error });
    return;
  }
    
  if (result.length <= 0) {
    res.status(404).send({ message: `The artist ${artist} has no profile.` });
    return;
  }
    
  res.status(200).send({
    data: {
      profile: {
        name: result.name,
        quote: result.quote,
      },
    },
  });
};

module.exports = {
    getFriends,
    getNotfriends,
    getProfile,
};
