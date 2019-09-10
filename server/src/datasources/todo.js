const { DataSource } = require('apollo-datasource');

class TodoAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  async getAllTodos() {
    const todos = await this.store.todos.findAll();
    return todos;
  }
  async getTodoById({ id }) {
    const todo = await this.store.todos.findOne({ where: { id } });
    return todo;
  }

  async createTodo({ title, excerpt, description, time }) {
    const todo = await this.store.todos.create({
      title,
      excerpt,
      description,
      time
    });

    return todo;
  }

  async updateTodo({ id, title, excerpt, description, time }) {
    const [countUpdated] = await this.store.todos.update(
      {
        title,
        excerpt,
        description,
        time
      },
      { where: { id } }
    );

    return !!countUpdated;
  }

  async deleteTodo({ id }) {
    const res = await this.store.todos.destroy({ where: { id } });
    return !!res;
  }
}

module.exports = TodoAPI;
