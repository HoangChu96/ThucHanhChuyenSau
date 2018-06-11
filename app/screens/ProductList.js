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

    };
    console.log(this.props.productType);
  }

  componentDidMount(){
    const idType = this.props.productType.id;
    console.log(idType);
    fetch(url.category + idType)
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

  openMenu(){
    const {open} = this.props;
    open();
  }

  render(){
    const {goBack} =this.props.navigation;
    const {productType} = this.props;
    const {navigation} = this.props;
    const {
      container,body, header, productStyles, imgStyles,
      leftStyles, rightStyles, textStyles, selectView
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
          <View style={selectView}>
            <TouchableOpacity  onPress={this.view1.bind(this)}>
              <Image
                style={{width: 26.5, height: 25}}
                source = {require('../media/appIcon/list1.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity  style={{marginTop:1}} onPress={this.view2.bind(this)}>
              <Image
                  style={{width: 24.5,height:23}}
                  source = {require('../media/appIcon/list3.png')}
                />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={this.openMenu.bind(this)}>
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
    types: state.types
  };
}

export default connect(mapStateToProps)(ProductList);


const productWidth = (width - 60)/2;
const productHeight = productWidth;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#DBDBD8'
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
    margin: 10,
    marginBottom: 0,
    backgroundColor:"#fff",
    padding: 5,
    borderBottomWidth:1,
    borderColor: '#AFAEAF'
  },
  selectView:{
    flexDirection:'row'
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
