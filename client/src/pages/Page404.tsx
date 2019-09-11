import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { Result, Button } from 'antd';

const Page404: FC = () => {
  return (
    <Result
      status='404'
      title='404'
      subTitle='Нет такой страницы'
      extra={
        <Button type='primary'>
          <NavLink to='/'>На главную</NavLink>
        </Button>
      }
    />
  );
};

export default Page404;
