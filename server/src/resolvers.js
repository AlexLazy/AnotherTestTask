module.exports = {
  Query: {
    todo: async (_, { id }, { dataSources }) =>
      dataSources.todoAPI.getTodoById({ id }),
    todos: async (_, __, { dataSources }) => dataSources.todoAPI.getAllTodos()
  },
  Mutation: {
    addTodo: async (
      _,
      { title, excerpt, description, time },
      { dataSources }
    ) => {
      const todo = await dataSources.todoAPI.createTodo({
        title,
        excerpt,
        description,
        time
      });

      return {
        success: !!todo,
        message: todo ? 'Задание успешно добавлено' : 'Произолша ошибка',
        todos: [todo]
      };
    },
    updateTodo: async (
      _,
      { id, title, excerpt, description, time },
      { dataSources }
    ) => {
      const res = await dataSources.todoAPI.updateTodo({
        id,
        title,
        excerpt,
        description,
        time
      });

      return {
        success: res,
        message: res ? 'Задание успешно отредактировано' : 'Произолша ошибка',
        todos: []
      };
    },
    deleteTodo: async (_, { id }, { dataSources }) => {
      const res = await dataSources.todoAPI.deleteTodo({
        id
      });

      return {
        success: res,
        message: res ? 'Задание успешно удалено' : 'Произолша ошибка',
        todos: []
      };
    }
  }
};
