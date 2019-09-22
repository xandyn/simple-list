import React from 'react';
import { observer } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';
import { productStore, identityStore } from 'store';
import { Main } from 'components/Main';

@observer
export class App extends React.Component {
  componentDidMount() {
    identityStore.getIdentity();
    productStore.list();
  }

  render() {
    return (
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    );
  }
}
