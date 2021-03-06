import React, { PureComponent } from 'react';
import {
  View, StyleSheet, Image
} from 'react-native';
import {connect} from 'react-redux';

import url from '../config/handle';
import global from '../global';
import TabNavigator from 'react-native-tab-navigator';
import getCart from '../api/getCart';
import Contact from './Contact';
import ProductNavigator from '../navigations/ProductNavigator';
import SearchNavigator from '../navigations/SearchNavigator';
import CartNavigator from '../navigations/CartNavigator';
import Header from '../components/Header/Header';
import SearchView from './SearchView';

class Main extends PureComponent{
  constructor(props){
    super(props);
    this.state = {
      selectedTab:'home'
    };
    global.gotoSearch = this.gotoSearch.bind(this);
    global.removeProduct = this.removeProduct.bind(this);
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

      await getCart()
      .then(e => this.props.dispatch
        ({ 
          type: 'ADD_CART',
          cartArray: e
       }));

      fetch(url.saleMain)
      .then(res => res.json())
      .then((responsive) => {
        const {sale} = responsive;
        this.props.dispatch({
          type: 'SALEPRODUCT',
          saleArray: sale
        });
      })
      .catch(
        (e) => {console.log(e)}
      );
  }

  removeProduct(productId) {
    const product = this.props.cartArray.filter(e => e.id !== productId);
    this.props.dispatch({ 
      type: 'DELETE_CART',
      cartArray: product
    });
  }

  gotoSearch() {
      this.setState({ selectedTab: 'search' });
  }
  gotoProductType(){
    this.setState({selectedTab: 'category'})
  }

  openMenu(){
    const {open} = this.props;
    open();
  }

  render(){
    const {cartArray} = this.props;
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
            selected={this.state.selectedTab === 'search'}
            title="Search"
            selectedTitleStyle={{color: '#34B089'}}
            renderIcon = {() => <Image source = {require('../media/appIcon/search0.png')} style={styles.tabStyles} />}
            renderSelectedIcon = { () => <Image source = {require('../media/appIcon/search.png')} style={styles.tabStyles}/>}
            onPress={() => this.setState({ selectedTab: 'search' })}
          >
            <SearchNavigator />
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
            <CartNavigator />
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
    cartArray: state.cartArray,
    saleArray: state.saleArray
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
