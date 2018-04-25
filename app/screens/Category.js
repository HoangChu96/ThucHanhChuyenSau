import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

export default class Category extends Component {
  render() {
    const {
      wrapper, title, categoryStyles, txtProduct
    } = styles;

    return (
      <View style={wrapper}>
        <View style={title}>
          <Text>CATEGORY</Text>
        </View>
        <View>
          <TouchableOpacity style={categoryStyles}>
            <Text style={txtProduct}>Adidas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={categoryStyles}>
            <Text style={txtProduct}>Nike</Text>
          </TouchableOpacity>

          <TouchableOpacity style={categoryStyles}>
            <Text style={txtProduct}>Puma</Text>
          </TouchableOpacity>

          <TouchableOpacity style={categoryStyles}>
            <Text style={txtProduct}>Sneaker</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper:{
    margin: 10
  },
  title:{
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  categoryStyles:{
    margin:10
  },
  txtProduct:{
    borderBottomWidth: 1,
    borderColor: '#cbcbcb'
  },
});
