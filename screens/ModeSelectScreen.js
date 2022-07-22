import { View, Text, Button } from "react-native";
import { SafeAreaView, StyleSheet, Pressable } from "react-native";
import { GlobalStyles } from "../constants/styles";

function ModeSelectScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Pressable onPress={() => navigation.navigate("SelectDestinationScreen")} style={{marginBottom:20}}>
        <View style={{backgroundColor: GlobalStyles.colors.lightModeMainBlue, width: 200, height: 50, alignItems: "center", justifyContent: "center", borderRadius: 50}}>
          <Text style={{color: GlobalStyles.colors.lightModeWhiteText}}>Navigate to SelectDestinationScreen</Text>
        </View>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("ExploreScreen")}>
        <View style={{backgroundColor: GlobalStyles.colors.lightModeMainBlue, width: 200, height: 50, alignItems: "center", justifyContent: "center", borderRadius: 50}}>
          <Text style={{color: GlobalStyles.colors.lightModeWhiteText}}>Navigate to ExploreScreen</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default ModeSelectScreen;
