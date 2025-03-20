const { sequelize } = require('../db');
const { DataTypes } = require('sequelize');

const UserSchema = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    createdAt: false,
    updatedAt: false,
  },
);

const getAll = () => {
  return UserSchema.findAll({
    order: ['name'],
  });
};

const getById = (id) => {
  return UserSchema.findByPk(id);
};

const create = ({ name }) => {
  // await sequelize.sync();

  return UserSchema.create({ name });
};

const remove = (id) => {
  return UserSchema.destroy({ where: { id } });
};

const update = async (id, name) => {
  return UserSchema.update({ name }, { where: { id } });
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
};
