import React, { Component } from 'react';
import {
  StyleSheet, Text, Alert, View, Linking,
  Image, TouchableOpacity, ScrollView
} from 'react-native';
import { connect } from 'react-redux';

import global from '../../app/global';
import url from '../config/handle';
import sendOrder from '../api/sendOrder';
import getToken from '../api/getToken';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: []
    };
  };

  alertPay() {
    Alert.alert(
      'Notice',
      'Please choise payment method',
      [
        { text: 'Direct' },
        { text: 'Paypal' }
      ],
      { cancelable: false }
    )
  }
  deleteProduct() {
    Alert.alert(
      'Notice',
      'Are you sure delete',
      [
        { text: 'No' },
        { text: 'Yes' }
      ],
      { cancelable: false }
    )
  }

  removeProduct(id) {
    global.removeProduct(id)

  }

  async onSendOrder() {
    try {
      const token = await getToken();
      const arrayDetail = this.props.cartArray.map(e => ({
        id: e.id,
        // quantity: e.quantity
      }));
      const kq = await sendOrder(token, arrayDetail);
      if (kq === 'THEM_THANH_CONG') {
        Alert.alert(
          'Notice',
          'Sucessfully',
          [
            { text: 'Cancel' }
          ],
          { cancelable: false }
        )
      } else {
        console.log('THEM THAT BAI', kq);
        Alert.alert(
          'Notice',
          'Fail',
          [
            { text: 'Cancel' }
          ],
          { cancelable: false }
        )
      }
    } catch (e) {
      console.log(e);
    }
  }

  // getArraySummation(someArray) {
  //   let sum = someArray.reduce((sum, x) => sum + x);
  //   return sum;
  // }

  //gọi đường dẫn đến paypal 
  linkPressed(url) {
    Linking.openURL(url);
  }

  render() {
    const { navigation, cartArray } = this.props;
    const {
      productStyles, leftStyles, imgStyles,
      rightStyles, container, bottomStyles, numberOfProduct,
      deleteStyles, topStyles, txtTopStyles, productController
    } = styles;

    const arrTotal = cartArray.map(e => parseInt(e.price));

    // const total =  arrTotal.length? this.getArraySummation(arrTotal) :0;
    const total = arrTotal.length ? arrTotal.reduce((a, b) => a + b) : 0;

    return (
      <View style={container}>
        <View style={topStyles}>
          <Text style={txtTopStyles}>TOTAL ORDER:    {total}$</Text>
          <TouchableOpacity onPress={this.onSendOrder.bind(this)}>
            <Text style={txtTopStyles}>PAY</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.linkPressed('https://www.paypal.me/Hoang26')}>
            <Text style={txtTopStyles}>PayPal</Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          {
            cartArray.map(product => (
              <View style={productStyles} key={product.id}>
                <View style={leftStyles}>
                  <Image
                    style={imgStyles}
                    source={{ uri: url.product + product.images[0] }}
                  />
                </View>
                <View style={bottomStyles}>
                  <Text style={{ fontSize: 18, color: '#34B089' }}>{product.name.toUpperCase()}</Text>
                  <Text style={{ color: '#AFAEAF' }}>SIZE: </Text>
                  <Text style={{ color: '#AFAEAF' }}>PRICE: {product.price}</Text>
                  <Text style={{ color: '#AFAEAF' }}>TOTAL: </Text>
                  <Text style={{ color: '#AFAEAF' }}></Text>
                  <View style={productController}>
                  </View>
                  <TouchableOpacity onPress={() => {
                    navigation.navigate({
                      routeName: 'CartDetail',
                      params: {
                        data: product
                      }
                    })
                  }}>
                    <Text style={{ color: '#aab034' }}>Show Details</Text>
                  </TouchableOpacity>
                </View>
                <View style={rightStyles}>
                  <TouchableOpacity onPress={() => this.removeProduct(product.id)}>
                    <Image
                      style={deleteStyles}
                      source={require('../media/appIcon/delete.png')}
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
function mapStateToProps(state) {
  return {
    cartArray: state.cartArray,
    quantity: state.quantity
  };
}
export default connect(mapStateToProps)(Cart);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DBDBD8'
  },
  productStyles: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderColor: '#AFAEAF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    marginBottom: 0
  },
  leftStyles: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomStyles: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  productController: {
    flexDirection: 'row'
  },
  numberOfProduct: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  topStyles: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
  },
  txtTopStyles: {
    color: '#34B089'
  },
  rightStyles: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-end'
  },
  imgStyles: {
    width: 100,
    height: 100
  },
  deleteStyles: {
    width: 14,
    height: 14
  }
});
