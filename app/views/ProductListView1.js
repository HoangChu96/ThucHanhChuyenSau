import React, { Component } from 'react';
import {
  Text, View,  Dimensions,  StyleSheet,
  Image,  TouchableOpacity,  ScrollView
} from 'react-native';
import {connect} from 'react-redux';
import url from '../config/handle';

const {width, height} = Dimensions.get('window');

class ProductListView1 extends Component{
  constructor(props){
    super(props);
    this.state = {
      selectedLike: false,
      selectedTab: false,
    };
  }

  render(){
    const {navigation, topProducts, dataSource} = this.props;

    const selectedTab = () => {
      this.setState({
        selectedTab: !this.state.selectedTab,
      })
    }
    //thay đổi state cho like;
    const selectedFavorite = () => {
      this.setState({
        selectedLike: !this.state.selectedLike,
      });
    };
    const favorite = (
        <Image
          style = {styles.imageLike}
          source = {require('../media/appIcon/favoriteFull.png')}/>
    );
    const noFavorite = (
      <Image
        style = {styles.imageLike}
        source = {require('../media/appIcon/favoriteEmty.png')}/>
    );
    const like = this.state.selectedLike ? favorite : noFavorite;

    return (
      <ScrollView>
        <View style={styles.body}>
          {
            dataSource.map(e => (
              <View style={styles.productContainer} key={e.id}>
                <TouchableOpacity onPress = {() => {
                  navigation.navigate({
                      routeName: 'ProductDetail',
                      params: {
                      product:e //truyền dữ liệu của 1 product sang detail
                    }
                  })
                }}>
                  <Image
                    style={styles.imgStyles}
                    source={{uri: url.index + e.images}}
                  />
                  <Text style={styles.productName}>{e.name.toUpperCase()}</Text>
                </TouchableOpacity>
                <View style={styles.row3}>
                  <Text style={styles.productPrice}>{e.price}$</Text>
                </View>
              </View>
            ))
          }
        </View>
      </ScrollView>
    )
  }
}
function mapStateToProps(state){
  return {
    dataSource: state.dataSource,
    cartArray: state.cartArray
  }
}
export default connect(mapStateToProps)(ProductListView1);

const productWidth = (width - 60)/2;
const productHeight = productWidth;
const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    margin: 10,
    flexDirection:'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginBottom:10,
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
  row3:{
    flexDirection:'row',
    justifyContent: 'space-between'
  },
  imageLike:{
    width: 18,
    height: 18
  },
  textStyles: {
    color: '#AFAEAF',
    marginBottom:10
  },
  imgStyles: {
    width: productWidth,
    height: productHeight
  }
})
