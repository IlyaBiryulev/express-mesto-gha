module.exports.notFound = (req, res) => {
  res.status(404).send({
    message: 'Несуществующий URL',
  });
};
