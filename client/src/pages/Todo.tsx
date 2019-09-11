import React, { FC } from 'react';

import { match } from 'react-router-dom';
import TodoCard from '../components/TodoCard';

const Todo: FC<{ match: match<{ id: string }> }> = ({ match }) => (
  <TodoCard id={match && match.params.id} onSaveComplete={() => {}}></TodoCard>
);

export default Todo;
