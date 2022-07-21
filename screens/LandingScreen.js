import { View, Text, Button } from "react-native";
import { SafeAreaView, StyleSheet, Pressable } from "react-native";

function LandingScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Pressable onPress={() => navigation.navigate("ModeSelectScreen")}>Test</Pressable>
    </View>
  );
}

export default LandingScreen;
