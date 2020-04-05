/*Example of SQLite Database in React Native*/
import React from 'react';
//For react-navigation 3.0+
//import { createAppContainer, createStackNavigator } from 'react-navigation';
//For react-navigation 4.0+
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from './pages/HomeScreen';
import RegisterDriver from './pages/RegisterDriver';
import ViewAllDriver from './pages/ViewAllDriver';
import TruckHomePage from './pages/TruckHomePage';
import OwnerLogin from './pages/components/Owner/OwnerLogin';
import OwnerRegistration from './pages/components/Owner/OwnerRegistration';
import DriverLogin from './pages/DriverLogin';
import DriverHomePage from './pages/DriverHomePage';
import OwnerHomePage from './pages/components/Owner/OwnerHomePage';
import LoadMap from './pages/LoadMap';
import RouteSelection from './pages/RouteSelection';
import ListThreat from './pages/ListThreat';

const App = createStackNavigator({
  TruckHomePage: {
    screen: TruckHomePage,
    navigationOptions: {
      title: 'Truck Management',
      headerStyle: {backgroundColor: '#f05555'},
      headerTintColor: '#ffffff',
    },
  },
  OwnerHomePage: {
    screen: OwnerHomePage,
    navigationOptions: {
      title: 'OwnerHomePage',
      headerStyle: {backgroundColor: '#f05555'},
      headerTintColor: '#ffffff',
    },
  },
  OwnerRegistration: {
    screen: OwnerRegistration,
    navigationOptions: {
      title: 'OwnerRegistration',
      headerStyle: {backgroundColor: '#f05555'},
      headerTintColor: '#ffffff',
    },
  },
  OwnerLogin: {
    screen: OwnerLogin,
    navigationOptions: {
      title: 'OwnerLogin',
      headerStyle: {backgroundColor: '#f05555'},
      headerTintColor: '#ffffff',
    },
  },
  DriverLogin: {
    screen: DriverLogin,
    navigationOptions: {
      title: 'DriverLogin',
      headerStyle: {backgroundColor: '#f05555'},
      headerTintColor: '#ffffff',
    },
  },
  DriverHomePage: {
    screen: DriverHomePage,
    navigationOptions: {
      title: 'DriverHomePage',
      headerStyle: {backgroundColor: '#f05555'},
      headerTintColor: '#ffffff',
    },
  },

  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Truck Management',
      headerStyle: {backgroundColor: '#f05555'},
      headerTintColor: '#ffffff',
    },
  },

  RegisterDiver: {
    screen: RegisterDriver,
    navigationOptions: {
      title: 'Register Driver',
      headerStyle: {backgroundColor: '#f05555'},
      headerTintColor: '#ffffff',
    },
  },
  ViewAllDriver: {
    screen: ViewAllDriver,
    navigationOptions: {
      title: 'View All Driver',
      headerStyle: {backgroundColor: '#f05555'},
      headerTintColor: '#ffffff',
    },
  },

  LoadMap: {
    screen: LoadMap,
    navigationOptions: {
      title: 'LoadMap',
      headerStyle: {backgroundColor: '#f05555'},
      headerTintColor: '#ffffff',
    },
  },
  RouteSelection: {
    screen: RouteSelection,
    navigationOptions: {
      title: 'RouteSelection',
      headerStyle: {backgroundColor: '#f05555'},
      headerTintColor: '#ffffff',
    },
  },
  ListThreat: {
    screen: ListThreat,
    navigationOptions: {
      title: 'ListThreat',
      headerStyle: {backgroundColor: '#f05555'},
      headerTintColor: '#ffffff',
    },
  },
});
export default createAppContainer(App);
