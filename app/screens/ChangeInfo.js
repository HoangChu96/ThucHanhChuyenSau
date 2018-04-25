import React, { Component } from 'react';
import {
  StyleSheet,  Text,  View,  Image,
  Dimensions,  TextInput,  TouchableOpacity
} from 'react-native';

import {StackNavigator} from 'react-navigation';

const {height} = Dimensions.get('window');

export default class ChangeInfo extends Component{
  render(){
    const {navigation} = this.props;
    const {goBack} = this.props.navigation;
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
            />
            <TextInput
              style={inputStyle}
              placeholder='Enter Your Address'
            />
            <TextInput
              style={inputStyle}
              placeholder='Enter Your Phone Number'
            />
            <TouchableOpacity style={btnInputStyle}>
              <Text style={btnText}>CHANGE YOUR INFOMATION</Text>
            </TouchableOpacity>
        </View>

        <View />
      </View>
    )
  }
}

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
