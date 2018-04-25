import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
import Swiper from 'react-native-swiper';

const {width, height} = Dimensions.get('window');

export default class NewProduct extends Component{
  render(){
    const {navigation} = this.props;
    return (
      <View style={styles.wrapper}>
        <View style={{flex:1, justifyContent:'center'}}>
          <Text style={styles.textStyles}>COLLECTION</Text>
        </View>
        <View style={styles.productContainer}>
          <Image
            style={styles.imageStyles}
            source = {require('../media/temp/poster.jpg')}
          />
        </View>
      </View>
    )
  }
}

const imageWidth = width - 40;
const imageHeight = imageWidth/2;
const styles = StyleSheet.create({
  wrapper:{
    height: height*0.34,
    backgroundColor: '#fff',
    margin: 10,
    padding: 10,
    paddingVertical:0
  },
  textStyles: {
    color: '#AFAEAF'
  },
  imgStyles: {
    width: imageWidth,
    height: imageHeight
  },
  productContainer: {
    flex: 4
  }
})
