import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Pressable, Vib } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { GlobalStyles } from "../../constants/styles";
import { Accelerometer, Gyroscope } from 'expo-sensors';
import * as Haptics from 'expo-haptics';
import axios from "axios";
import FormData from 'form-data';
import { Audio } from 'expo-av';
import * as Location from 'expo-location';
import * as FileSystem from 'expo-file-system';



let lastImageRequestSecond = -3;
let lastLocationRequestSecond = -3;

const EYESIGHT_LOCATION_FUNCTION_KEY = process.env.REACT_APP_EYESIGHT_LOCATION_FUNCTION_KEY;
const EYESIGHT_EXPLORE_FUNCTION_KEY = process.env.REACT_APP_EYESIGHT_EXPLORE_FUNCTION_KEY;

function ExploreScreen({ navigation }) {

  let camera = useRef();

  // States
  const [state, setState] = useState();
  const [hasPermissionCamera, setHasPermissionCamera] = useState(null);
  const [errorMsgLocation, setErrorMsgLocation] = useState(null);
  const [subscriptionAcc, setSubscriptionAcc] = useState(null);
  const [subscriptionGyro, setSubscriptionGyro] = useState(null);
  const [typeCamera, setTypeCamera] = useState(CameraType.back);
  const [location, setLocation] = useState(null);
  const [locationOld, setLocationOld] = useState(location);
  const [locationCount, setLocationCount] = useState(0);
  const [imageAnalysisCount, setImageAnalysisCount] = useState(0);
  const [sound, setSound] = useState();
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

  let currentSecond = new Date().getSeconds();
  const allowedResponseInterval = 35;

  const _subscribeAcc = () => {
    setSubscriptionAcc(
      Accelerometer.addListener(accelerometerData => {
        setUpdatedAccelerometerData(accelerometerData);
      })
    );
  };

  const _unsubscribeAcc = () => {
    subscriptionAcc && subscriptionAcc.remove();
    setSubscriptionAcc(null);
  };

  useEffect(() => {
    _subscribeAcc();
    return () => _unsubscribeAcc();
  }, []);

  // const { x, y, z } = updatedAccelerometerData;

  const _subscribeGyro = () => {
    setSubscriptionGyro(
      Gyroscope.addListener(gyroscopeData => {
        setUpdatedGyroscopeData(gyroscopeData);
      })
    );
  };

  const _unsubscribeGyro = () => {
    subscriptionGyro && subscriptionGyro.remove();
    setSubscriptionGyro(null);
  };

  useEffect(() => {
    _subscribeGyro();
    return () => _unsubscribeGyro();
  }, []);


  Accelerometer.setUpdateInterval(2000);
  Gyroscope.setUpdateInterval(2000);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermissionCamera(status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsgLocation('Permission to access location was denied');
        return;
      }

      let oldLocation = await Location.getLastKnownPositionAsync({});
      setLocationOld(oldLocation);
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsgLocation) {
    text = errorMsgLocation;
  } else if (location) {
    text = JSON.stringify(location);
  }

  useEffect(() => {
    const countTimer = setInterval(() => {
      setLocationCount((count) => count + 1);
      callLocationAPI();
      console.log("Count: " + locationCount);
      console.log("Location: " + location);
    }, 15000);
    return function cleanup() {
      clearInterval(countTimer);
    };
  }, []); // <- add empty brackets here

    useEffect(() => {
      const countTimer = setInterval(() => {
        setImageAnalysisCount((count) => count + 1);
        getImageAnalysis()
        console.log("Count Camera: " + imageAnalysisCount);
      }, 2000);
      return function cleanup() {
        clearInterval(countTimer);
      };
    }, []); // <- add empty brackets here


  /*
  if (Math.abs(currentSecond - lastLocationRequestSecond) > allowedResponseInterval) {

  }
  */


  const { x, y, z } = updatedAccelerometerData;


  async function getImageAnalysis() {
    //console.log(updatedAccelerometerData);
    if (updatedAccelerometerData.x > -0.5 && updatedAccelerometerData.x < 0.5 && updatedAccelerometerData.y > -0.3 && updatedAccelerometerData.y < 1.1 && updatedAccelerometerData.z > -0.5 && updatedAccelerometerData.z < 1) {
      if (updatedGyroscopeData.x > -0.1 && updatedGyroscopeData.x < 0.1 && updatedGyroscopeData.y > -0.5 && updatedGyroscopeData.y < 0.5 && updatedGyroscopeData.z > -0.1 && updatedGyroscopeData.z < 0.1) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)

        let images = [];
        let formData = new FormData();

        /*

        for (let i = 0; i < 2; i++) {
          images.push(await )
        }


        for (let i = 0; i < images.length; i++) {
          formData.append('', fs.createReadStream(images[i].uri));
        }
        */
       /*

        let image = await camera.current.takePictureAsync();

        var form = new FormData();
        form.append("", "image", image.uri);

        var settings = {
          "url": `https://eyesight-function.azurewebsites.net/api/eyesight-explore?code=${EYESIGHT_LOCATION_FUNCTION_KEY}`,
          "method": "POST",
          "timeout": 0,
          "processData": false,
          "mimeType": "multipart/form-data",
          "contentType": false,
          "data": form
        };

        ajax(settings).done(function (response) {
          console.log(response);
          const stringReponse = JSON.stringify(response.data);
          console.log(stringReponse);
          playAudio(stringReponse.replace(/"/g, ''));
        });
        */

    
        let image = await camera.current.takePictureAsync({base64: true});

        formData.append('', image);
        // console.log(image);
        console.log(image.uri);

        axios.post('https://eyesight-function.azurewebsites.net/api/eyesight-explore', {
          params: {
            code: EYESIGHT_EXPLORE_FUNCTION_KEY
          },
          data: formData,
        }).then(function (response) {
            const stringReponse = JSON.stringify(response.data);
            console.log(stringReponse);
            playAudio(stringReponse.replace(/"/g, ''));
          })
          .catch(function (error) {
            // handle error
            console.log(error);
            if (error.response) console.log(error.response.data);
            else console.log(error.message);
          });



        /*
 
        type.current.takePictureAsync().then(uri => {
 
          let imageUri = new FormData();
          console.log(uri);
 
          imageUri.append(uri);
 
          axios.post('https://eyesight-function.azurewebsites.net/api/eyesight-explore', {
            params: {
              'code': EYESIGHT_EXPLORE_FUNCTION_KEY
            },
            headers: { ...data.getHeaders() },
            data: imageUri,
          })
            .then(function (response) {
              const stringReponse = JSON.stringify(response.data);
              console.log(stringReponse);
              // playSound(stringReponse.js);
            })
            .catch(function (error) {
              // handle error
              console.log(error);
              if (error.response) console.log(error.response.data);
              else console.log(error.message);
            });
 
 
        });
        // 
 
        
            */


        // console.log("Accelerometer and Gyroscope are stable", updatedAccelerometerData, updatedGyroscopeData);
      }
    }
  }



  async function playAudio(url) {

    try {
      var audioURI = await FileSystem.downloadAsync(url, FileSystem.documentDirectory + 'audio.wav');
      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

      console.log(audioURI);
      const sound = new Audio.Sound();
      try {
        const { sound: playbackObject } = await Audio.Sound.createAsync(
          { uri: url },
          { shouldPlay: true }
        );
        // await sound.playAsync();
        // Your sound is playing!
        console.log("Playing sound");

        // Don't forget to unload the sound from memory
        // when you are done using the Sound object
        await sound.unloadAsync();

        setLocationOld(location);
      } catch (error) {
        console.log(error);
      }

    } catch (error) {
      console.log("No URL");
    }


    /*
    while (audioURI == null) {
      audioURI = await FileSystem.downloadAsync(url, FileSystem.documentDirectory + 'audio.wav');
    }
    */

  }

  async function callLocationAPI() {

    const oldLocation = await Location.getLastKnownPositionAsync({});
    console.log(oldLocation.coords.latitude, oldLocation.coords.longitude);
    const currentLocation = await Location.getCurrentPositionAsync({});
    console.log(currentLocation.coords.latitude, currentLocation.coords.longitude);

    axios.get('https://eyesight-function.azurewebsites.net/api/eyesight-location',
      {
        params: {
          code: EYESIGHT_LOCATION_FUNCTION_KEY,
          latNew: currentLocation.coords.latitude,
          lngNew: currentLocation.coords.longitude,
          latOld: oldLocation.coords.latitude,
          lngOld: oldLocation.coords.longitude,
        }
      })
      .then(function (response) {

        const stringReponse = JSON.stringify(response.data);
        console.log(stringReponse);
        playAudio(stringReponse.replace(/"/g, ''));
        setLocationOld(location);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        if (error.response) console.log(error.response.data);
        else console.log(error.message);
      });

    //await playAudio("https://eyesightdata.blob.core.windows.net/audio-location/290117957663199.wav");
  }


  if (hasPermissionCamera === null) {
    return <View />;
  }
  if (hasPermissionCamera === false) {
    return <Text>No access to camera</Text>;
  }


  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={typeCamera} ref={camera}>
        <View style={styles.buttonContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed ? styles.buttonPressed : null,
            ]}
            onPress={() => navigation.pop()}
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