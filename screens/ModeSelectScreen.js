import { View, Text, Button, Image } from "react-native";
import { SafeAreaView, StyleSheet, Pressable } from "react-native";
import { GlobalStyles } from "../constants/styles";

function ModeSelectScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 100, marginBottom: 45 }}>
        <Text style={styles.headingText}>
          Select a {"\n"}
          <Text style={{ color: GlobalStyles.colors.lightModeMainBlue }}>
            Mode
          </Text>
        </Text>
      </View>
      <View>
        <Pressable style={ ( {pressed} ) => [{marginBottom: 30}, pressed ? styles.buttonPressed : null]}
        onPress={() => navigation.navigate("NavigationScreen")}>
          <View style={styles.option}>
            <View
              style={{
                paddingTop: 20, 
                // padding: 20,
                // paddingLeft: 30,
                
              }}
            >
              <Text style={{ fontSize: 25, fontFamily: "SourceSansPro-Bold" }}>
                Navigate
              </Text>
              <Text
                style={{
                  fontFamily: "SourceSansPro-Regular",
                  fontSize: 16,
                  marginRight: 100,
                }}
              >
                Navigate to a specific location using GPS and live audio
                playback.
              </Text>
            </View>
            <View style={{position: 'absolute', }}>
              <Image
                style={{ resizeMode: "contain", height: 160, width: 80,  }}
                source={require("../assets/LocationIcon.png")}
              />
            </View>
          </View>
        </Pressable>
        <Pressable style={ ( {pressed} ) => [{marginBottom: 30}, pressed ? styles.buttonPressed : null]}
        onPress={() => navigation.navigate("ExploreScreen")}>
          <View style={styles.option}>
            <View
              style={{
                paddingTop: 20, 
                padding: 20,
                // paddingLeft: 30,
                
              }}
            >
              <Text style={{ fontSize: 25, fontFamily: "SourceSansPro-Bold" }}>
                Explore
              </Text>
              <Text
                style={{
                  fontFamily: "SourceSansPro-Regular",
                  fontSize: 16,
                  marginRight: 100,
                }}
              >
                Use the camera on your phone to explore your surroundings in real time.
              </Text>
            </View>
            <View style={{position: 'absolute', }}>
              <Image
                style={{ resizeMode: "contain", height: 200, width: 180, }}
                source={require("../assets/Paper_Plane.png")}
              />
            </View>
          </View>
        </Pressable>

      </View>
      <Image source={require("../assets/MockupsMountains.png")} style={{width: 392, height: 200, }}/>
    </View>
  );
}

export default ModeSelectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  headingText: {
    color: "black",
    fontSize: 50,
    fontFamily: "SourceSansPro-Black",
    textAlign: "center",
  },
  option: {
    backgroundColor: GlobalStyles.colors.lightModeAccentBlue,
    width: 330,
    height: 140,
    borderRadius: 30,
    flexDirection: "row-reverse",
    zIndex: 10
  },
  buttonPressed: {
    opacity: 0.75
  }
});
