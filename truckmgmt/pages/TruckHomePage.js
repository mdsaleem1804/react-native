/*Home Screen With buttons to navigate to different options*/
import React from 'react';
import {View, Image, StyleSheet, Button} from 'react-native';
import Mybutton from './components/Mybutton';

import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'TruckDatabase.db'});
export default class TruckHomePage extends React.Component {
  constructor(props) {
    super(props);
    db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_driver'",
        [],
        function(tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_driver', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_driver(driver_id INTEGER PRIMARY KEY AUTOINCREMENT, driver_name VARCHAR(20), driver_phone INT(10), driver_password VARCHAR(255), driver_owner_id VARCHAR(255))',
              [],
            );
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_owner(owner_id INTEGER PRIMARY KEY AUTOINCREMENT, owner_name VARCHAR(20), owner_phone INT(10), owner_password VARCHAR(255))',
              [],
            );
          }
        },
      );
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../images/truck.png')}
          style={styles.ImageStyle}
        />

        <Mybutton
          title="Owner"
          customClick={() => this.props.navigation.navigate('OwnerHomePage')}
        />
        <Mybutton
          title="Driver"
          customClick={() => this.props.navigation.navigate('DriverLogin')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  textStyle: {
    textAlign: 'center',
    fontSize: 28,
    marginVertical: 4,
  },
  ImageStyle: {
    marginTop: 30,
    height: 130,
    width: '60%',
    resizeMode: 'stretch',
    alignItems: 'center',
  },
});
