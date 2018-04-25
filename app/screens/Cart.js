import React, { Component } from 'react';
import {
  StyleSheet, Text, Alert, View,
  Image,  TouchableOpacity,  ScrollView
} from 'react-native';
import {connect} from 'react-redux';

import ProductDetail from './ProductDetail';

class Cart extends Component {
  alertPay(){
    Alert.alert(
        'Notice',
        'Please choise payment method',
        [
          { text: 'Direct'},
          {text: 'Paypal'}
        ],
        { cancelable: false }
    )
  }
  deleteProduct(){
    Alert.alert(
        'Notice',
        'Are you sure delete',
        [
          {text: 'No'},
          {text: 'Yes'}
        ],
        { cancelable: false }
    )
  }

  // incrQuantity(id) {
  //     global.incrQuantity(id);
  // }
  // decrQuantity(id) {
  //     global.decrQuantity(id);
  // }
  // removeProduct(id) {
  //     global.removeProduct(id);
  // }
  // async onSendOrder() {
  //   try {
  //     const token = await getToken();
  //     const arrayDetail = this.props.cartArray.map(e => ({
  //         id: e.product.id,
  //         quantity: e.quantity
  //     }));
  //     const kq = await sendOrder(token, arrayDetail);
  //     if (kq === 'THEM_THANH_CONG') {
  //         console.log('THEM THANH CONG');
  //     } else {
  //         console.log('THEM THAT BAI', kq);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  render() {
    const {navigation, cartArray} = this.props;
    const {
      productStyles, leftStyles, imgStyles,
      rightStyles, container, bottomStyles,
      deleteStyles, topStyles, txtTopStyles
    } = styles;

    return (
      <View style={container}>
        <View style={topStyles}>
          <Text style={txtTopStyles}>TOTAL ORDER:  </Text>
          <TouchableOpacity onPress={()=> this.alertPay()}>
            <Text style={txtTopStyles}>PAY</Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          {
            cartArray.map(product => (
              <View style={productStyles} key={product.id}>
                <View style={leftStyles}>
                  <Image
                    style={imgStyles}
                    source={require('../media/temp/sp1.jpg')}
                  />
                </View>
                <View style={bottomStyles}>
                  <Text style={{fontSize: 18, color:'#34B089'}}>{product.name.toUpperCase()}</Text>
                  <Text style={{color: '#AFAEAF'}}>SIZE: </Text>
                  <Text style={{color: '#AFAEAF'}}>AMOUNT: </Text>
                  <Text style={{color: '#AFAEAF'}}>PRICE: {product.price}</Text>
                  <Text style={{color: '#AFAEAF'}}>TOTAL: </Text>
                  <Text style={{color: '#AFAEAF'}}></Text>
                  <TouchableOpacity onPress={()=> navigation.navigate('ProductDetail')}>
                    <Text style={{color: '#aab034'}}>Show Details</Text>
                  </TouchableOpacity>
                </View>
                <View style={rightStyles}>
                  <TouchableOpacity onPress={()=> this.deleteProduct()}>
                    <Image
                      style={deleteStyles}
                      source = {require ('../media/appIcon/delete.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          }
        </ScrollView>
      </View>
    );
  }
}
function mapStateToProps(state){
  return{
    cartArray: state.cartArray
  }
}
export default connect(mapStateToProps)(Cart);

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#DBDBD8'
  },
  productStyles:{
    flex: 1,
    backgroundColor: '#fff',
    padding:10,
    borderColor: '#AFAEAF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    marginBottom: 0
  },
  leftStyles:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomStyles:{
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  topStyles:{
    flexDirection: 'row',
    backgroundColor:'#fff',
    justifyContent:'space-between',
    alignItems:'center',
    padding: 10
  },
  txtTopStyles:{
    color: '#34B089'
  },
  rightStyles:{
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-end'
  },
  imgStyles:{
    width: 100,
    height: 100
  },
  deleteStyles:{
    width: 14,
    height: 14
  }
});
