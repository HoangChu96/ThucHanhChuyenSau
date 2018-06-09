import React, { Component } from 'react';
import {
    StyleSheet, Text, TouchableOpacity, ScrollView,
    ListView, View, Image, Dimensions, FlatList
} from 'react-native';
import global from '../global';
import url from '../config/handle';
import { connect } from 'react-redux';

function toTitleCase(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

class SearchView extends Component {
    constructor(props) {
        super(props);
        // console.log(props.searchArray);
        // const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        // this.state = {
        //     listProduct: ds
        // };
        // global.setArraySearch = this.setSearchArray.bind(this);
    }

    // setSearchArray(arrProduct) {
    //     this.setState({ listProduct: this.state.listProduct.cloneWithRows(arrProduct) });
    // }

    // gotoDetail(product) {
    //     const { navigation } = this.props;
    //     // navigation.navigate({ name: 'PRODUCT_DETAIL', product });
    //     navigation.navigate({
    //       routeName: 'ProductDetail',
    //       params: {
    //         product
    //       }
    //     })
    // }
    render() {
        const {
            product, mainRight, txtMaterial, txtColor,
            txtName, txtPrice, productImage,
            txtShowDetail, showDetailContainer, wrapper
        } = styles;
        const {searchArray} = this.props;
        
        return (
            <View>
            {
                searchArray.map(e => (
                    <View style={product} key={e.id}>
                        <Image  source={{ uri: url.product + e.images[0] }} style={productImage} />
                        <View style={mainRight}>
                            <Text style={txtName}>{toTitleCase(e.name)}</Text>
                            <Text style={txtPrice}>{e.price}$</Text>
                            <Text style={txtMaterial}>Material {e.material}</Text>
                            <View style={{ flexDirection: 'row' }} >
                                <Text style={txtColor}>Color {e.color}</Text>
                                <View
                                    style={{
                                        height: 15,
                                        width: 15,
                                        backgroundColor: 'white',
                                        borderRadius: 15,
                                        marginLeft: 10
                                    }}
                                />
                            </View>
                            <TouchableOpacity style={showDetailContainer} onPress={() => {
                                navigation.navigate({
                                    routeName: 'ProductDetail',
                                    params: {
                                        product:e //truyền dữ liệu của 1 product sang detail
                                    }
                                })
                            }}
                            >
                                <Text style={txtShowDetail}>SHOW DETAILS</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))
            }
            </View>
        );
    }
}

function mapStateToProps(state){
    return {
        searchArray: state.searchArray
    }
}

export default connect(mapStateToProps)(SearchView);

const { width } = Dimensions.get('window');
const imageWidth = width / 4;
const imageHeight = (imageWidth * 452) / 361;

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#DFDFDF',
        flex: 1
    },
    product: {
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
        shadowColor: '#3B5458',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2
    },
    productImage: {
        width: imageWidth,
        height: imageHeight,
        flex: 1,
        resizeMode: 'center'
    },
    mainRight: {
        flex: 3,
        justifyContent: 'space-between'
    },
    productController: {
        flexDirection: 'row'
    },
    numberOfProduct: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    txtName: {
        paddingLeft: 20,
        color: '#A7A7A7',
        fontSize: 20,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtPrice: {
        paddingLeft: 20,
        color: '#C21C70',
        fontSize: 15,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtColor: {
        paddingLeft: 20,
        color: 'black',
        fontSize: 15,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtMaterial: {
        paddingLeft: 20,
        color: 'black',
        fontSize: 15,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtShowDetail: {
        color: '#C21C70',
        fontSize: 10,
        fontWeight: '400',
        fontFamily: 'Avenir',
        textAlign: 'right',
    },
    showDetailContainer: {
        flexDirection: 'row',
        position: 'absolute',
        alignSelf: 'flex-end',
        marginTop: 100
    }
});


// <View style={productStyles}>
// <View style={leftStyles}>
//     <Image
//         style={imgStyles}
//         source={require('../media/temp/sp1.jpg')}
//     />
// </View>
// <View style={bottomStyles}>
//     <Text style={{fontSize: 18, color:'#34B089'}}>NIKE ROSHE</Text>
//     <Text style={{color: '#AFAEAF'}}>PRICE: 300$</Text>
// </View>
// </View>

// <View style={productStyles}>
// <View style={leftStyles}>
//     <Image
//         style={imgStyles}
//         source={require('../media/temp/sp2.jpg')}
//     />
// </View>
// <View style={bottomStyles}>
//     <Text style={{fontSize: 18, color:'#34B089'}}>NIKE AIR FORCE</Text>
//     <Text style={{color: '#AFAEAF'}}>PRICE: 123$ </Text>
// </View>
// </View>
// <View style={productStyles}>
// <View style={leftStyles}>
//     <Image
//         style={imgStyles}
//         source={require('../media/temp/sp3.jpg')}
//     />
// </View>
// <View style={bottomStyles}>
//     <Text style={{fontSize: 18, color:'#34B089'}}>NIKE AIR JORDAN</Text>
//     <Text style={{color: '#AFAEAF'}}>PRICE: 178$</Text>
// </View>
// </View>
// <View style={productStyles}>
// <View style={leftStyles}>
//     <Image
//         style={imgStyles}
//         source={require('../media/temp/sp4.jpg')}
//     />
// </View>
// <View style={bottomStyles}>
//     <Text style={{fontSize: 18, color:'#34B089'}}>NIKE AIR ZOOM</Text>
//     <Text style={{color: '#AFAEAF'}}>PRICE: 250$</Text>
// </View>
// </View>