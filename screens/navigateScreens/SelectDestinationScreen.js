import { View, Text, Button } from "react-native";
import { SafeAreaView, StyleSheet, Pressable } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function SelectDestinationScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Pressable onPress={() => navigation.navigate("NavigationScreen")}>
        <View style={{backgroundColor: GlobalStyles.colors.lightModeMainBlue, width: 200, height: 50, alignItems: "center", justifyContent: "center", borderRadius: 50}}>
          <Text style={{color: GlobalStyles.colors.lightModeWhiteText}}>Navigate to NavigateScreen</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default SelectDestinationScreen;
