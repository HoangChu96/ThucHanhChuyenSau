import React, { Component } from 'react';
import {  } from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import Cart from '../screens/Cart';
import CartDetail from '../screens/CartDetail';
import InfoBuyer from '../screens/InfoBuyer';

const CartNav = StackNavigator(
  {
    Cart: {screen: Cart},
    CartDetail: {screen: CartDetail},
    InfoBuyer: {screen: InfoBuyer}
  },
  {
    headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
     gesturesEnabled: false,
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 100,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateX = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        });

        const opacity = position.interpolate({
        inputRange: [index-1, index - 0.99, index],
        outputRange: [0, 0.5, 1],
        });

      return { opacity, transform: [{ translateX }] };
      }
    })
  }
);

export default class CartNavigator extends Component{
  render(){
    return (
      <CartNav />
    )
  }
}
