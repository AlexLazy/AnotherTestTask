const { ApolloServer } = require('apollo-server');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { createStore } = require('./utils');

const TodoAPI = require('./datasources/todo');

const store = createStore();

const dataSources = () => ({
  todoAPI: new TodoAPI({ store })
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources
});

if (process.env.NODE_ENV !== 'test')
  server
    .listen({ port: 4000 })
    .then(({ url }) => console.log(`🚀 app running at ${url}`));

module.exports = {
  dataSources,
  typeDefs,
  resolvers,
  ApolloServer,
  TodoAPI,
  store,
  server
};
