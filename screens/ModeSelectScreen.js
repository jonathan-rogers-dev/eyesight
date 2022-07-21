import { View, Text, Button } from "react-native";
import { SafeAreaView, StyleSheet, Pressable } from "react-native";

function ModeSelectScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Pressable onPress={() => navigation.navigate("ExploreScreen")}>Explore Screen</Pressable>
          <Pressable onPress={() => navigation.navigate("SelectDestinationScreen")}>Destination Screen</Pressable>
    </View>
  );
}

export default ModeSelectScreen;