import React, {Component} from 'react';
import {
  View, Text,Dimensions,
  StyleSheet, TouchableOpacity,
  Image, FlatList, ScrollView,
  RefreshControl
} from 'react-native';
import {connect} from 'react-redux';

import ProductListView2 from '../views/ProductListView2';
import ProductListView1 from '../views/ProductListView1';
import Filter from '../views/Filter';
import Favorite from './Favorite';
import url from '../config/handle';

const {width, height} = Dimensions.get('window');

class ProductList extends Component{
  constructor(props){
    super(props);
    this.state ={
      array: [],
      page: 1,
      refreshing: false,
      selectView: true,

    }
  }

  componentDidMount(){
    fetch(url.category)
    .then(res => res.json())
    .then((resJSON) => {
      const {product} = resJSON;

      this.props.dispatch({
        type: 'TYPEPRODUCT',
        dataSource: product
      });

    })
    .catch(
      (e) => { console.log(e)}
    );  
  }

  //set hien thi view 1
  view1(){
    this.setState({
      selectView: true,
    });
  };
  //set hien thi view 2
  view2(){
    this.setState({selectView: false});
  };

  render(){
    const {goBack} =this.props.navigation;
    const {productType} = this.props.navigation.state.params;
    const {navigation} = this.props;
    const {
      container,body, header, productStyles, imgStyles,
      leftStyles, rightStyles, textStyles
    } = styles;

    //goi den list view 1
    const listview1 = (
      <ProductListView1 navigation={navigation}/>
    )
    //goi den list view 2
    const listview2 = (
      <ProductListView2 navigation={navigation}/>
    )
    //goi bộ lọc filter
    const filter =() => {
      <Filter />
    }
    //ham điều kiện: true hiện th view 1, false hiển thị view 2;
    const mainList = this.state.selectView ? listview1 : listview2 ;

    return(
      <View style={container}>
        <View style={header}>
          <TouchableOpacity onPress = {() => goBack()}>
            <Image
              style={{width:20, height: 20}}
              source ={require('../media/appIcon/back.png')}
            />
          </TouchableOpacity>
          <Text style={{color: '#34B089'}}>{productType.name}</Text>
          <Text />
        </View>

        <View style={body}>
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity  onPress={this.view1.bind(this)}>
              <Text style={textStyles}>View1</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={this.view2.bind(this)}>
              <Text style={textStyles}>View2</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => filter()}>
            <Text>Filter</Text>
          </TouchableOpacity>
        </View>

        {mainList}

      </View>
    );
  }
}
function mapStateToProps(state){
  return {
    dataSource: state.dataSource,
  };
}

export default connect(mapStateToProps)(ProductList);


const productWidth = (width - 60)/2;
const productHeight = productWidth;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#AFAEAF'
  },
  header:{
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10
  },
  body:{
    flexDirection: 'row',
    justifyContent:'space-between',
    margin: 10
  },
  productContainer: {
    width: productWidth,
    marginBottom: 10,
    borderBottomWidth:1,
    borderColor: '#AFAEAF',
  },
  productName: {
    paddingLeft: 10,
    fontWeight: '500',
    color: '#d3d3cf',
    marginVertical:5
  },
  productPrice: {
    paddingLeft: 10,
    marginBottom:5,
    color: '#662f90'
  },
  imgStyles: {
    width: productWidth,
    height: productHeight
  }
})
