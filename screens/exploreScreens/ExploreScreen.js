import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { GlobalStyles } from "../../constants/styles";

function ExploreScreen({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <Pressable
            style={({ pressed }) => [
             styles.button,
              pressed ? styles.buttonPressed : null,
            ]}
            onPress={() => navigation.goBack()}
          >
            <View style={styles.buttonView}>
              <Text style={styles.buttonText}>End</Text>
            </View>
          </Pressable>
         
        </View>
      </Camera>
    </View>
  );
}

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    marginBottom: 50,
    justifyContent: "center",
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: 'center'
  },
  buttonPressed: {
    opacity: 0.75
  },
  buttonView: {
    backgroundColor: GlobalStyles.colors.lightModeMainRed,
    borderRadius: 13,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "45%",
    height: 70,
    justifyContent: "center",
  },
  buttonText: {
    color: GlobalStyles.colors.lightModeWhiteText,
    textAlign: "center",
    fontSize: 30,
    fontFamily: "SourceSansPro-Black",
  },
});
