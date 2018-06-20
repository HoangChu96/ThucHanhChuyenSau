import React, { Component } from 'react';
import {
  StyleSheet,  Text,  View,  Image, Alert,
  Dimensions,  TextInput,  TouchableOpacity
} from 'react-native';

import changeInfo from '../api/change_info';
import getToken from '../api/getToken';
const {height} = Dimensions.get('window');

class ChangeInfo extends Component{
  constructor(props){
    super(props);
    const { name, address, phone } = this.props.navigation.state.params;
    this.state = {
      name: name, 
      address: address, 
      phone: phone
    }
  }

  onSuccess() {
    const {navigation} = this.props;
    Alert.alert(
      'Notice',
      'Change Info successfully',
      [
        { 
          text: 'OK',
          // onPress: () => navigation.navigate({
          //   routeName: 'Main'
          // })
        }
      ],
      { cancelable: false }
    );
  }

    onFail() {
      Alert.alert(
        'Notice',
        'Error',
        [
          { text: 'OK'}
        ],
        { cancelable: false }
      );
    }


  changeInfoUser() {
    const { name, address, phone } = this.state;
    getToken()
    .then(token => changeInfo(token, name, phone, address))
    .then(user => this.onSuccess(user))
    .catch(err => console.log(err));
  }

  render(){
    const {goBack} = this.props.navigation;
    const { name, address, phone } = this.props.navigation.state.params;
    // const { phone, address, name} = this.state;
    const { wrapper, body, row1, titleStyle, iconStyle, inputStyle, btnInputStyle, btnText, container} = styles;

    return (
      <View style={body}>
        <View style={wrapper}>
          <View style={row1}>
            <View />
            <Text style={titleStyle}>User Infomation</Text>
            <TouchableOpacity onPress={() => goBack()}>
              <Image
                style={iconStyle}
                source={require('../media/appIcon/backs.png')}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={container}>
            <TextInput
              style={inputStyle}
              placeholder='Enter Your Name'
              value={name}
              onChangeText = {text => this.setState({...this.state, name: text})}
            />
            <TextInput
              style={inputStyle}
              placeholder='Enter Your Address'
              value={address}
              onChangeText= {text => this.setState({...this.state, address: text})}
            />
            <TextInput
              style={inputStyle}
              placeholder='Enter Your Phone Number'
              value={phone}
              onChangeText={text => this.setState({...this.state, phone:text})}
            />
            <TouchableOpacity style={btnInputStyle} onPress= {this.changeInfoUser.bind(this)} >
              <Text style={btnText}>CHANGE YOUR INFOMATION</Text>
            </TouchableOpacity>
        </View>

        <View />
      </View>
    )
  }
}

export default ChangeInfo;

const styles = StyleSheet.create({
  body:{
    flex: 1,
    justifyContent: 'space-between'
  },
  wrapper: {
    height: height/10,
    backgroundColor:'#34B589',
    padding:10,
    justifyContent:'space-around'
  },
  row1:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  titleStyle: {
    color:'#fff',
    fontSize: 20,
  },
  iconStyle: {
    width: 25,
    height: 25
  },
  container:{
    padding:10,
    margin: 10
  },
  inputStyle: {
    backgroundColor:'#fff',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#34B589',
    borderRadius: 10
  },
  btnInputStyle: {
    backgroundColor: '#34B589',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height:50
  },
  btnText: {
    color: '#fff'
  }
})
