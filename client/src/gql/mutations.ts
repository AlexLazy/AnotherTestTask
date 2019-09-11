import gql from 'graphql-tag';

export const ADD_TODO = gql`
  mutation AddTodo(
    $title: String!
    $excerpt: String
    $description: String
    $time: String
  ) {
    addTodo(
      title: $title
      excerpt: $excerpt
      description: $description
      time: $time
    ) {
      success
      message
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo(
    $id: ID!
    $title: String!
    $excerpt: String
    $description: String
    $time: String
  ) {
    updateTodo(
      id: $id
      title: $title
      excerpt: $excerpt
      description: $description
      time: $time
    ) {
      success
      message
    }
  }
`;
