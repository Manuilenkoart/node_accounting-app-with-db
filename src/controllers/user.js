const { userService } = require('../service');

const create = async (req, res) => {
  const newRecord = await userService.create(req.body);

  if (!newRecord) {
    return res.sendStatus(400);
  }

  res.status(201).send(newRecord);
};

const getAll = async (req, res) => {
  const data = await userService.getAll();

  res.send(data);
};

const getById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(400);
  }

  const record = await userService.getById(+id);

  if (!record) {
    return res.sendStatus(404);
  }

  res.send(record);
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(400);
  }

  const record = await userService.getById(+id);

  if (!record) {
    return res.sendStatus(404);
  }

  await userService.remove(+id);

  res.sendStatus(204);
};

const patch = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id) {
    return res.sendStatus(400);
  }

  const user = await userService.getById(+id);

  if (!user) {
    return res.sendStatus(404);
  }

  const updated = await userService.update(+id, name);

  res.send(updated);
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
  patch,
};
