import React , {Component} from 'react';
import {
  Text,  View,  TextInput, Image,
  Slider, StyleSheet,  Dimensions,
  TouchableOpacity,  KeyboardAvoidingView
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SaleProduct from '../../views/SaleProduct';
import global from '../../global';
import searchProduct from '../../api/searchProduct';
import { connect } from 'react-redux';
import url from '../../config/handle';

const { height, width } = Dimensions.get('window');

class Header extends Component{
  constructor(props){
    super(props);
    this.state = {
      selected: false,
      clickSearch: false,
      txtSearch: "",
      // value: 0
    };
  }

  clickSearch(){
    this.setState({clickSearch: !this.state.clickSearch})
  };
  //click tìm kiếm sản phẩm
  onSearch() {
      const { txtSearch } = this.state;
      // this.setState({ txtSearch: '' });
      fetch(url.searchUrl + txtSearch)
      .then(res => res.json())
      .then(resJSON => {
          const {searchPro} = resJSON;
          this.props.dispatch({
            type: 'SEARCH_PRODUCT',
            searchArray: searchPro
          });
        }
      )
      .catch(err => console.log(err));
      console.log("header");
      console.log(this.props.searchArray);
      this.setState({txtSearch: ''});
      
  }

  render(){
    const searchApp = (
      <KeyboardAwareScrollView>
        <View>
          <TextInput
              style={styles.textInput}
              placeholder="What do you want to buy?"
              underlineColorAndroid="transparent"
              value={this.state.txtSearch}
              onChangeText={text => this.setState({ txtSearch: text })}
              onFocus={() => global.gotoSearch()}
              onSubmitEditing={this.onSearch.bind(this)}
          />
          </View>
      </KeyboardAwareScrollView>
    );
    const headerApp = (
      <View style={styles.row1}>
        <TouchableOpacity onPress={this.props.onOpen}>
          <Image
            style={styles.iconStyle}
            source={require('../../media/appIcon/ic_menu.png')}
          />
        </TouchableOpacity>
        <Text style={styles.titleStyle}>SPORT SHOES</Text>
        <Text />
      </View>
    );

    const choseHeader = this.state.clickSearch ? searchApp : headerApp ;

    return(
        <View style={styles.wrapper}>

          {choseHeader}

          <View style={{justifyContent: 'space-around'}}>
            <TouchableOpacity onPress={this.clickSearch.bind(this)}>
              <Image
                style={styles.iconStyle}
                source={require('../../media/appIcon/search1.png')}
              />
            </TouchableOpacity>
          </View>

        </View>
    );
  }
}

function mapStateToProps(state){
  return{
    searchArray: state.searchArray
  };
}

export default connect(mapStateToProps)(Header);

const styles = StyleSheet.create({
  wrapper: {
    height: height/15,
    backgroundColor:'#34B089',
    padding:10,
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  row1:{
    width: width*7/8,
    flexDirection:'row',
    justifyContent: 'space-between'
  },
  textInput:{
    height: height/20,
    backgroundColor:'#fff',

    fontSize:12.5
  },
  titleStyle: {
    color:'#fff',
    fontSize: 18
  },
  iconStyle: {
    width: 20,
    height: 20
  },
  contact:{
    backgroundColor: '#94ffb3'
  }
})

// <TouchableOpacity style={{marginRight: 10}}>
//   <Image
//     style={styles.iconStyle}
//     source={require('../../media/appIcon/QRCode.png')}
//   />
// </TouchableOpacity>
