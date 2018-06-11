import React, { Component } from 'react';
import {
  StyleSheet,  Text,  View,
  TouchableOpacity,  Image,  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import url from '../config/handle';

const {height, width} = Dimensions.get('window');

class SaleProduct extends Component {
  render() {
    const {navigation, saleArray} = this.props;
    
    return (
      <View style={styles.wrapper}>
        <View style={styles.titleContainer}>
          <Text style={styles.textStyles}>SALE PRODUCT</Text>
        </View>

        <View style={styles.body}>
          {
            saleArray.map(e => (
              <View style={styles.productContainer} key={e.id} >
                <TouchableOpacity onPress = {() => {
                  navigation.navigate({
                    routeName: 'ProductDetail',
                    params: {
                      product:e //truyền dữ liệu của 1 product sang detail
                    }
                  })
                }}>
                  <View style={styles.label_wrapper}>
                    <View style={styles.label}>
                        <Image
                          style={styles.imgLabel}
                          source={require('../media/appIcon/label.png')}
                        />
                        {/* <Text style={styles.cashback}>50%</Text>
                        <Text style={styles.text}>{'Sale'.toUpperCase()}</Text> */}
                    </View>
                  </View>
                  <Image
                    style={styles.imgStyles}
                    source={{ uri: url.product + e.images[0] }}
                  />
                </TouchableOpacity>
                <Text style={styles.productName}>{e.name.toUpperCase()}</Text>
                <View style={styles.row3}>
                  <Text style={styles.productPrice}>{e.price}$</Text>
                </View>
              </View>
            ))
          }
        </View>
      </View>
    )
  }
}

function mapStateToProps(state){
  return {
    saleArray: state.saleArray
  }
}

export default connect(mapStateToProps)(SaleProduct);

const productWidth = (width - 60)/2;
const productHeight = productWidth;

const styles = StyleSheet.create({
  wrapper:{
    backgroundColor: '#fff',
    margin: 10,
    marginBottom: 0
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
  body: {
    flexDirection:'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginBottom:10,
  },
  label_wrapper:{
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf: 'center',
    zIndex: 10,
  },
  label: {
      position: 'relative',
      right: 0,
      width: 'auto'
  },
  imgLabel:{
    width: 50,
    height: 50
  },
  cashback: {
      position: 'absolute',
      
      width: '100%',
      textAlign: 'center',
      fontSize: 14,
      fontWeight: 'bold',
      color: '#FFCA2A'
  },
  text: {
      position: 'absolute',
      top: 10,
      fontWeight: 'bold',
      fontSize: 16,
      width: '100%',
      textAlign: 'center',
      color: '#FFCA2A'
  },
  productContainer: {
    width: productWidth,
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
