import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";
import { useRef } from "react";

const PlaceholderImage = require("./assets/adaptive-icon.png");

export default function App() {
  const imageRef = useRef();
  const [status, requestPermission] = MediaLibrary.usePermissions();

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        Alert.alert("Done!", "Photo is saved to your album.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (status === null) {
    requestPermission();
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <View ref={imageRef} collapsable={false}>
            <ImageViewer placeholderImageSource={PlaceholderImage} />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Enter text here" multiline={true} />
        </View>

        <View style={styles.footerContainer}>
          <Button label="Generate" title="Generate" theme="primary" />
          <Button label="Save" title="Save" onPress={onSaveImageAsync} />
        </View>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 90,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxHeight: "50%",
  },
  image: {
    width: "50%",
    height: "50%",
    resizeMode: "contain",
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxHeight: "30%",
  },
  input: {
    width: "92%",
    height: 150,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    textAlignVertical: "top",
  },
  footerContainer: {
    flex: 1 / 4,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
