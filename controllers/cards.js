const Card = require('../models/card');

const { errors } = require('../utils/errors');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Card.create({ name, link, owner: ownerId })
    .then((card) => card.populate('owner'))
    .then((card) => res.send(card))
    .catch((err) => errors(err, res));
};

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch((err) => errors(err, res));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail()
    .then(() => res.send({ message: 'Карточка удалена' }))
    .catch((err) => errors(err, res));
};

const cardLikesUpdate = (req, res, upData) => {
  Card.findByIdAndUpdate(req.params.cardId, upData, { new: true })
    .orFail()
    .then((card) => card.populate(['owner', 'likes']))
    .then((card) => res.send(card))
    .catch((err) => errors(err, res));
};

module.exports.likeCard = (req, res) => {
  const ownerId = req.user._id;
  const upData = { $addToSet: { likes: ownerId } };
  cardLikesUpdate(req, res, upData);
};

module.exports.dislikeCard = (req, res) => {
  const ownerId = req.user._id;
  const upData = { $pull: { likes: ownerId } };
  cardLikesUpdate(req, res, upData);
};
