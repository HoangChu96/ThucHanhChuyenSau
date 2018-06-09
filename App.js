import React, { Component } from 'react';
import MainStack from './app/navigations/AppNavigation';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './app/redux/reducer/reducer';
import url from './app/config/handle';

const store = createStore(reducer);

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      saleProduct: [] 
    };
    // console.log(this.state.saleProduct);
  }
  componentDidMount(){
    fetch(url.saleProduct)
      .then(res => res.json())
      .then((resJSON) => {
        const {sale} = resJSON;
        this.setState = {saleProduct: sale.saleProduct};
        console.log(saleProduct);
      })
      .catch(
        (e) => {console.log(e)}
      );
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
