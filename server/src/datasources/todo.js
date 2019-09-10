const { DataSource } = require('apollo-datasource');

class ToDoAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }
}

module.exports = ToDoAPI;
