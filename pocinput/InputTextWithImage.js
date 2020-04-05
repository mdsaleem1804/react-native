import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Button
} from "react-native";

import DatePicker from "react-native-datepicker";
import { Dropdown } from "react-native-material-dropdown";
import { Colors } from "react-native/Libraries/NewAppScreen";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      nameError: "",
      namePass: "",
      ageError: "",
      agePass: "",
      date: "15-05-2018"
    };
  }
  CheckName = EnteredValue => {
    var TextLength = EnteredValue.length.toString();
    if (TextLength <= 3) {
      this.setState(() => ({ namePass: null }));
      this.setState(() => ({ nameError: "P" }));
    } else {
      this.setState(() => ({ nameError: null }));
      this.setState(() => ({ namePass: "P" }));
    }
  };
  CheckMobileNumber = EnteredValue => {
    var TextLength = EnteredValue.length.toString();
    if (TextLength != 10) {
      this.setState(() => ({ agePass: null }));
      this.setState(() => ({ ageError: "P" }));
    } else {
      this.setState(() => ({ ageError: null }));
      this.setState(() => ({ agePass: "P" }));
    }
  };
  render() {
    let genderData = [
      {
        value: "Male"
      },
      {
        value: "Female"
      }
    ];
    return (
      <KeyboardAvoidingView
        behavior={Platform.Os == "ios" ? "padding" : "height"}
        enabled
      >
        <ScrollView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <View
                style={{
                  backgroundColor: "red",
                  opacity: 0.7,
                  justifyContent: "center",
                  height: 50,
                  margin: 30
                }}
              >
                <Text
                  style={{
                    marginBottom: 5,
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "bold"
                  }}
                >
                  REGISTRATION
                </Text>
              </View>
              <Text styles={styles.inputLabel}>Name :</Text>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={{ flex: 1 }}
                  onChangeText={EnteredValue => this.CheckName(EnteredValue)}
                />

                {!!this.state.nameError && (
                  <Image
                    source={require("./images/untick.png")}
                    style={styles.ImageStyle}
                  />
                )}

                {!!this.state.namePass && (
                  <Image
                    source={require("./images/tick.png")}
                    style={styles.ImageStyle}
                  />
                )}
              </View>
              <View>
                <Text styles={styles.inputLabel}>Date Of birth :</Text>
              </View>
              <View style={styles.SectionStyle}>
                <DatePicker
                  style={{ flex: 1 }}
                  date={this.state.date} //initial date from state
                  mode="date" //The enum of date, datetime and time
                  format="DD/MM/YYYY"
                  onDateChange={date => {
                    this.setState({ date: date });
                  }}
                />
              </View>
              <View>
                <Dropdown label="Gender" data={genderData} />
              </View>
              <View>
                <Text styles={styles.inputLabel}>Mobile Number :</Text>
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  keyboardType="numeric"
                  style={{ flex: 1 }}
                  onChangeText={EnteredValue =>
                    this.CheckMobileNumber(EnteredValue)
                  }
                />

                {!!this.state.ageError && (
                  <Image
                    source={require("./images/untick.png")}
                    style={styles.ImageStyle}
                  />
                )}

                {!!this.state.agePass && (
                  <Image
                    source={require("./images/tick.png")}
                    style={styles.ImageStyle}
                  />
                )}
              </View>
              <View style={styles.buttonStyle}>
                <Button title="SAVE"></Button>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  inputLabel: {
    borderColor: "#CCCCCC",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20
  },
  container: {
    flex: 1,
    marginTop: 40,
    marginLeft: 10,
    marginTop: 10
  },

  SectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#000",
    height: 40,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 15
  },
  buttonStyle: {
    flex: 1,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 15
  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch",
    alignItems: "center"
  }
});
