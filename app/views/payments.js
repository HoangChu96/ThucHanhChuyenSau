import React, {Component} from 'react';
import {
  View, Text, TouchableOpacity
} from 'react-native';

import { ApplePayButton, PaymentRequest } from 'react-native-payments';

global.PaymentRequest = require('react-native-payments').PaymentRequest;
  
class Payments extends Component {
    constructor(props){
        super(props);
      }
    
      showPaymentSheet(){
        const ANDROID_PAY = 'https://dashboard.stripe.com/test/dashboard';
        const METHOD_DATA = [
          {

            supportedMethods: [ ANDROID_PAY ],
              data: {
                merchantId: '02510116604241796260',
                environment: 'TEST',
                allowedCardNetwork: [ 'AMEX', 'MASTERCARD', 'VISA', 'DISCOVER' ],
                paymentMethodTokenizationParameters: {
                  tokenizationType: 'GATEWAY_TOKEN',
                  parameters: {
                    'gateway': 'stripe',
                    'stripe:publishableKey': 'pk_test_wAcHUr6ypK7lR4xA2QdslcJO',
                  
                  }
                }
              }
          }
        ];
        
        // const METHOD_DATA = [{
        //   supportedMethods: ['android-pay'],
        //   data: {
        //     supportedNetworks: ['visa', 'mastercard', 'amex'],
        //     currencyCode: 'USD',
        //     environment: 'TEST', // defaults to production
        //     paymentMethodTokenizationParameters: {
        //       tokenizationType: 'NETWORK_TOKEN',
        //       parameters: {
        //         publicKey: 'pk_test_wAcHUr6ypK7lR4xA2QdslcJO'
        //       }
        //     }
        //   }
        // }];


        const DETAILS = {
          id: 'dp_1CcW3ZDm1EugNrlXKNk6dszK',
          displayItems: [
            {
              label: 'Movie Ticket',
              amount: { currency: 'USD', value: '15.00' },
            },
          ],
          total: {
            label: 'Merchant Name',
            amount: { currency: 'USD', value: '15.00' },
          },
        };
      
        const OPTIONS = {
          requestPayerName: true,
          requestPayerPhone: true,
          requestPayerEmail: true
        };

        const pr = new PaymentRequest(METHOD_DATA, DETAILS);
        pr.show()
        .then(paymentResponse => paymentResponse.complete('success'));
      };
    
    render() {
        return(
            <View style={{ margin: 50 }}>
                <View style={{ height: 44 }}>
                    <TouchableOpacity onPress={this.showPaymentSheet}>
                        <Text>Payment</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}

export default Payments;
