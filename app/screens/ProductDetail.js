import React, {Component} from 'react';
import {
  View, Text,Dimensions,
  StyleSheet, TouchableOpacity,
  Image, FlatList, ScrollView,
  RefreshControl
} from 'react-native';
import {connect} from 'react-redux';
import url from '../config/handle';
import saveCart from '../api/saveCart';

const {width, height} =Dimensions.get('window')

class ProductDetail extends Component{
  addThisProductToCart() {
    const { product } = this.props.navigation.state.params;
    const {cartArray} = this.props;
    this.props.dispatch({
      type: 'ADD_CART',
      product: product,
      quantity: 1
    });
    saveCart(cartArray); //callback vi ham la bat dong bo

  }

  render(){
    const {navigation} = this.props;
    const {product} = this.props.navigation.state.params;
    const {goBack} = this.props.navigation;
    const {
      container,body, header, productStyles, bottomRow1Style,
      wrapper, addToCart, imgStyles, leftStyles, txtBottom,
      rightStyles, descriptionStyle, btnText, bottomStyle
    } = styles;

    return(
      <View style={container}>
        <View style={header}>
          <TouchableOpacity onPress={() => goBack()}>
            <Image
              style={{width:20, height: 20}}
              source ={require('../media/appIcon/back.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={addToCart}
            onPress={() => this.addThisProductToCart()}
          >
            <Text style={btnText}>ADD TO CART</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={wrapper}>
          <View style={productStyles}>
            <View style={leftStyles}>
              <Image
                style={imgStyles}
                source={{uri: url.index + product.images}}
              />
            </View>
            <View style={productStyles}>
              <Text style={{fontSize: 18, color:'#34B089'}}>{product.name.toUpperCase()}</Text>
              <Text style={{color: 'purple'}}>PRICE: {product.price}$</Text>
              <Text>STATUS: </Text>
              <Text>SIZE</Text>
            </View>
          </View>
          <View style={bottomStyle}>
            <View style={bottomRow1Style}>
              <TouchableOpacity>
                <Text style={txtBottom}>Description</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={txtBottom}>Size Guide</Text>
              </TouchableOpacity>
            </View>
            <Text style={{marginBottom: 10}}>{product.description}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
function mapStateToProps(state){
  return{
    cartArray: state.cartArray,
    quantity: state.quantity
  }
}
export default connect(mapStateToProps)(ProductDetail);

const productWidth = width - 20;
const productHeight = productWidth;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#AFAEAF',
  },
  header:{
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
  },
  body:{
    margin: 10,
    backgroundColor: '#fff',
    padding:10
  },
  wrapper:{
    borderTopWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#AFAEAF',
    padding: 10
  },
  title:{
    flexDirection: 'row',
    padding:20,
    margin : 10,
    borderBottomWidth: 1,
    borderColor: '#c3c1c1'
  },
  materialColor:{
    margin:10,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  textMaterialColor:{
    color: '#d74a67',
  },
  leftStyles:{
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightStyles:{
    justifyContent: 'space-between'
  },
  imgStyles:{
    width: productWidth,
  //  height: productHeight
  },
  addToCart:{
    backgroundColor:'white'
  },
  btnText: {
    fontSize: 13,
    color: '#34B089'
  },
  productStyles:{

  },
  bottomStyle:{
    borderColor: 'gray',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    marginVertical: 10
  },
  bottomRow1Style:{
    flexDirection: 'row'
  },
  txtBottom:{
    borderColor: '#34B089',
    borderRightWidth: 1,
    borderBottomWidth:1,
    padding: 5
  }

})
