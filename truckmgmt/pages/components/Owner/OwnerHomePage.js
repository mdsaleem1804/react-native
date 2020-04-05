/*Home Screen With buttons to navigate to different options*/
import React from 'react';
import {View} from 'react-native';
import Mybutton from '../Mybutton';
import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'TruckDatabase.db'});
export default class OwnerHomePage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgrountedColor: 'white',
          flexDirection: 'column',
        }}>
        <Mybutton
          title="OwnerRegistration"
          customClick={() =>
            this.props.navigation.navigate('OwnerRegistration')
          }
        />
        <Mybutton
          title="Owner"
          customClick={() => this.props.navigation.navigate('OwnerLogin')}
        />
      </View>
    );
  }
}
