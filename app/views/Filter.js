import React, {Component} from 'react';
import {
  View, Text, TouchableOpacity,
  Slider, Image, StyleSheet,
  Button, Picker, ScrollView
} from 'react-native';

class Filter extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: 0,
      minValue:0,
      maxValue: 500,
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
      checkBoxStyle, container, imgCheckBox, title, txtTitle,
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
        <ScrollView style={container}>
          <View style={wrapper}>
            <View style={title}>
              <Text style= {txtTitle} >PRICE</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <Text>{this.state.minValue}</Text>
              <Text>{Math.round(this.state.value * this.state.maxValue)}</Text>
              <Text>{this.state.maxValue}</Text>
            </View>
            <Slider
              value={this.state.value}
              onValueChange={value => this.setState({value})}
              minimumValue = {this.state.minValue}
              minimumTrackTintColor = '#34B089'
              maximunValue = {this.state.maxValue}
              maximumTrackTintColor = 'red'
              // onSlidingComplete={}
              step={0.1}
            />
          </View>

          <View style={wrapper}>
            <View style={title}>
              <Text style= {txtTitle}>SORT BY</Text>
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

          <TouchableOpacity style={title}>
            <Text style= {txtTitle}>Find</Text>
          </TouchableOpacity>

        </ScrollView>
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
    margin: 5,
    padding: 5,
    backgroundColor: '#34B089',
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtTitle: {
    color: 'white'
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
