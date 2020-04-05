/*Screen to register the user*/
import React from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  StyleSheet,
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import {openDatabase} from 'react-native-sqlite-storage';
import SendSMS from 'react-native-sms';
var db = openDatabase({name: 'TruckDatabase.db'});
export default class RegisterDriver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input_user_id: '',
      user_name: '',
      user_phone: '',
      user_password: '',
      user_confirmpassword: '',
      user_owner_id: '',
    };
  }
  componentWillMount() {
    const {navigation} = this.props;
    const driverId = navigation.getParam('driverId', '');
    const driverName = navigation.getParam('driverName', '');
    const driverPhone = navigation.getParam('driverPhone', '');
    const driverPassword = navigation.getParam('driverPassword', '');
    const driverOwnerId = navigation.getParam('driverOwnerId', '');
    this.setState({
      input_user_id: driverId,
    });
    this.setState({
      user_name: driverName,
    });
    this.setState({
      user_phone: driverPhone,
    });
    this.setState({
      user_password: driverPassword,
    });
    this.setState({
      user_confirmpassword: driverPassword,
    });
    this.setState({
      user_owner_id: driverOwnerId,
    });
  }

  someFunction() {
    SendSMS.send(
      {
        //Message body
        body: 'Please follow https://aboutreact.com',
        //Recipients Number
        recipients: [this.state.user_phone],
        //An array of types that would trigger a "completed" response when using android
        successTypes: ['sent', 'queued'],
      },
      (completed, cancelled, error) => {
        if (completed) {
          console.log('SMS Sent Completed');
        } else if (cancelled) {
          console.log('SMS Sent Cancelled');
        } else if (error) {
          console.log('Some error occured');
        }
      },
    );
  }

  searchDriver = () => {
    const {input_user_id} = this.state;
    // console.log(this.state.input_user_id);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM table_driver where driver_id = ?',
        [input_user_id],
        (tx, results) => {
          var len = results.rows.length;
          //console.log('len', len);
          if (len > 0) {
            console.log(results.rows.item(0).driver_phone);
            this.setState({
              user_name: results.rows.item(0).driver_name,
            });
            this.setState({
              user_phone: results.rows.item(0).driver_phone,
            });
            this.setState({
              user_password: results.rows.item(0).driver_password,
            });
            this.setState({
              user_confirmpassword: results.rows.item(0).driver_password,
            });
            this.setState({
              user_owner_id: results.rows.item(0).driver_owner_id,
            });
          } else {
            alert('No Driver found');
            this.setState({
              user_name: '',
              user_phone: '',
              user_password: '',
              user_confirmpassword: '',
              user_owner_id: '',
            });
          }
        },
      );
    });
  };
  register_driver = () => {
    var that = this;
    const {user_name} = this.state;
    const {user_phone} = this.state;
    const {user_password} = this.state;
    const {user_confirmpassword} = this.state;
    const {user_owner_id} = this.state;
    //alert(user_name, user_phone, user_password);
    if (user_name) {
      if (user_phone) {
        if (user_password) {
          db.transaction(function(tx) {
            tx.executeSql(
              'INSERT INTO table_driver (driver_name, driver_phone, driver_password,driver_owner_id) VALUES (?,?,?,?)',
              [user_name, user_phone, user_password, user_owner_id],
              (tx, results) => {
                //console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                    'You are Registered Successfully',
                    [
                      {
                        text: 'Ok',
                        onPress: () =>
                          that.props.navigation.navigate('HomeScreen'),
                      },
                    ],
                    {cancelable: false},
                  );
                } else {
                  alert('Registration Failed');
                }
              },
            );
          });
        } else {
          alert('Please fill Address');
        }
      } else {
        alert('Please fill Contact Number');
      }
    } else {
      alert('Please fill Name');
    }
  };

  updateDiver = () => {
    var that = this;
    const {input_user_id} = this.state;
    const {user_name} = this.state;
    const {user_phone} = this.state;
    const {user_password} = this.state;
    const {user_owner_id} = this.state;
    if (user_name) {
      if (user_phone) {
        if (user_owner_id) {
          db.transaction(tx => {
            tx.executeSql(
              'UPDATE table_driver set driver_name=?, driver_phone=? , driver_password=?, driver_owner_id=? where driver_id=?',
              [
                user_name,
                user_phone,
                user_password,
                user_owner_id,
                input_user_id,
              ],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                    'Driver updated successfully',
                    [
                      {
                        text: 'Ok',
                        onPress: () =>
                          that.props.navigation.navigate('HomeScreen'),
                      },
                    ],
                    {cancelable: false},
                  );
                } else {
                  alert('Updation Failed');
                }
              },
            );
          });
        } else {
          alert('Please fill Address');
        }
      } else {
        alert('Please fill Contact Number');
      }
    } else {
      alert('Please fill Name');
    }
  };

  deleteDriver = () => {
    var that = this;
    const {input_user_id} = this.state;
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM  table_driver where driver_id=?',
        [input_user_id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Driver deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => that.props.navigation.navigate('HomeScreen'),
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Please insert a valid Driver Id');
          }
        },
      );
    });
  };
  render() {
    const {navigation} = this.props;
    const itemId = navigation.getParam('driverId', '');
    return (
      <View style={{backgroundColor: 'white', flex: 1}}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
            <Mytextinput
              placeholder="Enter Name"
              value={this.state.user_name}
              onChangeText={user_name => this.setState({user_name})}
              style={{padding: 10}}
            />
            <Mytextinput
              placeholder="Enter Phone No"
              value={'' + this.state.user_phone}
              onChangeText={user_phone => this.setState({user_phone})}
              maxLength={10}
              keyboardType="numeric"
              style={{padding: 10}}
            />
            <Mytextinput
              placeholder="Enter Password"
              value={this.state.user_password}
              onChangeText={user_password => this.setState({user_password})}
              maxLength={225}
              multiline={true}
              style={{textAlignVertical: 'top', padding: 10}}
            />
            <Mytextinput
              placeholder="Enter Confirm Password"
              value={this.state.user_password}
              onChangeText={user_confirmpassword =>
                this.setState({user_confirmpassword})
              }
              maxLength={225}
              multiline={true}
              style={{textAlignVertical: 'top', padding: 10}}
            />
            <Mytextinput
              placeholder="Enter Truck No"
              value={this.state.user_owner_id}
              onChangeText={user_owner_id => this.setState({user_owner_id})}
              maxLength={225}
              multiline={true}
              style={{textAlignVertical: 'top', padding: 10}}
            />

            {!itemId ? (
              <Mybutton
                title="SAVE"
                customClick={this.register_driver.bind(this)}
              />
            ) : null}

            {itemId ? (
              <View style={styles.container}>
                <Mybutton
                  style={styles.button}
                  title="UPDATE"
                  customClick={this.updateDiver.bind(this)}
                />
                <Mybutton
                  style={styles.button}
                  title="DELETE"
                  customClick={this.deleteDriver.bind(this)}
                />
              </View>
            ) : null}
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
  },
});
