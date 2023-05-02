const Card = require('../models/card');

const ForbiddenError = require('../errors/forbiddenErrors');

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
  Card.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      Card.deleteOne({ _id: card._id, owner: req.user._id })
        .then((result) => {
          if (result.deletedCount === 0) {
            throw new ForbiddenError('Вы не можете удалить карточку другого пользователя');
          } else {
            res.send({ message: 'Карточка удалена' });
          }
        })
        .catch(next);
    })
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
