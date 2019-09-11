import React, { FC, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { Table, Divider, Button } from 'antd';

import TodoDeleteConfirm from '../TodoDeleteConfirm';

export interface Todo {
  id: string;
  title: string;
  excerpt: string | null;
  description: string | null;
  time: Date | null;
  createdAt: Date;
}

interface TodoTableProps {
  todos: Todo[];
}

const TodoTable: FC<TodoTableProps> = ({ todos }) => {
  const [deleteId, setDeleteId] = useState();
  const [deleteOpen, setDeleteOpen] = useState(false);

  const data = todos.map((todo: Todo) => ({
    ...todo,
    key: todo.id,
    excerpt: todo.excerpt || '-',
    time: (todo.time && moment(todo.time).format('HH:mm')) || '-',
    createdAt: moment(todo.createdAt).format('MM-DD-YYYY')
  }));

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Заголовок',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Краткое описание',
      dataIndex: 'excerpt',
      key: 'excerpt'
    },
    {
      title: 'Дата создания',
      dataIndex: 'createdAt',
      key: 'createdAt'
    },
    {
      title: 'Время на выполнение',
      dataIndex: 'time',
      key: 'time'
    },
    {
      title: 'Действия',
      key: 'action',
      render: (todo: any) => {
        return (
          <Fragment>
            <Link to={'/todos/' + todo.id}>Редактировать</Link>
            <Divider type='vertical' />
            <Button
              type='danger'
              shape='circle'
              icon='delete'
              onClick={() => handleDelete(todo.id)}
            />
          </Fragment>
        );
      }
    }
  ];

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  return (
    <Fragment>
      <Table columns={columns} dataSource={data} />
      <TodoDeleteConfirm
        id={deleteId}
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
      />
    </Fragment>
  );
};
export default TodoTable;
