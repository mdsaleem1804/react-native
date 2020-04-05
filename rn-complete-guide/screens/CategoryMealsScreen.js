import React from "react";
import { useSelector } from "react-redux";
import { Text, View } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import MealList from "../components/MealList";
const CategoryMealScreen = props => {
  const catId = props.navigation.getParam("categoryId");

  const availableMeals = useSelector(state => state.meals.filteredMeals);
  const displayedMeals = availableMeals.filter(
    meal => meal.categoryIds.indexOf(catId) >= 0
  );
  if (displayedMeals.length === 0 || !displayedMeals) {
    return (
      <View>
        <Text>Not Categories Found !</Text>
      </View>
    );
  }

  return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

CategoryMealScreen.navigationOptions = navigationData => {
  const catId = navigationData.navigation.getParam("categoryId");

  const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

  return {
    headerTitle: selectedCategory.title
  };
};

export default CategoryMealScreen;
