import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class Favorite extends Component{
  constructor(props){
    super(props);
    this.state = {
      selectedLike: false,
      selectedTab: false,
    };
  }

  render(){
    const {navigation} = this.props;

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
        <View style={styles.wrapper}>
          <View style={styles.titleContainer}>
            <Text style={styles.textStyles}>FAVORITE</Text>
          </View>

          <View style={styles.body}>
            <View style={styles.productContainer}>
              <TouchableOpacity onPress = {() => navigation.navigate('ProductDetailScreen')}>
                <Image
                  style={styles.imgStyles}
                  source={require('../media/temp/sp1.jpg')}
                />
              </TouchableOpacity>
              <Text style={styles.productName}>PRODUCT NAME</Text>
              <View style={styles.row3}>
                <Text style={styles.productPrice}>{'250$'}</Text>
                <TouchableOpacity onPress = {() => selectedFavorite()}>
                  {like}
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.productContainer}>
              <TouchableOpacity onPress = {() => navigation.navigate('ProductDetailScreen')}>
                <Image
                  style={styles.imgStyles}
                  source={require('../media/temp/sp2.jpg')}
                />
              </TouchableOpacity>
              <Text style={styles.productName}>PRODUCT NAME</Text>
              <View style={styles.row3}>
                <Text style={styles.productPrice}>{'300$'}</Text>
                <TouchableOpacity onPress = {() => selectedFavorite()}>
                  {like}
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.productContainer}>
              <TouchableOpacity onPress = {() => navigation.navigate('ProductDetailScreen')}>
                <Image
                  style={styles.imgStyles}
                  source={require('../media/temp/sp3.jpg')}
                />
              </TouchableOpacity>
              <Text style={styles.productName}>PRODUCT NAME</Text>
              <View style={styles.row3}>
                <Text style={styles.productPrice}>{'150$'}</Text>
                <TouchableOpacity onPress = {() => selectedFavorite()}>
                  {like}
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.productContainer}>
              <TouchableOpacity onPress = {() => navigation.navigate('ProductDetailScreen')}>
                <Image
                  style={styles.imgStyles}
                  source={require('../media/temp/sp4.jpg')}
                />
              </TouchableOpacity>
              <Text style={styles.productName}>PRODUCT NAME</Text>
              <View style={styles.row3}>
                <Text style={styles.productPrice}>{'200$'}</Text>
                <TouchableOpacity onPress = {() => selectedFavorite()}>
                  {like}
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.productContainer}>
              <TouchableOpacity onPress = {() => navigation.navigate('ProductDetailScreen')}>
                <Image
                  style={styles.imgStyles}
                  source={require('../media/temp/sp5.jpg')}
                />
              </TouchableOpacity>
              <Text style={styles.productName}>PRODUCT NAME</Text>
              <View style={styles.row3}>
                <Text style={styles.productPrice}>{'220$'}</Text>
                <TouchableOpacity onPress = {() => selectedFavorite()}>
                  {like}
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.productContainer}>
              <TouchableOpacity onPress = {() => navigation.navigate('ProductDetailScreen')}>
                <Image
                  style={styles.imgStyles}
                  source={require('../media/temp/sp6.jpg')}
                />
              </TouchableOpacity>
              <Text style={styles.productName}>PRODUCT NAME</Text>
              <View style={styles.row3}>
                <Text style={styles.productPrice}>{'100$'}</Text>
                <TouchableOpacity onPress = {() => selectedFavorite()}>
                  {like}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const productWidth = (width - 60)/2;
const productHeight = productWidth;
const styles = StyleSheet.create({
  wrapper:{
    backgroundColor: '#fff',
    margin: 10
  },
  titleContainer: {
    justifyContent:'center',
    padding:10,
    paddingBottom:0
  },
  textStyles: {
    color: '#AFAEAF',
    marginBottom:10
  },
  imgStyles: {
    width: productWidth,
    height: productHeight
  },
  body: {
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
  }
})
