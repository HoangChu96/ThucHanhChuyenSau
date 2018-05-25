import React, { Component } from 'react';
import {
  Text, View, Dimensions, StyleSheet, Image,
  TouchableOpacity, ScrollView
} from 'react-native';
import {connect} from 'react-redux';
import Swiper from 'react-native-swiper';
import url from '../config/handle';

const {width, height} = Dimensions.get('window');

class ProductListView2 extends Component{
  render(){
    const {navigation, dataSource} = this.props;

    return (
      <ScrollView>
        <View style={styles.body}>
          {
            dataSource.map(e => (
              <View style={styles.productContainer} key={e.id}>
        
                <Swiper
                  // showsButtons={true}
                  autoplay={true}
                  autoplayTimeout={5}
                  activeDotColor={'#34B089'}
                >
                  <TouchableOpacity onPress = {() =>{
                      navigation.navigate({
                          routeName: 'ProductDetail',
                          params: {
                          productDt:e //truyền dữ liệu của 1 product sang detail
                        }
                      })
                    }}>

                    <Image
                      style={styles.imgStyles}
                      source={{uri: url.product + e.images[0]}}
                    />

                  </TouchableOpacity>

                </Swiper>
                <Text style={styles.productName}>{e.name.toUpperCase()}</Text>
                <View style={styles.row3}>
                  <Text style={styles.productPrice}>{e.price}$</Text>
                </View>
              </View>
            ))
          }
        </View>
      </ScrollView>
    )
  }
}

function mapStateToProps(state){
  return {
    dataSource: state.dataSource,
    cartArray: state.cartArray
  }
}
export default connect(mapStateToProps)(ProductListView2);

const productWidth = width - 60;
const productHeight = productWidth;
const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    margin: 10,
    flexDirection:'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginBottom:10,
  },
  titleContainer: {
    justifyContent:'center',
    padding:10,
    paddingBottom:0
  },
  textStyles: {
    color: '#AFAEAF',
    marginBottom:10
  },
  imgStyles: {
    width: productWidth,
    height: productHeight
  },
  productContainer: {
    width: productWidth,
//    height: productHeight,
    marginBottom: 10,
    borderBottomWidth:1,
    borderColor: '#AFAEAF',

  },
  productName: {
    paddingLeft: 10,
    fontWeight: '500',
    color: '#d3d3cf',
    marginVertical:5
  },
  productPrice: {
    paddingLeft: 10,
    marginBottom:5,
    color: '#662f90'
  },
  row3:{
    flexDirection:'row',
    justifyContent: 'space-between'
  },
  imageLike:{
    width: 18,
    height: 18
  }
})

            
// <Swiper
// autoplay={true}
// autoplayTimeout={5}
// activeDotColor={'#34B089'}
// >