import React from 'react';
import RazorpayCheckout from 'react-native-razorpay';
import {StyleSheet, View, Button} from 'react-native';

const App = props => {
  return (
    <View style={styles.screen}>
      <View style={styles.buttonContainer}>
        <Button
          title="POC-RAZORPAY1"
          onPress={() => {
            var options = {
              description: 'Registration',
              image: 'https://i.imgur.com/3g7nmJC.png',
              currency: 'INR',
              key: 'rzp_test_ulzqWkaXbIYc6C',
              amount: '500',
              name: 'Siva Sakthi Foundation',
              prefill: {
                email: 'test@gmail.com',
                contact: '9008481638',
                name: 'Razorpay Software',
              },
              theme: {color: '#F37254'},
            };
            RazorpayCheckout.open(options)
              .then(data => {
                // handle success
                alert(`Success: ${data.razorpay_payment_id}`);
              })
              .catch(error => {
                // handle failure
                alert(`Error: ${error.code} | ${error.description}`);
              });
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="POC-PAYUMONEY"
          onPress={() => {
            var options = {
              description: 'Registration',
              image: 'https://i.imgur.com/3g7nmJC.png',
              currency: 'INR',
              key: 'rzp_test_ulzqWkaXbIYc6C',
              amount: '500',
              name: 'Siva Sakthi Foundation',
              prefill: {
                email: 'test@gmail.com',
                contact: '9008481638',
                name: 'Razorpay Software',
              },
              theme: {color: '#F37254'},
            };
            RazorpayCheckout.open(options)
              .then(data => {
                // handle success
                alert(`Success: ${data.razorpay_payment_id}`);
              })
              .catch(error => {
                // handle failure
                alert(`Error: ${error.code} | ${error.description}`);
              });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 100,
    alignItems: 'center',
  },
  buttonContainer: {
    padding: 15,
  },
});

export default App;
