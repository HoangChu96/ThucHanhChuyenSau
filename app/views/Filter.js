import React, {Component} from 'react';
import {
  View, Text, TouchableOpacity,
  Slider, StyleSheet,
  Picker, ScrollView
} from 'react-native';
import {connect} from 'react-redux';

class Filter extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: 1,
      minValue:0,
      maxValue: 500,
      PickerValueHolder : '',
      arrayFilter: []
    };
    console.log(props.dataSource);
  }

  searchFilter(){
    const {dataSource} = this.props;

    let e = this.state.PickerValueHolder;
    switch (e) {
      case 'SaleProduct':
        this.props.dispatch({
          type: 'TYPEPRODUCT',
          dataSource: dataSource.filter((sale) => {
            return (
              sale.inCollection === '1' && sale.price <= Math.round(this.state.value * this.state.maxValue)
            )
          })
        });
        break;
      case 'TopProduct':
        this.props.dispatch({
          type: 'TYPEPRODUCT',
          dataSource: dataSource.filter((top) => {
            return (
              top.new === '1'&& top.price <= Math.round(this.state.value * this.state.maxValue)
            )
          })
        });
        break;
      default:
        PickerValueHolder = '';
    }

  }

  render() {
    const {
      container, title, txtTitle,
      MainContainer, wrapper
    } = styles;

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
              step={0.05}
            />
          </View>

          <View style={wrapper}>
            <View style={title}>
              <Text style= {txtTitle}>SORT BY</Text>
            </View>
            <View style={MainContainer}>
              <Picker
                selectedValue={this.state.PickerValueHolder}
                onValueChange={(itemValue, itemIndex) => this.setState({PickerValueHolder: itemValue}) } >
                <Picker.Item label="Select sort by" value="cancel" />
                <Picker.Item label="Sale Product" value="SaleProduct" />
                <Picker.Item label="Top Product" value="TopProduct" />
              </Picker>
            </View>
          </View>

          <TouchableOpacity style={title} onPress={this.searchFilter.bind(this)} >
            <Text style= {txtTitle}>Find</Text>
          </TouchableOpacity>

        </ScrollView>
    )
  }
}

function mapStateToProps(state){
  return {
    dataSource: state.dataSource
  }
}
export default connect(mapStateToProps)(Filter);

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
