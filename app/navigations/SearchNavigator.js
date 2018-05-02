import React, { Component } from 'react';
import {  } from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import Header from '../components/Header/Header';
import Search from '../screens/Search';

const onClickSearch = StackNavigator(
  {
    Header : {screen: Header},
    Search: { screen: Search}
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
      <onClickSearch />
    )
  }
}
