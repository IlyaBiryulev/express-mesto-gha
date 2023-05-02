const Card = require('../models/card');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Card.create({ name, link, owner: ownerId })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(200).send(card))
    .catch(next);
};

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail()
    .then(() => res.send({ message: 'Карточка удалена' }))
    .catch(next);
};

const cardLikesUpdate = (req, res, upData, next) => {
  Card.findByIdAndUpdate(req.params.cardId, upData, { new: true })
    .orFail()
    .then((card) => card.populate(['owner', 'likes']))
    .then((card) => res.status(200).send(card))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  const ownerId = req.user._id;
  const upData = { $addToSet: { likes: ownerId } };
  cardLikesUpdate(req, res, upData, next);
};

module.exports.dislikeCard = (req, res, next) => {
  const ownerId = req.user._id;
  const upData = { $pull: { likes: ownerId } };
  cardLikesUpdate(req, res, upData, next);
};
