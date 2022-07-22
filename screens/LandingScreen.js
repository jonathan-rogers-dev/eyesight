import { View, Text, Button } from "react-native";
import { SafeAreaView, StyleSheet, Pressable, Image } from "react-native";
import { GlobalStyles } from "../constants/styles";
import MainButton from "../components/buttons/MainButton";


function LandingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={[styles.subContainer, {justifyContent:"flex-end" }]}>
        <Image style={{resizeMode: "center", height: 230
          }} source={require("../assets/landingPageImage.png")} />
      </View>

      <View style={styles.subContainer}>
        <Text style={styles.welcomeTextWhite}>Welcome to</Text>
        <Text style={styles.welcomeTextBlue}>Eyesight</Text>
        <Text style={[styles.descriptionText, {color:GlobalStyles.colors.lightModeBlackText}]}>
          <Text style={[styles.descriptionText, {color:GlobalStyles.colors.lightModeBlackText}]}>The first,</Text>
          <Text style={[styles.descriptionText, {color:GlobalStyles.colors.lightModeMainBlue}]}> open sourced</Text>
          <Text style={[styles.descriptionText, {color:GlobalStyles.colors.lightModeBlackText}]}> visual assistance app.</Text>
        </Text>
        <View style={styles.button}>
          <MainButton isValid={true} onPress={() => navigation.push("ModeSelectScreen")}>Get Started</MainButton>
        </View>      
      </View>
    </View>
  );
}

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.lightModeBackground,
  },
  subContainer: {
    flex: 2,
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    alignItems: "center",
  },
  welcomeTextWhite: {
    fontFamily: "SourceSansPro-Bold",
    fontSize: 40,
    textAlign: "center",
    color: GlobalStyles.colors.lightModeBlackText,
  },
  welcomeTextBlue: {
    fontFamily: "SourceSansPro-Black",
    fontSize: 40,
    textAlign: "center",
    color: GlobalStyles.colors.lightModeMainBlue,
  },
  descriptionText: {
    marginTop: 10,
    fontFamily: "SourceSansPro-SemiBold",
    fontSize: 24,
    textAlign: "center",
    color: GlobalStyles.colors.lightModeBlackText,
  },
  image : {
    height: "100%",
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
  },
});