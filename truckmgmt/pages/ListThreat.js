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
  ActivityIndicator,
  FlatList,
} from 'react-native';

export default class ListThreat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      listItems: [],
      listItemsInner: [],
    };
  }
  componentDidMount() {
    fetch('https://test-react-5b3fc.firebaseio.com/truckmgmt.json')
      .then((response) => response.json())
      .then((data) => this.setState({listItems: data}))

      .then((data) => this.fetchSelectedData())
      .catch((error) => {
        console.error(error);
      });
  }
  fetchSelectedData() {
    console.log(this.state.listItems);
    const result = Object.keys(this.state.listItems).map(
      (key) => this.state.listItems[key],
    );
    this.setState({listItemsInner: result});
  }

  renderItem({item}) {
    return (
      <View
        style={{
          padding: 20,
        }}>
        <Text>Source : {item.Source}</Text>
        <Text>Destination : {item.Destination}</Text>
        <Text>Remarks : {item.Remarks}</Text>
        <View
          style={{
            borderBottomColor: 'orange',
            borderBottomWidth: 2,
          }}
        />
      </View>
    );
  }
  render() {
    return (
      <FlatList data={this.state.listItemsInner} renderItem={this.renderItem} />
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
});
