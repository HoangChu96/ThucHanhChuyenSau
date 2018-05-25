import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';

class ProductByType extends Component {
  render() {
    const {
      wrapper
    } = styles;
    const { dataSource } = this.props.navigation.state.params;

    return (
      <View style={wrapper}>
          <Text>Product By Type {dataSource.name.toUpperCase()} </Text>
      </View>
    );
  }
}

export default ProductByType;

const styles = StyleSheet.create({
  wrapper:{
    margin: 10
  }
});
