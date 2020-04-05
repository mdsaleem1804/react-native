/*Home Screen With buttons to navigate to different options*/
import React from 'react';
import {
  View,
  StyleSheet,
  Button,
  Text,
  Picker,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import SendSMS from 'react-native-sms';
import GetLocation from 'react-native-get-location';
import Geocoder from 'react-native-geocoder';

//import LoadMap from '../pages/components/User/LoadHtml';
export default class DriverHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSource: '',
      selectedDestination: '',
      state_login_mobileno: '',
      owner_phone: '',
      state_remarks: '',
      listItems: [],
      listItemsInner: [],
      latitude: '',
      longitude: '',
      address: '',
    };
  }
  async componentDidMount() {
    const {navigation} = this.props;
    const login_mobileno = navigation.getParam('login_mobileno', '');
    this.setState({
      state_login_mobileno: login_mobileno,
    });

    await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => this.setAddress(location))

      .catch((error) => {
        //const {code, message} = error;
        //console.warn(code, message);
      });
    fetch('https://test-react-5b3fc.firebaseio.com/truckmgmt.json')
      .then((response) => response.json())
      .then((data) => this.setState({listItems: data}))
      //.then(data => console.log(data))
      .then(() => this.fetchOwnerMobileNo())
      .catch((error) => {
        // console.error(error);
      });
  }
  setAddress(location) {
    var latandlong = {
      lat: location.latitude,
      lng: location.longitude,
    };

    Geocoder.geocodePosition(latandlong).then((res) => {
      this.setState({address: res[0].formattedAddress});
      //console.log(res[0].formattedAddress);
    });
  }
  fetchOwnerMobileNo() {
    const result = Object.keys(this.state.listItems).map(
      (key) => this.state.listItems[key],
    );
    // console.log(this.state.selectedSource);
    const source = 'owner';
    this.setState({
      listItemsInner: result.filter(function (user) {
        return user.Source == source; // filters and returns a new array
      }),
    });

    const fetchOwnerMobileNotext = this.state.listItemsInner.map(
      (item) => item.Remarks,
    );

    console.log(fetchOwnerMobileNotext);
    this.setState({owner_phone: JSON.stringify(fetchOwnerMobileNotext)});
  }
  checkSourceDestination() {
    if (this.state.selectedSource == '') {
      Alert.alert('Please Choose Source');
      return;
    }
    if (this.state.selectedDestination == '') {
      Alert.alert('Please Choose Destination');
      return;
    }

    if (this.state.selectedSource == this.state.selectedDestination) {
      Alert.alert('Please Choose Different Source / Destination');
      return;
    }
    fetch('https://test-react-5b3fc.firebaseio.com/truckmgmt.json')
      .then((response) => response.json())
      .then((data) => this.setState({listItems: data}))
      //.then(data => console.log(data))
      .then(() => this.fetchSelectedData())
      .catch((error) => {
        // console.error(error);
      });
  }
  fetchSelectedData() {
    const result = Object.keys(this.state.listItems).map(
      (key) => this.state.listItems[key],
    );
    // console.log(this.state.selectedSource);
    const source = this.state.selectedSource;
    const destination = this.state.selectedDestination;
    this.setState({
      listItemsInner: result.filter(function (user) {
        return user.Source == source && user.Destination == destination; // filters and returns a new array
      }),
    });

    const threatRemarks = this.state.listItemsInner.map((item) => item.Remarks);
    if (threatRemarks.length > 0) {
      Alert.alert(JSON.stringify(threatRemarks));
    } else {
      Alert.alert(JSON.stringify('No Problem on this route .'));
    }
  }
  SendSMSFromApp(message) {
    SendSMS.send(
      {
        //Message body
        body: message,
        //Recipients Number
        recipients: [this.state.owner_phone],
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

  InsertThreat = () => {
    let {
      selectedSource,
      selectedDestination,
      state_login_mobileno,
      state_remarks,
      address,
    } = this.state;
    const message = 'Problem:' + state_remarks + ' /  Address : ' + address;
    if (selectedSource == selectedDestination) {
      Alert.alert('Please Choose Different Source / Destination');
      return;
    }
    if (selectedSource == '') {
      Alert.alert('Please Choose Source');
      return;
    }
    if (selectedDestination == '') {
      Alert.alert('Please Choose Destination');
      return;
    }
    if (state_remarks == '') {
      Alert.alert('Please Enter Remarks');
      return;
    }

    fetch('https://test-react-5b3fc.firebaseio.com/truckmgmt.json', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Source: selectedSource,
        Destination: selectedDestination,
        ReportedBy: state_login_mobileno,
        Remarks: message,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        // Showing response message coming from server after inserting records.
        //Alert.alert(responseJson.name);
      })
      .catch((error) => {
        // console.error(error);
      });
    Alert.alert('Inserted');
    this.SendSMSFromApp(message);
  };

  render() {
    return (
      <KeyboardAvoidingView style={{flex: 1, margin: 20}}>
        <ScrollView>
          <View>
            <View>
              <Text style={{fontWeight: 'bold'}}>Source : </Text>
              <Picker
                selectedValue={this.state.selectedSource}
                onValueChange={(itemValue) =>
                  this.setState({selectedSource: itemValue})
                }>
                <Picker.Item label="Select Source" value="" />
                <Picker.Item label="Tirunelveli" value="Tirunelveli" />
                <Picker.Item label="Kovilpatti" value="Kovilpatti" />
                <Picker.Item label="Madurai" value="Madurai" />
                <Picker.Item label="Trichy" value="Trichy" />
              </Picker>
              <Text style={{fontWeight: 'bold'}}>Destination : </Text>
              <Picker
                selectedValue={this.state.selectedDestination}
                onValueChange={(itemValue) =>
                  this.setState({selectedDestination: itemValue})
                }>
                <Picker.Item label="Select Destination" value="" />
                <Picker.Item label="Tirunelveli" value="Tirunelveli" />
                <Picker.Item label="Kovilpatti" value="Kovilpatti" />
                <Picker.Item label="Madurai" value="Madurai" />
                <Picker.Item label="Trichy" value="Trichy" />
              </Picker>
              <Text style={{fontWeight: 'bold'}}>Destination/Remarks </Text>

              <Mytextinput
                onChangeText={(state_remarks) =>
                  this.setState({state_remarks})
                }></Mytextinput>
              <View style={styles.buttonContainer}>
                <Button
                  title="FIND"
                  onPress={() => this.checkSourceDestination()}
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button title="Threat" onPress={() => this.InsertThreat()} />
              </View>
            </View>
            <View style={styles.map}>
              <Text>{this.state.address}</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    margin: 10,
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  map: {
    height: 400,
    marginTop: 20,
  },
  big: {
    fontSize: 25,
  },
});
