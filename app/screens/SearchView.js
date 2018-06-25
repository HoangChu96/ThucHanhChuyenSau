import React, { Component } from 'react';
import {
    StyleSheet, Text, TouchableOpacity, ScrollView, View, Image, Dimensions
} from 'react-native';
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
            product, mainRight, bottomRight,
            txtName, txtPrice, productImage,
            txtShowDetail, showDetailContainer
        } = styles;
        const { searchArray, navigation } = this.props;

        return (
            <ScrollView>
                {
                    searchArray.map(e => (
                        <View style={product} key={e.id}>
                            <Image source={{ uri: url.product + e.images[0] }} style={productImage} />
                            <View style={mainRight}>
                                <Text style={txtName}>{toTitleCase(e.name)}</Text>
                                <View style={bottomRight} >
                                    <Text style={txtPrice}>{e.price}$</Text>
                                    <TouchableOpacity style={showDetailContainer} onPress={() => {
                                        navigation.navigate({
                                            routeName: 'ProductDetail',
                                            params: {
                                                product: e //truyền dữ liệu của 1 product sang detail
                                            }
                                        })
                                    }}
                                    >
                                        <Text style={txtShowDetail}>SHOW DETAILS</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))
                }
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
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
        flex: 2,
        resizeMode: 'center'
    },
    mainRight: {
        flex: 5,
        // justifyContent: 'space-between'
        paddingVertical: 10,
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
        // fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtPrice: {
        paddingLeft: 20,
        color: '#C21C70',
        fontSize: 15,
        // fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtColor: {
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
    // showDetailContainer: {
    //     position: 'absolute',
    //     alignSelf: 'flex-end',
    //     marginTop: 100
    // },
    bottomRight: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingTop: 10
    }
});
