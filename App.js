import React, { Component } from 'react';
import MainStack from './app/navigations/AppNavigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './app/redux/reducer/reducer';
import saveCart from './app/api/saveCart';

const logger = store => next => action => {
  let result = next(action);
  if(action.type === "DELETE_CART") {
    const state = store.getState().cartArray;
    saveCart(state);
  }
  return result;
}

const store = createStore(reducer, applyMiddleware(logger));

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <MainStack />
      </Provider>
    );
  }
}
export default App;
