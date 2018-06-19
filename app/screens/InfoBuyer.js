import React, { Component } from 'react';
import {
  StyleSheet,  Text,  View,  Image, Alert,
  Dimensions,  TextInput,  TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';

import sendOrder from '../api/sendOrder';
import getToken from '../api/getToken';
import changeInfo from '../api/change_info';

const {height} = Dimensions.get('window');

class InfoBuyer extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: '' , 
      address:'' , 
      phone: ''
    };
  }

  async onSendOrder() {
    try {
      const token = await getToken();
      const arrayDetail = this.props.cartArray.map(e => ({
        id: e.id
      }));
      const kq = await sendOrder(token, arrayDetail);
      const { name, address, phone } = this.state;
      getToken()
      .then(token => changeInfo(token, name, phone, address))
      .then(e => this.setState({name: '', address: '', phone: ''}))
      .catch(err => console.log(err));

      if (kq === 'THEM_THANH_CONG') {
        Alert.alert(
          'Notice',
          'Sucessfully',
          [
            { text: 'Cancel' }
          ],
          { cancelable: false }
        )
      } else {
        console.log('THEM THAT BAI', kq);
        Alert.alert(
          'Notice',
          'Fail',
          [
            { text: 'Cancel' }
          ],
          { cancelable: false }
        )
      }
    } catch (e) {
      console.log(e);
    }
  }

  render(){
    const {goBack} = this.props.navigation;
  //  const { name, address, phone } = this.props.navigation.state.params;
    const { phone, address, name} = this.state;
    const { wrapper, body, row1, txtTitle, iconStyle, inputStyle, btnInputStyle, btnText, container} = styles;

    return (
      <View style={body}>
          <View style={wrapper} >
            <TouchableOpacity onPress={() => goBack()}>
              <Image
                style={iconStyle}
                source={require('../media/appIcon/back.png')}
              />
            </TouchableOpacity>
            <Text style={txtTitle} >Please enter your purchase information</Text>
            <Text />
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
            <TouchableOpacity style={btnInputStyle} onPress={() => this.onSendOrder()} >
              <Text style={btnText}>Purchase</Text>
            </TouchableOpacity>
        </View>

        <View />
      </View>
    )
  }
}
function mapStateToProps(state) {
  return {
    cartArray: state.cartArray
  };
}

export default connect(mapStateToProps)(InfoBuyer);

const styles = StyleSheet.create({
  body:{
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: 5
  },
  wrapper: {
    height: height/15,
    // backgroundColor:'#34B589',
    padding: 5,
    flexDirection: 'row',
    justifyContent:'space-around',
    borderBottomWidth: 1,
    borderColor: "#34B589"
  },
  row1:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  txtTitle:{
    color: '#34B589',
    fontSize: 14,
    marginTop: 5
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
