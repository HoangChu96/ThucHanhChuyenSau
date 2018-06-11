import React, {Component} from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity
} from 'react-native';
import Drawer from 'react-native-drawer';
import Filter from './Filter';
import ProductList from './../screens/ProductList';

class FilterNavigator extends Component{
  constructor(props){
    super(props);
  }

  closeControlPanel = () => {
    this.drawer.close()
  };
  openControlPanel = () => {
    this.drawer.open()
  };

  render(){
    const { navigation } = this.props;
    const {productType} = this.props.navigation.state.params;
    return (
      <Drawer
        ref= {(ref) => this.drawer = ref}
        type="overlay"
        content = {
           <Filter navigation={navigation} />
        }
        tapToClose={true}
        openDrawerOffset={0.4} //còn lại 20% về phía bên phải
        panCloseMask={0.2}
        side= 'right'
        closeDrawerOffset={-3}
        styles={drawerStyles}

        //giảm opacity của màn hình chính sau khi mở sidemenu
        tweenHandler={(ratio) => ({
          main: { opacity:(2-ratio)/2 }
        })}
      >
          <ProductList open={this.openControlPanel.bind(this)} navigation={navigation} productType= {productType} />
      </Drawer>
    )
  }
}

export default FilterNavigator;

const drawerStyles={
  drawer: {
    shadowColor:'#000000',
    shadowOpacity: 0.8,
    shadowRadius: 3
  }
}
