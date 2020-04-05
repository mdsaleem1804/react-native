import React from "react";
import { View, Text } from "react-native";

const ListProductNew = props => {
  console.log("articles: ", props.articles);
  return (
    <View>
      {props.articles.map((article, index) => {
        return <Text key={index}>{article.title}</Text>;
      })}
    </View>
  );
};

export default ListProductNew;
