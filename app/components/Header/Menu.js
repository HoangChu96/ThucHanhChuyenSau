import React, { Component } from 'react';
import {
  Text, View, Image, StyleSheet, Alert, TouchableOpacity
} from 'react-native';
import {firebaseApp} from '../FireBaseConfig';

import StackNavigator from 'react-navigation';
import {connect} from 'react-redux';
import global from '../../global';
import saveToken from '../../api/saveToken';

class Menu extends Component{
  constructor(props){
    super(props);
    this.state = { user: null };
    global.onSignIn = this.onSignIn.bind(this);
  }

  onSignIn(user) {
      this.setState({ user });
  }

  onSignOut() {
      Alert.alert(
        'Notice',
        'Sign Out?',
        [
          { text: 'Cancel' },
          { text: 'OK',
            onPress: () => {
              this.setState({ user: null })
              saveToken('')
            }
          }
        ],
        { cancelable: false }
      )
  }

//use firebase sign out;
  // onSignOut() {
  //   const {navigation} = this.props;
  //
  //   firebaseApp.auth().signOut()
  //   .then(function() {
  //     // Sign-out successful.
  //     Alert.alert(
  //         'Notice',
  //         'Sign up successfully',
  //         [
  //             { text: 'OK', onPress: () => navigation.navigate('MainApp') }
  //         ],
  //         { cancelable: false }
  //     ),
  //     this.props.dispatch({type: 'TOOGLE_LOGNOUT'})
  //   })
  //   .catch(function(error) {
  //     // An error happened.
  //     Alert.alert(
  //         'Notice',
  //         'fail!',
  //         [
  //             { text: 'OK' }
  //         ],
  //         { cancelable: false }
  //     );
  //   });
  // }

  render(){
    const {navigation} = this.props;
    const {container, profile, btnSignIn, signIn, btnMenu, btnText, userName, body} = styles;
    const {user} = this.state;
    const logOutJSX = (
      <View style={container}>
        <TouchableOpacity style={btnSignIn} onPress={()=> navigation.navigate('Authentication')}>
            <Text style={signIn}>SIGN IN</Text>
        </TouchableOpacity>
      </View>
    );
    const logInJSX = (
      <View  style={body}>
        <Text style={userName}>{user ? user.name.toUpperCase() : ''}</Text>
        <View>
          <TouchableOpacity style={btnMenu} onPress={()=> navigation.navigate('OrderHistory')}>
              <Text style={btnText}>Order History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={btnMenu} onPress={()=> navigation.navigate('ChangeInfo')}>
              <Text style={btnText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={btnMenu} onPress={this.onSignOut.bind(this)}>
              <Text style={btnText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        <View />
        <View />
      </View>
    );

    const mainJSX = this.state.user ? logInJSX : logOutJSX;

    return (
      <View style={container}>
        <Image
          source={require('../../media/appIcon/profile.png')}
          style={profile}
        />
        {mainJSX}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#34B089',
    alignItems: 'center'
  },
  body:{
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  profile: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginVertical: 20
  },
  btnSignIn: {
    justifyContent: 'center',
    height:40,
    backgroundColor:'#fff',
    paddingHorizontal: 50,
    borderRadius: 5
  },
  signIn: {
    fontSize: 14,
    color: '#34B089'
  },
  btnMenu: {
    justifyContent: 'center',
    height:40,
    backgroundColor:'#fff',
    width: 200,
    borderRadius: 5,
    marginBottom:10,
    paddingLeft: 10
  },
  btnText: {
    fontSize: 13,
    color: '#34B089'
  },
  userName: {
    fontSize: 15,
    color: '#fff',
    marginBottom:50
  }
})

function mapStateToProps(state){
  return {
    isLogedIn: state.isLogedIn,
  };
}

export default connect(mapStateToProps)(Menu);
