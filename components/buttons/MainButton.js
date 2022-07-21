import { Pressable, View, Text, StyleSheet} from "react-native";
import { GlobalStyles } from "../../constants/styles";

function MainButton({ text, isValid, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [pressed && isValid ? styles.pressed : null]}
      onPress={onPress}
    >
      <View style={[styles.button]}>
        <Text style={[styles.buttonText]}>{text}</Text>
      </View>
    </Pressable>
  );
}
export default MainButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: GlobalStyles.colors.lightModeMainBlue,
    borderRadius: 13,
    // padding: 20,
    width: 300,
    height: 59.4,
    justifyContent: "center",
  },
  buttonText: {
    color: GlobalStyles.colors.lightModeWhiteText,
    textAlign: "center",
    fontSize: 14,
    fontFamily: "SourceSansPro-Bold",
  },
  pressed: {
    opacity: 0.75,
  },
});
