import React, {Component} from 'react';
import {
  View, Text,Dimensions, Picker,
  StyleSheet, TouchableOpacity,Image, ScrollView, Alert
} from 'react-native';

import {connect} from 'react-redux';
import url from '../config/handle';
import saveCart from '../api/saveCart';

const {width} =Dimensions.get('window')

class ProductDetail extends Component{
  constructor(props){
    super(props);
    this.state = {
      cart: [],
      isLognIn: true,
      user: null,
    }
  }

  addThisProductToCart() {
    const { product } = this.props.navigation.state.params;
    const {cartArray} = this.props;
    
    // if(this.props.isLogedIn === true){
      if(cartArray.some(e => (e.id) === product.id)) {
        Alert.alert(
          'Notice',
          'Product already exists',
          [
            {text: 'OK'}
          ],
          {cancelable: false}
        )
        return false;
      }
      else{
        this.props.dispatch(
          {
            type: 'ADD_CART',
            cartArray: product
          }
        );
        saveCart([
          ...cartArray,
          product
        ]);
      }
      
    }

  render(){
    const {navigation} = this.props;
    const {product} = this.props.navigation.state.params;
    const {goBack} = this.props.navigation;
    const {
      container, header, productStyles, bottomRow1Style,
      wrapper, addToCart, sizeStyle, leftStyles, txtBottom, btnText, bottomStyle
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
            <ScrollView style={leftStyles} horizontal>
              <Image
                style={styles.imgStyles}
                source={{ uri: url.product + product.images[0] }}
              />
              <Image
                style={styles.imgStyles}
                source={{ uri: url.product + product.images[1] }}
              />
            </ScrollView>

            <View style={productStyles}>
              <Text style={{fontSize: 18, color:'#34B089'}}>{product.name.toUpperCase()}</Text>
              <Text style={{color: 'black'}}>PRICE: {product.price}$</Text>
              <View style={sizeStyle}>
                <Text style={{color: 'black'}} >SIZE:</Text>
                <Picker
                  style={{ width: 100 }}
                  selectedValue={this.state.size}
                  onValueChange={(itemValue, itemIndex) => this.setState({size: itemValue}) } >
                  <Picker.Item label="Select size" value="cancel" />
                  <Picker.Item label="38" value="38" />
                  <Picker.Item label="39" value="39" />
                  <Picker.Item label="40" value="40" />
                  <Picker.Item label="41" value="41" />
                  <Picker.Item label="42" value="42" />
                  <Picker.Item label="43" value="43" />
                </Picker>
              </View>
            </View>
          </View>
          <View style={bottomStyle}>
            <View style={bottomRow1Style}>
                <Text style={txtBottom}>Description</Text>
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
    quantity: state.quantity,
    isLogedIn: state.isLogedIn
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
    // justifyContent: 'center',
    // alignItems: 'center',
    flexDirection: 'row',
    height: productHeight
  },
  rightStyles:{
    justifyContent: 'space-between'
  },
  imgStyles:{
    width: productWidth,
   height: productHeight
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
  sizeStyle:{
    flexDirection: 'column'
  },
  bottomStyle:{
    marginVertical: 10
  },
  bottomRow1Style:{
    flexDirection: 'row',
    marginBottom: 10
  },
  txtBottom:{
    borderColor: '#34B089',
    borderBottomWidth:1,
    padding: 5,
    fontSize: 18,
    fontWeight: 'bold'
  }

})
