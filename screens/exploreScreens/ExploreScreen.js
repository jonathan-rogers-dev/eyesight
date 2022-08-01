import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Pressable, Vib} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { GlobalStyles } from "../../constants/styles";
import { Accelerometer, Gyroscope} from 'expo-sensors';
import * as Haptics from 'expo-haptics';

function ExploreScreen({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);

  const [updatedAccelerometerData, setUpdatedAccelerometerData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [updatedGyroscopeData, setUpdatedGyroscopeData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  Accelerometer.setUpdateInterval(1000);
  Gyroscope.setUpdateInterval(1000);

  useEffect(() => {
    Accelerometer.addListener(accelerometerData => {
      setUpdatedAccelerometerData(accelerometerData);
    })
  }, []);

  useEffect(() => {
    Gyroscope.addListener(gyroscopeData => {
      setUpdatedGyroscopeData(gyroscopeData);
    })
  }, []);


  //console.log(updatedAccelerometerData);
  if (updatedAccelerometerData.x > -0.5 && updatedAccelerometerData.x < 0.5 && updatedAccelerometerData.y > -0.3 && updatedAccelerometerData.y < 1.1 && updatedAccelerometerData.z > -0.5 && updatedAccelerometerData.z < 1) {
    if (updatedGyroscopeData.x > -0.1 && updatedGyroscopeData.x < 0.1 && updatedGyroscopeData.y > -0.5 && updatedGyroscopeData.y < 0.5 && updatedGyroscopeData.z > -0.1 && updatedGyroscopeData.z < 0.1) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
      console.log("Accelerometer and Gyroscope are stable", updatedAccelerometerData, updatedGyroscopeData);
    }
  }
  const { x, y, z } = updatedAccelerometerData;


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
