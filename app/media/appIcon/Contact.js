import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

export default class Contact extends Component {
  render() {
    const {
      mapContainer, wrapper, infoContainer,
      rowInfoContainer, imageStyle, infoText
    } = styles;
    return (
      <View style={wrapper}>
        <View style={mapContainer}>
          <MapView
            style={{ width: width - 20, height: 250 }}
            initialRegion={{
            latitude: 20.980605,
            longitude: 105.787895,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            }}
          >
            <MapView.Marker
              coordinate={{ latitude: 20.980605, longitude: 105.787895 }}
              title="Chu Tự Hoàng"
              description="Học Viện Công Nghệ Bưu Chính Viễn Thông"
            />
          </MapView>
        </View>
        <View style={infoContainer}>
          <View style={rowInfoContainer}>
            <Image source={require('../../../../media/appIcon/location.png')} style={imageStyle} />
            <Text style={infoText}>Km10 Nguyễn Trãi, Thanh Xuân, Hà Nội</Text>
          </View>
          <View style={rowInfoContainer}>
            <Image source={require('../../../../media/appIcon/phone.png')} style={imageStyle} />
            <Text style={infoText}>(+84) 0962775329</Text>
          </View>
          <View style={rowInfoContainer}>
            <Image source={require('../../../../media/appIcon/mail.png')} style={imageStyle} />
            <Text style={infoText}>chutuhoang@gmail.com</Text>
          </View>
          <View style={[rowInfoContainer, { borderBottomWidth: 0 }]}>
            <Image source={require('../../../../media/appIcon/message.png')} style={imageStyle} />
            <Text style={infoText}>(+84) 0962775329</Text>
          </View>
        </View>
      </View>
    );
  }
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#F6F6F6' },
  mapStyle: {
    width: width - 40,
    height: 230,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mapContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FFFFFF',
    margin: 10,
    borderRadius: 2,
    shadowColor: '#3B5458',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2
  },
  infoContainer: {
    padding: 10,
    flex: 1,
    backgroundColor: '#FFF',
    margin: 10,
    marginTop: 0,
    borderRadius: 2,
    shadowColor: '#3B5458',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2
  },
  rowInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#D6D6D6'
  },
  imageStyle: {
    width: 30,
    height: 30
  },
  infoText: {
    fontFamily: 'Avenir',
    color: '#AE005E',
    fontWeight: '500'
  }
});
