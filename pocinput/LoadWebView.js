import * as React from "react";
import { WebView } from "react-native-webview";
import { StyleSheet, Text, View, Button } from "react-native";

export default class LoadWebView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "https://expo.io/"
    };
  }

  someEvent = e => {
    this.setState({ url: "https://expo.io/login" });
  };

  render() {
    const { url } = this.state;
    return (
      <React.Fragment>
        <WebView source={{ uri: url }} />
        <Button title="A" onClick={this.someEvent} />
      </React.Fragment>
    );
  }
}
