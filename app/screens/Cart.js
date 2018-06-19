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
import PayPal from 'react-native-paypal-wrapper';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: []
    };
    this.onCheckOut = this.onCheckOut.bind(this);
  };
  onCheckOut(){
    const {navigation} = this.props;
    Alert.alert(
      'Notice',
      'Please choise payment method',
      [
        { 
          text: 'Direct' ,
          onPress: ()=> {navigation.navigate({ routeName: 'InfoBuyer'})}
        },
        {
          text: 'Paypal' ,
          onPress: ()=> this.paypal()
        },
        {text: 'Cancel'}
      ],
      { cancelable: true }
    )
  };

  removeProduct(id) {
    global.removeProduct(id)

  }

  async onSendOrder() {
    try {
      const token = await getToken();
      const arrayDetail = this.props.cartArray.map(e => ({
        id: e.id
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

  paypal (){
    const { cartArray } = this.props;
    const arrTotal = cartArray.map(e => parseInt(e.price));
    const total = arrTotal.length ? arrTotal.reduce((a, b) => a + b) : 0;

    PayPal.initialize(PayPal.SANDBOX, "AZo3jL5hSdGYmKnzvx6VBGGURIb2aTi9eY0L8rfUJ8cmsa5xSYuQg9bx06nLP5N6iL_B7cYo78b5GDKh");
    PayPal.pay({
      price: '' +total,
      currency: 'USD',
      description: 'Your description goes here',
    })
    .then(confirm => console.log(confirm))
    .catch(error => console.log(error));
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
      productStyles, leftStyles, imgStyles, txtCheck,
      rightStyles, container, bottomStyles, btnCheckOut, viewCheckOut,
      deleteStyles, topStyles, txtTopStyles, productController
    } = styles;

    const arrTotal = cartArray.map(e => parseInt(e.price));

    // const total =  arrTotal.length? this.getArraySummation(arrTotal) :0;
    const total = arrTotal.length ? arrTotal.reduce((a, b) => a + b) : 0;

    return (
      <View style={container}>
        <View style={topStyles}>
          <Text style={txtTopStyles}>TOTAL ORDER:    {total}$</Text>

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
        <View style={viewCheckOut}> 
          <TouchableOpacity style={btnCheckOut} onPress={this.onCheckOut.bind(this)} >
            <Text style={txtCheck} >Check Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    cartArray: state.cartArray
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
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomStyles: {
    flex: 5,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  rightStyles: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-end'
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
  viewCheckOut: {
    margin: 10,
  },
  btnCheckOut: {
    justifyContent: 'center',
    alignItems: 'center',
    // height: 50,
    backgroundColor:'#34B089',
    // width,
    borderRadius: 10
  },
  txtCheck:{
    color: '#fff',
    fontWeight: 'bold',
    padding: 10,
    fontSize: 18
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
