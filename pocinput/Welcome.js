import React, { Component } from "react";
import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  ScrollView
} from "react-native";

class Welcome extends Component {
  render() {
    return (
      <SafeAreaView>
        <KeyboardAvoidingView
          behavior={Platform.Os == "ios" ? "padding" : "height"}
          enabled
        >
          <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.inner}>
                <Text style={styles.header}>Shine - Registration</Text>
                <TextInput placeholder="Name" style={styles.input} />
                <TextInput placeholder="Email" style={styles.input} />
                <TextInput placeholder="MobileNo" style={styles.input} />
                <TextInput placeholder="Password" style={styles.input} />
                <TextInput
                  placeholder="Confrim Password"
                  style={styles.input}
                />
                <View style={styles.btnContainer}>
                  <Button title="Submit" onPress={() => null} />
                </View>
                <View style={{ flex: 1 }} />
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "flex-end"
  },
  header: {
    fontSize: 36,
    marginTop: 50,
    marginBottom: 8
  },
  input: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 2
  }
});

export default Welcome;
