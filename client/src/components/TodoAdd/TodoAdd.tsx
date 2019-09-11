import React, { FC, Fragment, useState } from 'react';

import { Button, Drawer } from 'antd';

import TodoCard from '../TodoCard';

const TodoAdd: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  return (
    <Fragment>
      <Drawer
        title='Создать новое задание'
        width={720}
        onClose={handleClose}
        visible={isOpen}
      >
        <TodoCard onSaveComplete={handleClose} />
      </Drawer>
      <Button
        type='primary'
        shape='circle'
        icon='plus'
        size='large'
        onClick={handleOpen}
      />
    </Fragment>
  );
};
export default TodoAdd;
