import React, { Component } from 'react';
import {
  Text,  View,  Dimensions,  StyleSheet,  Image,  TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import url from '../config/handle';

const {width, height} = Dimensions.get('window');

class HightLightProduct extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const {navigation,  topProducts} = this.props;

    return (
      <View style={styles.wrapper}>
        <View style={styles.titleContainer}>
          <Text style={styles.textStyles}>TOP PRODUCT</Text>
        </View>

        <View style={styles.body}>
            {
              topProducts.map(e => (
                <View style={styles.productContainer} key={e.id}>
                  <TouchableOpacity onPress = {() => {
                    navigation.navigate({
                      routeName: 'ProductDetail',
                      params: {
                        product:e //truyền dữ liệu của 1 product sang detail
                      }
                    })
                  }}>

                    <Image
                      style={styles.imgStyles}

                      source={{uri: '${e.images[0]}'}}
                    />
                    <Text style={styles.productName}>{e.name.toUpperCase()}</Text>
                  </TouchableOpacity>

                  <View style={styles.row3}>
                  <Text style={styles.productName}>{e.images[0]}</Text>
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
  return{
    topProducts: state.topProducts
  }
}
export default  connect(mapStateToProps)(HightLightProduct);

const productWidth = (width - 60)/2;
const productHeight = productWidth;

const styles = StyleSheet.create({
  wrapper:{
    backgroundColor: '#fff',
    margin: 10
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
