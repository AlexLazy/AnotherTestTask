import React, { FC, Fragment } from 'react';

import { useQuery } from '@apollo/react-hooks';
import { GET_TODOS } from '../gql/queries';

import TodoAdd from '../components/TodoAdd';

const Todolist: FC = () => {
  const { data, loading, error } = useQuery(GET_TODOS);
  if (error) return <p>Произошла ошибка</p>;
  if (loading) return <p>Загрузка...</p>;
  console.log(data);
  return (
    <Fragment>
      <TodoAdd />
    </Fragment>
  );
};
export default Todolist;
