import React, { Component, PureComponent } from 'react';
import {
  Text, View, StyleSheet, Image, TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';

import url from '../config/handle';
import TabNavigator from 'react-native-tab-navigator';
import getCart from '../api/getCart';
import Cart from './Cart';
import Contact from './Contact';
import ProductNavigator from '../navigations/ProductNavigator';
import Category from './Category';
import Favorite from './Favorite';
import Header from '../components/Header/Header';

class Main extends PureComponent{
  constructor(props){
    super(props);
    this.state = {
      selectedTab:'home'
    };
  }

  async componentDidMount(){
    fetch(url.index)
    .then(res => res.json())
    .then((resJSON) => {
      const {type, product} = resJSON;
      this.props.dispatch({
        type: 'TYPES',
        types: type,
        topProducts: product,

      });
    })
    .catch(
      (e) => { console.log(e)}
    );
    const list = await getCart(); 
    console.log(list);
  }

  openMenu(){
    const {open} = this.props;
    open();
  }

  render(){
    const {navigation, cartArray} = this.props;
    return (
      <View style={{flex:1}}>
        <Header onOpen={this.openMenu.bind(this)}/>

        <TabNavigator>
          <TabNavigator.Item
            style={styles.wapper}
            selected={this.state.selectedTab === 'home'}
            title="Home"
            selectedTitleStyle={{color: '#34B089'}}
            renderIcon = {() => <Image source = {require('../media/appIcon/home0.png')} style={styles.tabStyles} />}
            renderSelectedIcon = { () => <Image source = {require('../media/appIcon/home.png')} style={styles.tabStyles}/>}
            onPress={() => this.setState({ selectedTab: 'home' })}
          >
            <ProductNavigator />
          </TabNavigator.Item>

          <TabNavigator.Item
            style={styles.wapper}
            selected={this.state.selectedTab === 'category'}
            title="Category"
            selectedTitleStyle={{color: '#34B089'}}
            renderIcon = {() => <Image source = {require('../media/appIcon/category0.png')} style={styles.tabStyles} />}
            renderSelectedIcon = { () => <Image source = {require('../media/appIcon/category.png')} style={styles.tabStyles}/>}
            onPress={() => this.setState({ selectedTab: 'category' })}
          >
            <Category />
          </TabNavigator.Item>

          <TabNavigator.Item
            style={styles.wapper}
            selected={this.state.selectedTab === 'favorite'}
            title="favorite"
            selectedTitleStyle={{color: '#34B089'}}
            renderIcon = {() => <Image source = {require('../media/appIcon/favorite0.png')} style={styles.tabStyles} />}
            renderSelectedIcon = { () => <Image source = {require('../media/appIcon/favorite.png')} style={styles.tabStyles}/>}
            onPress={() => this.setState({ selectedTab: 'favorite' })}
          >
            <Favorite />
          </TabNavigator.Item>

          <TabNavigator.Item
            style={styles.wapper}
            badgeText={cartArray.length}
            selected={this.state.selectedTab === 'cart'}
            title="Cart"
            selectedTitleStyle={{color: '#34B089'}}
            renderIcon = {() => <Image source = {require('../media/appIcon/cart00.png')} style={styles.tabStyles} />}
            renderSelectedIcon = { () => <Image source = {require('../media/appIcon/cart0.png')} style={styles.tabStyles}/>}
            onPress={() => this.setState({ selectedTab: 'cart' })}
          >
            <Cart />
          </TabNavigator.Item>

          <TabNavigator.Item
            style={styles.wapper}
            selected={this.state.selectedTab === 'contact'}
            title="Contact"
            selectedTitleStyle={{color: '#34B089'}}
            renderIcon = {() => <Image source = {require('../media/appIcon/contact0.png')} style={styles.tabStyles} />}
            renderSelectedIcon = { () => <Image source = {require('../media/appIcon/contact.png')} style={styles.tabStyles}/>}
            onPress={() => this.setState({ selectedTab: 'contact' })}
          >
            <Contact />
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    )
  }
}

function mapStateToProps(state){
  return {
    types: state.types,
    topProducts: state.topProducts,
    cartArray: state.cartArray
  };
}

export default connect(mapStateToProps)(Main);

const styles= StyleSheet.create({
  wapper:{
    justifyContent:'center',
    alignItems:'center'
  },
  tabStyles: {
    width: 25,
    height:25
  }
})
