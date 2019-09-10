const SQL = require('sequelize');

module.exports.createStore = () => {
  const Op = SQL.Op;
  const operatorsAliases = {
    $in: Op.in
  };

  const db = new SQL('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: './store.sqlite',
    operatorsAliases,
    logging: false
  });

  const todos = db.define('todo', {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE
  });

  return { todos };
};
