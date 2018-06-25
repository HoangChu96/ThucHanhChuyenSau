import React, { Component } from 'react';
import {  } from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import Search from '../screens/SearchView';
import ProductDetail from '../screens/ProductDetail';

const SearchNav = StackNavigator(
  {
    Search: { screen: Search},
    ProductDetail: {screen: ProductDetail}
  },
  {
    headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
     gesturesEnabled: false,
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
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

export default class SearchNavigator extends Component{
  render(){
    return (
      <SearchNav />
    )
  }
}
