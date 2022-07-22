import { Pressable, View, Text, StyleSheet} from "react-native";
import { GlobalStyles } from "../../constants/styles";

function MainButton({ children, style, overallStyle, isValid, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [pressed && isValid ? styles.pressed : null]}
      onPress={onPress}
    >
      <View style={[styles.button, overallStyle]}>
        <Text style={[styles.buttonText, style]}>{children}</Text>
      </View>
    </Pressable>
  );
}
export default MainButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: GlobalStyles.colors.lightModeMainBlue,
    borderRadius: 13,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "100%",
    justifyContent: "center",
  },
  buttonText: {
    color: GlobalStyles.colors.lightModeWhiteText,
    textAlign: "center",
    fontSize: 20,
    fontFamily: "SourceSansPro-Black",
  },
  pressed: {
    opacity: 0.75,
  },
});
