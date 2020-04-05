import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";
import HeaderButton from "../components/HeaderButton";
import MealList from "../components/MealList";

const FavoritesScreen = props => {
  const favMeals = useSelector(state => state.meals.favoriteMeals);
  if (favMeals.length === 0 || !favMeals) {
    return (
      <View style={styles.screen}>
        <Text>Not Favorite Meals Found. Start adding some !</Text>
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      <MealList listData={favMeals} navigation={props.navigation} />
    </View>
  );
};

FavoritesScreen.navigationOptions = navData => {
  return {
    headerTitle: "Your Favorites",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    marginTop: 30,
    alignItems: "center"
  }
});
export default FavoritesScreen;
