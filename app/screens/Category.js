import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, FlatList
} from 'react-native';
import {connect} from 'react-redux';
import url from '../config/handle';

class Category extends Component {
  constructor(props){
    super(props);
    this.state={
      dataSource: []
    };


  }

  componentDidMount(){
      fetch('http://192.168.0.68/app/product_by_type.php')
      .then(res => res.json())
      .then((resJSON) => {
        const {product} = resJSON;
        this.setState({
          dataSource: product
        });
      })
      .catch(
        (e) => { console.log(e)}
      );
    
  }

  render() {
    const {
      wrapper, title, categoryStyles, txtProduct
    } = styles;
    const {types, navigation} = this.props;
    const {dataSource} = this.state;

    return (
      <View style={wrapper}>
        <View style={title}>
          <Text>CATEGORY</Text>
        </View>

        <View>
          {
            types.map(e => (
              <View key={e.id}>
                <TouchableOpacity
                  style={categoryStyles}
                  onPress = {() => {
                    navigation.navigate({
                      routeName: 'ProductByType',
                      params: {
                        dataSource:e //truyền dữ liệu của 1 product sang detail
                      }
                    })
                  }
                }>
                    <Text style={txtProduct}>{e.name.toUpperCase()}</Text>
                </TouchableOpacity>
              </View>
            ))
          }
        </View>
      </View>
    );
  }
}

function mapStateToProps(state){
  return{
    types: state.types
  };
}

export default connect(mapStateToProps)(Category);

const styles = StyleSheet.create({
  wrapper:{
    margin: 10
  },
  title:{
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  categoryStyles:{
    margin:10
  },
  txtProduct:{
    borderBottomWidth: 1,
    borderColor: '#cbcbcb'
  },
});
