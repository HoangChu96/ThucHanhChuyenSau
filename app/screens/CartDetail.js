import React, {Component} from 'react';
import {
  View, Text,Dimensions,
  StyleSheet, TouchableOpacity,
  Image, FlatList, ScrollView,
  RefreshControl, Alert
} from 'react-native';
import global from '../global';
import url from '../config/handle';

const {width, height} =Dimensions.get('window')

class CartDetail extends Component{
  constructor(props){
    super(props);
    this.state = {
      cart: []
    }
  }

  render(){
    const {navigation} = this.props;
    const {data} = this.props.navigation.state.params;
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
        </View>

        <ScrollView style={wrapper}>
          <View style={productStyles}>
            <ScrollView style={leftStyles} horizontal>
              <Image
                style={styles.imgStyles}
                source={{ uri: url.product + data.images[0] }}
              />
              <Image
                style={styles.imgStyles}
                source={{ uri: url.product + data.images[1] }}
              />

            </ScrollView>
            <View style={productStyles}>
              <Text style={{fontSize: 18, color:'#34B089'}}>{data.name.toUpperCase()}</Text>
              <Text style={{color: 'purple'}}>PRICE: {data.price}$</Text>
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
            <Text style={{marginBottom: 10}}>{data.description}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default CartDetail;

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
