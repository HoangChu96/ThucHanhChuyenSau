import React, { Component } from 'react';
import {
  StyleSheet, Text,  View,  Image, TextInput, Dimensions,
  TouchableOpacity, KeyboardAvoidingView,  AsyncStorage
} from 'react-native';
import {  StackNavigator } from 'react-navigation';

import SignIn from '../components/Author/SignIn';
import SignUp from '../components/Author/SignUp';

const {height} = Dimensions.get('window');

export default class Authentication extends Component{
  constructor(props){
    super(props);
    this.state = {isLognIn: true};
  }
  signIn(){
    this.setState({isLognIn:true});
  }
  signUp(){
    this.setState({isLognIn:false});
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Authenticaton',
  });

  render(){
    const {
      wrapper, row1,iconStyle, titleStyle,
      inputStyle, btnInputStyle, btnText,
      btnContainer, btnSignIn, btnSignUp,
      isSignInStyle, signInStyle, text
    }= styles;
    const {navigation} = this.props;
    const {goBack} = this.props.navigation;

    const mainJSX = this.state.isLognIn ? <SignIn goBack= {goBack} /> : <SignUp gotoSignIn={this.signIn.bind(this)} />;

    const {isLognIn}= this.state;

    return (
      <View style={styles.wrapper}>
          <View style={styles.row1}>
              <TouchableOpacity onPress={()=> goBack()}>
                <Image
                  style={styles.iconStyle}
                  source={require('../media/appIcon/back_white.png')}
                />
              </TouchableOpacity>

              <Text style={styles.titleStyle}>User</Text>

              <View>
              </View>
          </View>

          {mainJSX}

          <View style={btnContainer}>
              <TouchableOpacity style={btnSignIn} onPress = {this.signIn.bind(this)}>
                <Text style={isLognIn ? isSignInStyle : signInStyle}>SIGN IN</Text>
              </TouchableOpacity>
              <TouchableOpacity style={btnSignUp} onPress = {this.signUp.bind(this)}>
                <Text style={!isLognIn ? isSignInStyle : signInStyle}>SIGN UP</Text>
              </TouchableOpacity>
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor:'#34B089',
    flex:1,
    padding: 20,
    justifyContent:'space-between'
  },
  row1:{
    flexDirection:'row',
    justifyContent:'space-between',

  },
  titleStyle: {
    color:'#fff',
    fontSize: 20
  },
  iconStyle: {
    width: 25,
    height: 25
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
  btnText: {
    color: '#fff',
  },
  text:{
    justifyContent: 'center',
    alignItems: 'center',
    margin:10
  },
  btnContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch'
  },
  btnSignIn: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    marginRight:1
  },
  btnSignUp: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    marginLeft:1
  },
  isSignInStyle: {
    color: '#34B089'
  },
  signInstyle: {

  }
})
