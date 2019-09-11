import gql from 'graphql-tag';

export default gql`
  scalar Date

  type Query {
    todos: [Todo]
    todo(id: ID!): Todo
  }
  type Mutation {
    addTodo(
      title: String!
      excerpt: String
      description: String
      time: String
    ): TodoUpdateRosponse!
    updateTodo(
      id: ID!
      title: String
      excerpt: String
      description: String
      time: String
    ): TodoUpdateRosponse!
    deleteTodo(id: ID!): TodoUpdateRosponse!
  }
  type Todo {
    id: ID!
    title: String!
    excerpt: String
    description: String
    time: String
    createdAt: Date!
  }
  type TodoUpdateRosponse {
    success: Boolean!
    message: String
    todos: [Todo]
  }
`;
