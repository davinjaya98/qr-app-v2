import React, { useState } from 'react';
import { StyleSheet, Image, Text, View, ScrollView, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function App() {
  const [content, setContent] = useState("This is Content Body");

  // Footer Functions 

  const triggerScanner = () => {
    console.log("Triggering Scanner");
  }

  const toggleSettingMenu = () => {
    console.log("Toggling Setting");
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={headerStyles.container}>
        <Text>Powered By:
        </Text>
        <Image source={require('./assets/logo/logo-black.png')} style={headerStyles.logo}></Image>
      </View>
      {/* Content */}
      <ScrollView>
        <Text>{content}</Text>
      </ScrollView>
      {/* Footer */}
      <View style={footerStyles.container}>
        <Text style={footerStyles.textWrapper}></Text>
        <Text style={footerStyles.textWrapper}>
          <TouchableHighlight onPress={triggerScanner} style={footerStyles.scannerView}>
            <View>
              <Icon name={'qrcode'} style={footerStyles.scannerIcon} />
            </View>
          </TouchableHighlight>
        </Text>
        <Text style={footerStyles.textWrapper}>
          <TouchableHighlight onPress={toggleSettingMenu}>
            <View>
              <Icon name={'cog'} style={footerStyles.icons} />
            </View>
          </TouchableHighlight>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const headerStyles = StyleSheet.create({
  container: {
    width: '100%',
  },
  logo: {
    // width: '100%',
    // height: undefined,
    // aspectRatio: 135 / 76,
    // height: 52
  },
});

const footerStyles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    display: 'flex',
    width: '100%',
    minHeight: 47,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    flexBasis: '33.33%',
    height: '100%',
  },
  scannerView: {
    position: 'absolute',
    top: -28,
    left: '50%',
    transform: [{ translateX: -28 }],
    justifyContent: 'center',
  },
  scannerIcon: {
    // padding: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    height: 56,
    borderRadius: 100,
    backgroundColor: '#141145',
    boxShadow: '0 1px 5px rgba(0, 0, 0, 1)',
    color: '#fff',
    fontSize: 22,
  },
  icons: {
    fontSize: 20
  },
});