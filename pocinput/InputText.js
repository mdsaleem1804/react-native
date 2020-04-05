import React, { Component } from "react";

import { View, StyleSheet, TextInput, Text } from "react-native";

export default class InputText extends Component {
  constructor(props) {
    super(props);
    this.state = { nameError: "", text: "" };
  }
  ShowMaxAlert = EnteredValue => {
    var TextLength = EnteredValue.length.toString();
    if (TextLength <= 5) {
      this.setState(() => ({ nameError: "P" }));
    } else {
      this.setState(() => ({ nameError: null }));
    }
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        <TextInput
          placeholder="Enter Your Name"
          maxLength={10}
          onChangeText={EnteredValue => this.ShowMaxAlert(EnteredValue)}
          style={styles.TextInputStyle}
        />
        {!!this.state.nameError && (
          <Text style={{ color: "red" }}>{this.state.nameError}</Text>
        )}
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ margin: 10 }}>TextInput with icon</Text>
          <TextInput
            style={{
              height: 40,
              width: 200,
              borderColor: "gray",
              borderWidth: 1
            }}
            onChangeText={text => this.setState({ text })}
            inlineImageLeft="username"
            inlineImagePadding={2}
            underlineColorAndroid="transparent"
            value={this.state.text}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10
  },

  TextInputStyle: {
    width: "90%",
    textAlign: "left",
    height: 45,
    margin: 15,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1
  }
});
