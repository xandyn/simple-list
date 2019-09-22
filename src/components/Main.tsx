import React from 'react';
import { observer } from 'mobx-react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Header } from './Header';
import { ProductList } from './products/ProductList';
import { ProductInfo } from './products/ProductInfo';
import { urls } from '../constants';
import { Wrapper } from './Main.style';

const Main = () => (
  <Container>
    <Header />
    <Wrapper>
      <Switch>
        <Route exact path={urls.products} component={ProductList} />
        <Route exact path={`${urls.products}/:productId`} component={ProductInfo} />

        <Redirect to={urls.products} />
      </Switch>
    </Wrapper>
  </Container>
);

const WithObserver = observer(Main);
const WithRouter = withRouter(WithObserver);

export { WithRouter as Main };
