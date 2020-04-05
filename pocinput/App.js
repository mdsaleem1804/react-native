import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LoadWebView from "./LoadWebView";
import InputText from "./InputText";
import InputTextWithImage from "./InputTextWithImage";
import Welcome from "./Welcome";
export default function App() {
  return <InputTextWithImage />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
