import React, { FC } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import { Layout, Typography, Card } from 'antd';

import Todo from './Todo';
import Todolist from './Todolist';
import Page404 from './Page404';

const { Header, Content } = Layout;
const { Title } = Typography;

const Pages: FC = () => (
  <Layout>
    <Header>
      <Link to='/'>
        <Title style={{ textAlign: 'center', color: '#fff' }}>Todo list</Title>
      </Link>
    </Header>
    <Content style={{ minHeight: 'calc(100vh - 64px)' }}>
      <Card style={{ maxWidth: 980, margin: '32px auto' }}>
        <Switch>
          <Route exact path={['/', '/todos']} component={Todolist} />
          <Route exact path='/todos/:id' component={Todo} />
          <Route path='**' component={Page404} />
        </Switch>
      </Card>
    </Content>
  </Layout>
);
export default Pages;
