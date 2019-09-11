import React, { FC, useState } from 'react';

import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_TODOS, GET_TODO_BY_ID } from '../../gql/queries';
import { ADD_TODO, UPDATE_TODO } from '../../gql/mutations';

import { message } from 'antd';

import TodoCardForm from './TodoCardForm';

export interface TodoCardProps {
  id?: string;
  onSaveComplete(): void;
}

const TodoCard: FC<TodoCardProps> = ({ id, onSaveComplete }) => {
  const [disabled, setDisabled] = useState(!!id);
  const { loading, error, data } = useQuery(GET_TODO_BY_ID, {
    variables: { id },
    skip: !id
  });
  const props = data && data.todo;

  const [addTodo] = useMutation(ADD_TODO, {
    refetchQueries: [
      {
        query: GET_TODOS
      }
    ],
    onCompleted({ addTodo }) {
      onCompletedMsg(addTodo);
      onSaveComplete();
    },
    onError(error) {
      message.error(error.message);
    }
  });

  const [updateTodo] = useMutation(UPDATE_TODO, {
    refetchQueries: [
      {
        query: GET_TODOS
      }
    ],
    onCompleted({ updateTodo }) {
      onCompletedMsg(updateTodo);
      setDisabled(true);
      onSaveComplete();
    },
    onError(error) {
      message.error(error.message);
    }
  });

  if (error) return <p>Произошла ошибка</p>;

  return (
    <TodoCardForm
      {...props}
      isLoadin={loading}
      disabled={disabled}
      onEdit={() => setDisabled(false)}
      onSave={!!id ? updateTodo : addTodo}
    ></TodoCardForm>
  );
};
export default TodoCard;

const onCompletedMsg = (req: any) =>
  req.success ? message.success(req.message) : message.error(req.message);
