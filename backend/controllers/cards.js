const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) next(new NotFoundError('Карточка не найдена'));
      if (req.user._id === card.owner.toString()) {
        return Card.findByIdAndRemove(req.params.cardId)
          .then((c) => res.send(c))
          .catch(next);
      }
      return next(new ForbiddenError('Попытка удалить чужую карточку'));
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      next(new NotFoundError('Карточка не найдена'));
    } else {
      res.send(card);
    }
  })
  .catch(next);

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      next(new NotFoundError('Карточка не найдена'));
    } else {
      res.send(card);
    }
  })
  .catch(next);
