/*Home Screen With buttons to navigate to different options*/
import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
  Text,
  Picker,
  Platform,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import Mytextinput from './components/Mytextinput';

export default class RouteSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSource: '',
      selectedDestination: '',
      state_login_mobileno: '',
      state_remarks: '',
    };
  }

  InsertRoute = () => {
    fetch('https://test-react-5b3fc.firebaseio.com/truckmgmt.json', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Source: this.state.selectedSource,
        Destination: this.state.selectedDestination,
        ReportedBy: this.state.state_login_mobileno,
        Remarks: this.state.state_remarks,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // Showing response message coming from server after inserting records.
        Alert.alert(responseJson.name);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  componentWillMount() {
    const {navigation} = this.props;
    const login_mobileno = navigation.getParam('login_mobileno', '');
    this.setState({
      state_login_mobileno: login_mobileno,
    });
  }
  render() {
    return (
      <View style={{flex: 1, margin: 20}}>
        <View>
          <Text style={{fontWeight: 'bold'}}>Source : </Text>
          <Picker
            selectedValue={this.state.selectedSource}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({selectedSource: itemValue})
            }>
            <Picker.Item label="Tirunelveli" value="Tirunelveli" />
            <Picker.Item label="Kovilpatti" value="Kovilpatti" />
            <Picker.Item label="Madurai" value="Madurai" />
            <Picker.Item label="Trichy" value="Trichy" />
          </Picker>
          <Text style={{fontWeight: 'bold'}}>Destination : </Text>
          <Picker
            selectedValue={this.state.selectedDestination}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({selectedDestination: itemValue})
            }>
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
            <Button title="Threat" onPress={() => this.InsertRoute()} />
          </View>
        </View>
      </View>
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
});
