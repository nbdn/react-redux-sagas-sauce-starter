import React, { Component } from 'react';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';

import RootContainer from './Containers/RootContainer';

import createStore from './Redux';
const { history, store } = createStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Route exact path="/" component={RootContainer} />
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
