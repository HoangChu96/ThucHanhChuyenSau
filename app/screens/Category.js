import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';

class Category extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const {
      wrapper, title, categoryStyles, txtProduct
    } = styles;
    const {types, navigation} = this.props;

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
                   
                  }}>
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
