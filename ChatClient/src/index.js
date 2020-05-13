import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Proptypes from 'prop-types';
import io from 'socket.io-client';
import Geolocation from '@react-native-community/geolocation';
import BackgroundTimer from 'react-native-background-timer';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.io = undefined;
  }

  componentDidMount() {
    this.io = io('http://192.168.1.11:5555');
    console.log('Index -> componentDidMount -> this.io', this.io);

    this.io.on('test', (a) => {
      console.log('Index -> componentDidMount -> a', a);
    });

    BackgroundTimer.start();
    this.interval();
  }

  sendLatLng = () => {
    Geolocation.getCurrentPosition((s) => {
      console.log('Index -> componentDidMount -> s', s);
      if (this.io) {
        this.io.emit('client-test', {
          lat: s.coords.latitude,
          lng: s.coords.longitude,
        });
      }
    });
  };

  interval = () => {
    this.a = BackgroundTimer.setInterval(() => {
      this.sendLatLng();
    }, 2000);
  };

  componentWillUnmount() {
    BackgroundTimer.stop();
    if (this.io) {
      this.io.disconnect();
    }
    if (this.a) {
      BackgroundTimer.clearInterval(this.a);
    }
  }

  render() {
    return (
      <View>
        <Text>Index</Text>
      </View>
    );
  }
}

Index.propTypes = {};

export default Index;
