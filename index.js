import React, {Component} from 'react';
import {

} from 'react-native';
import { AppRegistry } from 'react-native';
import App from './App';
import Splash from './app/screens/Splash';
import Payments from './app/views/payments';

class Begin extends Component {
	constructor(props){
		super(props);
		this.state = {
			currentScreen: 'Splash'
		};
		setTimeout( () => {
			this.setState({currentScreen: 'payments'})
		}, 2500);
		// global.PaymentRequest = require('react-native-payments').PaymentRequest;
	}
	render(){
		const {currentScreen} = this.state;
		let BeginScreen = currentScreen === 'Splash' ? <Splash /> : <App />

		return BeginScreen;
	}
}

AppRegistry.registerComponent('ShopSportShoes', () => Begin);