import React from "react";
import {
  StyleSheet,
  View,
  Alert,
  TextInput,
  Button,
  Text,
  Platform,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";

import ListView from "deprecated-react-native-listview";
const ListProduct = props => {
    
  const [products, setproducts] = React.useState("");
  const LoadProducts = () => {
     setproducts = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    const pokemon = await pokemonApiCall.json();
    console.log(pokemon);
  };
  return (
    <View style={styles.MainContainer_For_Show_StudentList_Activity}>
      <TouchableOpacity
        activeOpacity={0.4}
        style={styles.TouchableOpacityStyle}
        onPress={LoadProducts}
      >
        <Text style={styles.TextStyle}> LIST PRODUCTS</Text>
      </TouchableOpacity>
      <Text>{products}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  MainContainer: {
    alignItems: "center",
    flex: 1,
    paddingTop: 30,
    backgroundColor: "#fff"
  },

  MainContainer_For_Show_StudentList_Activity: {
    flex: 1,
    paddingTop: Platform.OS == "ios" ? 20 : 0,
    marginLeft: 5,
    marginRight: 5
  },

  TextInputStyleClass: {
    textAlign: "center",
    width: "90%",
    marginBottom: 7,
    height: 40,
    borderWidth: 1,
    borderColor: "#FF5722",
    borderRadius: 5
  },

  TouchableOpacityStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 7,
    width: "90%",
    backgroundColor: "#00BCD4"
  },

  TextStyle: {
    color: "#fff",
    textAlign: "center"
  },

  rowViewContainer: {
    fontSize: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  input: {
    width: 290,
    textAlign: "left"
  }
});

export default ListProduct;
