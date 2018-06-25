import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet, Dimensions, Image
} from 'react-native';
const { height, width } = Dimensions.get('window');

export default class ShowInfo extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { goBack } = this.props.navigation;
        const { navigation } = this.props;
        const { user } = this.props.navigation.state.params;
        const { 
            wrapper, row1, titleStyle, iconStyle, infoUser, txtInfo, contentUser, 
            btnCheckOut, txtEdit, txtContent
        } = styles;
        return (
            <View>
                <View style={wrapper}>
                    <View style={row1}>
                        <View />
                        <Text style={titleStyle}>User Infomation</Text>
                        <TouchableOpacity onPress={() => goBack()}>
                            <Image
                                style={iconStyle}
                                source={require('../media/appIcon/backs.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={infoUser} >
                    <View style={contentUser} >
                        <Text style={txtInfo}>Name</Text>
                        <Text style={txtContent}>{user.name.toUpperCase()}</Text>
                    </View>
                    <View style={contentUser}>
                        <Text style={txtInfo}>Email</Text>
                        <Text style={txtContent}>{user.email}</Text>
                    </View>
                    <View style={contentUser}>
                        <Text style={txtInfo}>Phone</Text>
                        <Text style={txtContent}>{user.phone}</Text>
                    </View>
                    <View style={contentUser}>
                        <Text style={txtInfo}>Address</Text>
                        <Text style={txtContent}>{user.address}</Text>
                    </View>

                    <TouchableOpacity 
                    style={btnCheckOut}
                    onPress={() =>
                        navigation.navigate({
                            routeName: 'ChangeInfo',
                            params: {
                                user: user
                            }
                        })}
                >
                    <Text style={txtEdit} >Edit Profile</Text>
                </TouchableOpacity>

                </View>               
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        height: height / 10,
        backgroundColor: '#34B589',
        padding: 10,
        justifyContent: 'space-around'
    },
    row1: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    titleStyle: {
        color: '#fff',
        fontSize: 20,
    },
    iconStyle: {
        width: 25,
        height: 25
    },
    txtInfo: {
        padding: 10,
        width: 80,
        color: '#fff',
        backgroundColor: '#34B089',
        marginVertical: 10,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10
    },
    txtContent:{
        backgroundColor: '#fff',
        color: '#34B089',
        marginVertical: 10,
        padding: 10,
        width
    },
    infoUser: {
        margin: 20,

    },
    contentUser:{
        flexDirection: 'row'
    },
    btnCheckOut: {
        justifyContent: 'center',
        alignItems: 'center',
        // height: 50,
        paddingVertical: 10,
        backgroundColor:'#34B089',
        // marginVertical: 240,
        // width,
        borderRadius: 10
    },
    txtEdit:{
        color: '#fff',
        fontWeight: 'bold'
    }
})