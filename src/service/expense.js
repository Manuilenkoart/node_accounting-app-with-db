const { DataTypes, Op } = require('sequelize');
const { sequelize } = require('../db');

const ExpenseSchema = sequelize.define(
  'Expense',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id',
      allowNull: false,
    },
    spentAt: {
      type: DataTypes.STRING,
      field: 'spent_at',
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'expenses',
    createdAt: false,
    updatedAt: false,
  },
);

const EXPENSE = [];

const getAll = ({ userId, categories, from, to }) => {
  const whereClause = {};

  if (userId) {
    whereClause.userId = +userId;
  }

  if (categories && categories.length > 0) {
    whereClause.category = Array.isArray(categories)
      ? { [Op.in]: categories }
      : categories;
  }

  if (from && to) {
    whereClause.spentAt = {
      [Op.between]: [from, to],
    };
  }

  return ExpenseSchema.findAll({
    where: whereClause,
  });
};

const getById = (id) => {
  return ExpenseSchema.findByPk(id);
};

const create = ({ userId, spentAt, title, amount, category, note }) => {
  // await sequelize.sync();

  return ExpenseSchema.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

const remove = (id) => {
  return ExpenseSchema.destroy({ where: { id } });
};

const update = (id, dataToUpdate) => {
  return ExpenseSchema.update({ ...dataToUpdate }, { where: { id } });
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
};
