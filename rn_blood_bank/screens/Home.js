import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
class Home extends Component {
  state = {
    links: [
      {
        title: 'DONOR',
        url: require('../images/donor.png'),
        link: 'http://hellotamila.com/saleem/spiro/2020/bloodbank/donor/',
      },

      {
        title: 'HOSPITAL',
        url: require('../images/hospital.png'),
        link: 'http://hellotamila.com/saleem/spiro/2020/bloodbank/hospital/',
      },
      {
        title: 'LAB',
        url: require('../images/lab.png'),
        link:
          'http://hellotamila.com/saleem/spiro/2020/bloodbank/lab/login.php',
      },
    ],
  };
  handleButtonPress(item) {
    const {title, link} = item;
    this.props.navigation.navigate('Browser', {title, link});
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.links.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => this.handleButtonPress(item)}>
            <View>
              <Image source={item.url} style={styles.ImageStyle} key={index} />
              <Text style={styles.textStyle}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  textStyle: {
    textAlign: 'center',
    fontSize: 28,
    marginVertical: 4,
  },
  ImageStyle: {
    height: 50,
    borderRadius: 5,
    padding: 10,
    padding: 10,
    marginTop: 30,
    height: 130,
    width: 200,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
});
export default Home;
