/*Screen to view all the user*/
import React from 'react';
import {
  FlatList,
  Text,
  View,
  Button,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'TruckDatabase.db'});
export default class ViewAllUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FlatListItems: [],
    };
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM table_driver', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          FlatListItems: temp,
        });
      });
    });
  }
  actionOnRow(item) {
    this.props.navigation.navigate('RegisterDiver', {
      driverId: item.driver_id,
      driverName: item.driver_name,
      driverPhone: item.driver_phone,
      driverPassword: item.driver_password,
      driverOwnerId: item.driver_owner_id,
    });
  }

  ListViewItemSeparator = () => {
    return (
      <View style={{height: 0.2, width: '100%', backgroundColor: '#808080'}} />
    );
  };
  render() {
    return (
      <View>
        <FlatList
          data={this.state.FlatListItems}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableWithoutFeedback onPress={() => this.actionOnRow(item)}>
              <View
                key={item.user_id}
                style={{backgroundColor: 'white', padding: 20}}>
                <Text>Id: {item.driver_id}</Text>
                <Text>Name: {item.driver_name}</Text>
                <Text>Phone: {item.driver_phone}</Text>
                <Text>TruckNo: {item.driver_owner_id}</Text>

                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                  }}></View>
              </View>
            </TouchableWithoutFeedback>
          )}
        />
      </View>
    );
  }
}
