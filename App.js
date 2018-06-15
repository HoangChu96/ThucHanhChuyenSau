import React, { Component } from 'react';
import MainStack from './app/navigations/AppNavigation';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './app/redux/reducer/reducer';

const store = createStore(reducer);


class App extends Component {
  constructor(props){
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
