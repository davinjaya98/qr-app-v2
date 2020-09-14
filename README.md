# qr-app-v2
## Introduction
This app is built and relies heavily on Ionic framework. As right now, the current version of ionic that being used is ionic 5

Feel free to check their documentation:
https://ionicframework.com/docs/

Also the app is compiled with "Capacitor" instead of "Cordova"

Feel free to check their documentation:
https://capacitorjs.com/docs

## Prepare the libs
1. cd myApp
2. npm install
3. ionic cap sync

## Build Command
### Android
4. ionic capacitor add android
5. npm install ../capacitor-plugin-dcatalyst-decryptor
6. ionic cap sync
5. ionic capacitor build android

### iOS
4. ionic capacitory add ios

## Capacitor Plugin
The decryptor logic is done inside a jar file and API call, the jar file can be accessed from ionic by creating a bridge between the hybrid apps using capacitor

Feel free to check their documentation:
https://capacitorjs.com/docs/plugins