import React, {Component} from 'react';
import {
  View, Text, TouchableOpacity,
  Slider, Image, StyleSheet,
  Button, Picker
} from 'react-native';

class Filter extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: 0,
      minValue:0,
      maxValue: 50,
      onCheck: false,
      PickerValueHolder : ''
    };
  }

  onCheckBox = () => {
    this.setState({
      onCheck: !this.state.onCheck,
    });
  };

  render() {
    const {
      checkBoxStyle, container, imgCheckBox, title,
      categoryStyles, txtProduct, MainContainer, wrapper
    } = styles;
    const checked = (
      <Image
        style={imgCheckBox}
        source={require('../media/appIcon/checked.png')}
      />
    )
    const unchecked = (
      <Image
        style={imgCheckBox}
        source={require('../media/appIcon/unchecked.png')}
      />
    )
    const checkBox = this.state.onCheck ? checked : unchecked;

    return(
        <View style={container}>
          <View style={wrapper}>
            <View style={title}>
              <Text>Giới Tính</Text>
            </View>
            <View style={checkBoxStyle}>
              <TouchableOpacity onPress={() => this.onCheckBox()}>
                {checkBox}
              </TouchableOpacity>
              <Text>Male</Text>

              <TouchableOpacity>
                {checkBox}
              </TouchableOpacity>
              <Text>Female</Text>
            </View>
          </View>

          <View style={wrapper}>
            <View style={title}>
              <Text>PRICE</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <Text>{this.state.minValue}</Text>
              <Text>{this.state.value}</Text>
              <Text>{this.state.maxValue}</Text>
            </View>
            <Slider
              value={this.state.value}
              onValueChange={value => this.setState({value})}
              minimumValue = {this.state.minValue}
              minimumTrackTintColor = '#34B089'
              maximunValue = {this.state.maxValue}
              maximumTrackTintColor = 'red'
            />
          </View>

          <View style={wrapper}>
            <View style={title}>
              <Text>SORT BY</Text>
            </View>
            <View style={MainContainer}>
              <Picker
                selectedValue={this.state.PickerValueHolder}
                onValueChange={(itemValue, itemIndex) => this.setState({PickerValueHolder: itemValue})} >
                <Picker.Item label="New Product" value="New Product" />
                <Picker.Item label="Sale Product" value="Sale Product" />
                <Picker.Item label="Top Product" value="Top Product" />
              </Picker>
            </View>
          </View>

          <View style={wrapper}>
            <View style={title}>
              <Text>CATEGORY</Text>
            </View>
            <View>
              <TouchableOpacity style={categoryStyles}>
                <Text style={txtProduct}>Adidas</Text>
              </TouchableOpacity>

              <TouchableOpacity style={categoryStyles}>
                <Text style={txtProduct}>Nike</Text>
              </TouchableOpacity>

              <TouchableOpacity style={categoryStyles}>
                <Text style={txtProduct}>Puma</Text>
              </TouchableOpacity>

              <TouchableOpacity style={categoryStyles}>
                <Text style={txtProduct}>Sneaker</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    margin:10,
    padding:10,
    backgroundColor: 'white'
  },
  checkBoxStyle:{
    margin: 10,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  imgCheckBox:{
    width:20,
    height: 20
  },
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
  MainContainer: {
   flex: 1,
   justifyContent: 'center',
   margin: 20
 }
})
export default Filter;