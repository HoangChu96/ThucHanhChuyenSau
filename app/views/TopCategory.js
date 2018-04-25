import React, { Component } from 'react';
import {
  Text,  View,  Dimensions, TouchableOpacity,  StyleSheet,
  Image, FlatList
} from 'react-native';
import {connect} from 'react-redux';
import url from '../config/handle';
import Swiper from 'react-native-swiper';

const {width, height} = Dimensions.get('window');

class TopCategory extends Component{
  render(){
    const {navigation} = this.props;
    return (
      <View style={styles.wrapper}>
        <View style={{flex:1, justifyContent:'center'}}>
          <Text style={styles.textStyles}>TOP OF CATEGORY</Text>
        </View>
        <View  style={{flex:4}}>
          <Swiper
            // showsButtons={true}
            autoplay={true}
            autoplayTimeout={5}
            activeDotColor={'#34B089'}
          >
            {this.props.types.map(e => (
              <TouchableOpacity
                onPress = {() => navigation.navigate({
                  routeName: 'ProductList'
              })}
                key= {e.id}
              >
                <Image
                  style={styles.imgStyles}
                  source={{uri: url.typeProduct + e.image}}
                />
              </TouchableOpacity>
            ))}
          </Swiper>
        </View>
      </View>
    )
  }
}

function mapStateToProps(state){
  return {
    types: state.types,
    cartArray: state.cartArray
  };
}

export default connect(mapStateToProps)(TopCategory);

const imageWidth = width - 40;
const imageHeight = imageWidth/2;
const styles = StyleSheet.create({
  wrapper:{
    height: height*0.34,
    backgroundColor: '#fff',
    margin: 10,
    marginBottom:0
  },
  textStyles: {
    color: '#AFAEAF',
    paddingLeft:10
  },
  imgStyles: {
    marginLeft:10,
    width: imageWidth,
    height: imageHeight
  },
  paragraph: {
    textAlign: 'center'
  }
})
