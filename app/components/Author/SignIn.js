import React, { Component } from 'react';
import {
  View, TextInput, Text, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Alert
} from 'react-native';
import {connect} from 'react-redux';

import {firebaseApp} from '../FireBaseConfig';
import signIn from '../../api/signIn';
import global from '../../global';
import saveToken from '../../api/saveToken';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

  //use firebase make login;

    // onSignIn() {
    //   const {navigation} = this.props;
    //   const { email, password } = this.state;
    //   firebaseApp.auth().signInWithEmailAndPassword(email, password)
    //   .then(
    //     Alert.alert(
    //         'Notice',
    //         'Sign up successfully',
    //         [
    //             { text: 'OK', onPress: () => navigation.navigate('MainApp') }
    //         ],
    //         { cancelable: false }
    //     ),
    //     this.props.dispatch({type: 'TOOGLE_LOGNIN'})
    //   )
    //   .catch(function(error) {
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

    onSignIn() {
      const { email, password } = this.state;
   //   const {onSignIn} = this.props;

      signIn(email, password)
          .then(res => {
            // this.props.dispatch({
            //   type: 'SIGNIN',
            //   onSignIn: res.user
            // });
            global.onSignIn(res.user);
            this.props.goBack();
            saveToken(res.token);
          })
          .catch(err =>
            console.log(err)
          );
    }

    render() {
        const {navigation} = this.props;
        const { btnText, inputStyle, btnInputStyle, text } = styles;
        const { email, password } = this.state;
        return (
          <View>
            <KeyboardAvoidingView>
              <TextInput
                style={inputStyle}
                placeholder='Enter Your Email'
                value={email}
                onChangeText={text => this.setState({ email: text })}
              />
              <TextInput
                style={inputStyle}
                placeholder='Enter Your Password'
                value={password}
                onChangeText={text => this.setState({ password: text })}
                secureTextEntry
              />
              <TouchableOpacity style={btnInputStyle} onPress = {this.onSignIn.bind(this)}>
                <Text style={btnText}>SIGN IN NOW</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>

            <View style={text}>
              <Text style={{color:'#fff'}}>OR</Text>
            </View>

            <TouchableOpacity style={btnInputStyle}>
              <Text style={btnText}>LOGIN FACEBOOK</Text>
            </TouchableOpacity>

            <View style={{flexDirection:'row',justifyContent:'center', margin:10}}>
              <Text style={btnText}>You forget Password: </Text>
              <TouchableOpacity>
                <Text style={btnText}>Forget</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
    }
}

function mapStateToProps (state) {
  return {
    onSignIn: state.onSignIn
  }
}

export default connect(mapStateToProps)(SignIn);

const styles = StyleSheet.create({
  btnText: {
    color: '#fff',
  },
  inputStyle: {
    backgroundColor:'#fff',
    marginBottom: 20,
    borderRadius: 10
  },
  btnInputStyle: {
    borderWidth:1,
    borderColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height:50
  },
  text:{
    justifyContent: 'center',
    alignItems: 'center',
    margin:10
  },
});
