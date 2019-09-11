import React, { FC, Fragment } from 'react';

import { useQuery } from '@apollo/react-hooks';
import { GET_TODOS } from '../gql/queries';

import TodoAdd from '../components/TodoAdd';
import TodoTable from '../components/TodoTable';

const Todolist: FC = () => {
  const { data, loading, error } = useQuery(GET_TODOS);
  if (error) return <p>Произошла ошибка</p>;
  if (loading) return <p>Загрузка...</p>;

  return (
    <Fragment>
      <TodoTable todos={data && data.todos} />
      <div
        style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}
      >
        <TodoAdd />
      </div>
    </Fragment>
  );
};
export default Todolist;
