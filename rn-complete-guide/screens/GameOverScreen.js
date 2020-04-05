import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ScrollView
} from "react-native";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import Colors from "../constants/Colors";
import MainButton from "../components/MainButton";

const GameOverScreen = props => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>The Game is Over !</TitleText>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/success.png")}
            //source={{
            //uri:
            //"https://cdn.pixabay.com/photo/2016/10/09/23/54/apple-1727393_960_720.jpg"
            //}}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <BodyText>
          Your phone needed
          <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to
          guess the number
          <Text style={styles.highlight}>{props.userNumber}</Text>
        </BodyText>
        <MainButton onPress={props.onRestart}>NEWGAME</MainButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: 30
  },
  image: {
    width: "100%",
    height: "100%"
  },
  highlight: {
    color: Colors.primary
  }
});

export default GameOverScreen;
