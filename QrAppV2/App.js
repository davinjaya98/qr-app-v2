/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
  Image,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { WebView } from 'react-native-webview';

import { RNCamera } from 'react-native-camera';

import Bg from './assets/bg/foam-cyan.svg';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
  const [cameraOn, setCameraOn] = useState(false);
  // const [content, setContent] = useState("https://github.com/facebook/react-native");
  const [content, setContent] = useState("");

  // Footer Functions 

  const triggerScanner = () => {
    console.log("Triggering Scanner");
    setCameraOn(!cameraOn);
  }

  const toggleSettingMenu = () => {
    console.log("Toggling Setting");
  }

  const renderContent = () => {
    if (content) {
      return (
        <WebView source={{ uri: content }} />
      );
    }
    else {
      return (
        <ImageBackground source={require('./assets/bg/foam-cyan.svg')} style={contentStyles.defaultBg}>
          <Text>Please scan the QR Code using the button below</Text>
        </ImageBackground>
      );
    }
  }

  const showContentOrCamera = () => {
    if (cameraOn) {
      return (
        <RNCamera ref={ref => { this.camera = ref; }} style={{ flex: 1, width: '100%', }}></RNCamera>
      );
    }
    else {
      return (
        renderContent()
      );
    }
  }

  return (
    <SafeAreaView>
      <View style={coreBodyStyles.container}>
        {/* Header */}
        <View style={headerStyles.container}>
          <Image source={require('./assets/logo/logo-black.png')} style={headerStyles.logo}></Image>
          {/* <Bg /> */}
          <TouchableHighlight onPress={toggleSettingMenu}>
            <View>
              <Icon name={'bars'} style={headerStyles.icons} />
            </View>
          </TouchableHighlight>
        </View>
        {/* Content / Camera */}
        <View style={contentStyles.container}>
          {/* Call a function to determine which function to show  */}
          {showContentOrCamera()}
        </View>
        {/* Footer */}
        <View style={footerStyles.container}>
          <TouchableHighlight onPress={triggerScanner} style={footerStyles.scannerView}>
            <View>
              <Icon name={cameraOn ? 'times-circle' : 'qrcode'} style={footerStyles.scannerIcon} />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
};

const coreBodyStyles = StyleSheet.create({
  container: {
    height: '100%'
  },
});

const headerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingBottom: 16,
    height: 65
  },
  logo: {
    marginLeft: 16,
    width: 100,
    resizeMode: 'contain',
    backgroundColor: 'white',
    aspectRatio: 3,
  },
  icons: {
    // color: '#141145',
    marginRight: 16,
    color: '#339af0',
    fontSize: 20
  },
});

const contentStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // backgroundColor: 'red',
  },
  defaultBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  }
});

const footerStyles = StyleSheet.create({
  container: {
    // backgroundColor: '#F5F5F5',
    display: 'flex',
    width: '100%',
    minHeight: 47,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scannerView: {
    position: 'absolute',
    top: -28,
    left: '50%',
    transform: [{ translateX: -28 }],
  },
  scannerIcon: {
    padding: 16,
    borderRadius: 100,
    backgroundColor: '#141145',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    color: '#fff',
    fontSize: 22,
  }
});

export default App;
