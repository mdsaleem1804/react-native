import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const origin = {latitude: 37.3318456, longitude: -122.0296002};
const destination = {latitude: 37.771707, longitude: -122.4053769};
const GOOGLE_MAPS_APIKEY = '';

export default class LoadMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      region: {
        latitude: 8.7139,
        longitude: 77.7567,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      },
    };
  }

  render() {
    return (
      <View style={styles.MainContainer}>
        <MapView style={styles.mapStyle}>
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey=""
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
