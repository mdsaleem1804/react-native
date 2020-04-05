/*Home Screen With buttons to navigate to different options*/
import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Alert,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'TruckDatabase.db'});
export default class DriverLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileno: '',
      password: '',
    };
  }
  handleMobileno = (text) => {
    this.setState({mobileno: text});
  };
  handlePassword = (text) => {
    this.setState({password: text});
  };
  login = (mobileno, pass) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_driver where driver_phone=? and driver_password=?',
        [mobileno, pass],
        (tx, results) => {
          var len = results.rows.length;
          // console.log(results);
          if (len > 0) {
            Alert.alert(
              'Success',
              'Welcome Driver- Click Ok to proceed',
              [
                {
                  text: 'Ok',
                  onPress: () =>
                    this.props.navigation.navigate('DriverHomePage', {
                      login_mobileno: mobileno,
                    }),
                  //this.props.navigation.navigate('DriverHomePage'),
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Invalid Credentials');
          }
        },
      );
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../images/driver_login.png')}
          style={styles.ImageStyle}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Mobile No"
          placeholderTextColor="#9a73ef"
          maxLength={10}
          keyboardType="numeric"
          autoCapitalize="none"
          onChangeText={this.handleMobileno}
        />

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Password"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handlePassword}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.login(this.state.mobileno, this.state.password)}>
          <Text style={styles.submitButtonText}> Submit </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: 'white',
  },
  ImageStyle: {
    marginLeft: 80,
    marginTop: 30,
    height: 130,
    width: '60%',
    resizeMode: 'stretch',
    alignItems: 'center',
  },
});
