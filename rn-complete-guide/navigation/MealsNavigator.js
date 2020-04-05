import React from "react";

import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import FiltersScreen from "../screens/FiltersScreen";
import AddProduct from "../screens/Product/AddProduct";
import TextInputValidation from "../components/TextBoxValidation";
import MainActivity from "../screens/MainActivity";
const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
    fontFamily: "open-sans-bold"
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold"
  },
  headerTintColor: Colors.accent,
  headerTitle: "A Screen"
};
const MealsNavigator = createStackNavigator(
  {
    Categories: CategoriesScreen,
    CategoryMeals: {
      screen: CategoryMealsScreen
    },
    MealDetail: MealDetailScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.primary,
        fontFamily: "open-sans-bold"
      },
      headerTintColor: "white"
    }
  }
);

const MealsFavTabNavigator = createBottomTabNavigator({
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons
            name="ios-restaurant"
            size={25}
            //color={tabInfo.tin}
          />
        );
      }
    }
  },

  Favorites: {
    screen: FavoritesScreen,
    navigationOptions: {
      tabBarLabel: "Favorites!",
      tabBarIcon: tabInfo => {
        return <Ionicons name="ios-star" size={25} />;
      }
    }
  }
});

const FiltersNavigator = createStackNavigator(
  {
    Filters: FiltersScreen
  },
  {
    // navigationOptions: {
    //   drawerLabel: 'Filters!!!!'
    // },
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const MainNavigator = createDrawerNavigator(
  {
    MealsFavs: {
      screen: MealsFavTabNavigator,
      navigationOptions: {
        drawerLabel: "Meals"
      }
    },
    Filters: FiltersNavigator,
    Product: MainActivity,
    AddProducts: AddProduct,
    TextInputValidation: TextInputValidation
  },
  {
    contentOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: {
        fontFamily: "open-sans-bold"
      }
    }
  }
);
export default createAppContainer(MainNavigator);
