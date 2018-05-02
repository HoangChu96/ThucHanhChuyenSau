import React, {Component} from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import Drawer from 'react-native-drawer';

import Main from './screens/Main';
import Menu from './components/Header/Menu.js';
import checkLogin from './api/checkLogin';
import getToken from './api/getToken';
import global from './global';

class MainApp extends Component{

  componentDidMount() {
    const {onSignIn} = this.props;
    getToken()
    .then(token => checkLogin(token))
    // .then(res => {this.props.dispatch({
    //       type: 'SIGNIN',
    //       onSignIn: res.user
    //     })
    // })
    .then(res => {global.onSignIn(res.user)})
    .catch(err => console.log(err));
  };

  closeControlPanel = () => {
    this.drawer.close()
  };
  openControlPanel = () => {
    this.drawer.open()
  };

  render(){
    const { navigation } = this.props;
    return (
      <Drawer
        ref= {(ref) => this.drawer = ref}
        type="overlay"
        content = {
           <Menu navigation={navigation} />
        }
        tapToClose={true}
        openDrawerOffset={0.4} //còn lại 20% về phía bên phải
        panCloseMask={0.2}
        closeDrawerOffset={-3}
        styles={drawerStyles}

        //giảm opacity của màn hình chính sau khi mở sidemenu
        tweenHandler={(ratio) => ({
          main: { opacity:(2-ratio)/2 }
        })}
      >
          <Main open={this.openControlPanel.bind(this)}/>
      </Drawer>
    )
  }
}

function mapPropsToState (state) {
  return {
    onSignIn: state.onSignIn
  }
}

export default connect()(MainApp);

const drawerStyles={
  drawer: {
    shadowColor:'#000000',
    shadowOpacity: 0.8,
    shadowRadius: 3
  }
}
