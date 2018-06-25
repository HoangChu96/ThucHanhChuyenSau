import React, { Component } from 'react';
import {
  ScrollView
} from 'react-native';
import HightLightProduct from '../views/HightLightProduct';
import SaleProduct from '../views/SaleProduct';
import TopCategory from '../views/TopCategory';

export default class Home extends Component{
  render(){
    const {navigation} = this.props;
    return (
      <ScrollView style={{flex:1, backgroundColor: '#DBDBD8'}}>

        <TopCategory navigation = {navigation} />
        <SaleProduct navigation={navigation}/>
        <HightLightProduct navigation={navigation}/>

      </ScrollView>
    )
  }
}
