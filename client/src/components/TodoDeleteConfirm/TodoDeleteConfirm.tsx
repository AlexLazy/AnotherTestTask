import { FC, useEffect } from 'react';

import { useMutation } from '@apollo/react-hooks';
import { GET_TODOS } from '../../gql/queries';
import { DELETE_TODO } from '../../gql/mutations';

import { Modal, message } from 'antd';

export interface TodoDeleteConfirmProps {
  id: string;
  open: boolean;
  onClose(): void;
}

const TodoDeleteConfirm: FC<TodoDeleteConfirmProps> = ({
  id,
  open,
  onClose
}) => {
  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: [
      {
        query: GET_TODOS
      }
    ],
    onCompleted({ deleteTodo }) {
      deleteTodo.success
        ? message.success(deleteTodo.message)
        : message.error(deleteTodo.message);
    },
    onError(error) {
      message.error(error.message);
    }
  });

  useEffect(() => {
    open &&
      Modal.confirm({
        title: 'Удалить задание?',
        okText: 'Да',
        cancelText: 'Нет',
        onOk() {
          deleteTodo({ variables: { id } });
          onClose();
        },
        onCancel() {
          onClose();
        }
      });
  });

  return null;
};
export default TodoDeleteConfirm;
