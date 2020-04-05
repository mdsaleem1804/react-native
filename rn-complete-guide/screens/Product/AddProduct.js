import React, { Component, useState, useEffect } from "react";
import ListView from "deprecated-react-native-listview";
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
import Input from "../../components/Input";
import ListProductNew from "./ListProductNew";
class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      validated: false
    };

    const [product_id, setproduct_id] = "";
    const [email] = "";
    const [product_name, setproduct_name] = React.useState("");
    const [product_qty, setproduct_qty] = React.useState("");
    const [product_amount, setproduct_amount] = React.useState("");
    const [product_url, setproduct_url] = React.useState("");
    const [products, setproducts] = React.useState([]);

    const URL = "https://test-react-5b3fc.firebaseio.com/product.json";
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      fetch("https://test-react-5b3fc.firebaseio.com/studentdetailstable.json")
        .then(response => response.json())
        .then(responseJson => {
          let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
          });
          let a = ds.cloneWithRows(responseJson);
          setproducts(a);
          console.log(products);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);
    validate = text => {
      console.log(text);
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(text) === false) {
        console.log("Email is Not Correct");
        this.setState({ email: text });
        return false;
      } else {
        this.setState({ email: text });
        console.log("Email is Correct");
      }
    };
    const InsertStudentRecordsToServer = () => {
      fetch("https://test-react-5b3fc.firebaseio.com/product.json", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: product_name,

          qty: product_qty,

          amount: product_amount,

          url: product_url
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          // Showing response message coming from server after inserting records.
          Alert.alert(responseJson.name);
          setproduct_name("");
          setproduct_qty("");
          setproduct_amount("");
          setproduct_url("");
        })
        .catch(error => {
          console.error(error);
        });
    };
    return (
      <View style={styles.MainContainer}>
        <Text style={{ fontSize: 20, textAlign: "center", marginBottom: 7 }}>
          {" "}
          ADD PRODUCTS FORM{" "}
        </Text>
        <TextInput
          placeholder="Email ID"
          onChangeText={text => this.validate(text)}
          value={this.state.email}
        />
        <Input
          style={styles.input}
          placeholder="Enter Name"
          onChangeText={text => setproduct_name(text)}
          value={product_name}
        />
        <Input
          style={styles.input}
          placeholder="Enter Qty"
          keyboardType="numeric"
          onChangeText={text => setproduct_qty(text)}
          value={product_qty}
        />
        <Input
          style={styles.input}
          placeholder="Enter Amount"
          keyboardType="numeric"
          onChangeText={text => setproduct_amount(text)}
          value={product_amount}
        />
        <Input
          style={styles.input}
          placeholder="Enter URL"
          onChangeText={text => setproduct_url(text)}
          value={product_url}
        />

        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.TouchableOpacityStyle}
          onPress={InsertStudentRecordsToServer}
        >
          <Text style={styles.TextStyle}> ADD PRODUCTS</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
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

export default AddProduct;
