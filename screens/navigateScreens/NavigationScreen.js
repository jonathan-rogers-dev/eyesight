import { View, Text, Button } from "react-native";
import { SafeAreaView, StyleSheet, Pressable } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { Camera, CameraType } from "expo-camera";
import {useState, useEffect} from "react";

function NavigationScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
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
    <SafeAreaView style={{ flex: 1, marginTop: 60, alignItems: 'center'}}>
      <View style={styles.directionsContainer}>
        <Text style={styles.directionsText}>Turn left in 400 feet onto Main St.</Text>
        <Text style={styles.directionsText}>Turn right in 1000 feet onto Hamilton Drive</Text>
        <Text style={styles.directionsText}>Your destination is on the right</Text>
      </View>
      <View style={{height: "46%", width: "80%", borderRadius: 20, overflow: 'hidden', marginBottom: 20 }}>
      <Camera style={{height: "100%", width: "100%", }} type={CameraType.back}/>
      </View>

      <View style={styles.navigationInfoContainer}>
        <Text style={styles.navigationInfoText}>2.1 mi</Text>
        <Text style={styles.navigationInfoText}>10 min</Text>
        <Text style={styles.navigationInfoText}>10:24</Text>
      </View>
    </SafeAreaView>
  );
}

export default NavigationScreen;

const styles = StyleSheet.create({
  directionsContainer: {
    backgroundColor: GlobalStyles.colors.lightModeMainBlue,
    justifyContent: 'center',
    // alignContent: 'center',
    borderRadius: 20, 
    width: '80%',
    height: '30%',
    alignItems: 'center',
    marginBottom: 20
  },
  directionsText: {
    textAlign: 'left',  
    color: GlobalStyles.colors.lightModeWhiteText, 
    fontFamily: 'SourceSansPro-SemiBold', 
    fontSize: 25
  },
  navigationInfoContainer: {
    backgroundColor: GlobalStyles.colors.lightModeMainBlue,
    width: "80%",
    height: "8%",
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }, 
  navigationInfoText: {
    color: GlobalStyles.colors.lightModeWhiteText, 
    fontFamily: 'SourceSansPro-SemiBold', 
    fontSize: 25,
    marginHorizontal: 20
  }

});
