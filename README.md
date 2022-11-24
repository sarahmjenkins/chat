# Chat!

## Project description
This is a chat app for mobile devices created using React Native. The app provides a chat interface with options for users to share images and their location.

## Key Features

- A page where users can enter their name and choose a background color for the chat screen before joining the chat.
- A page displaying the conversation, as well as an input field and submit button.
- The chat provices users with two additional communication features: sending images and location data.
- Data gets stored online and offline.

## Required Tools

This project uses Expo to run locally. Free accounts are available at https://expo.dev. The Expo App can be downloaded on your mobile device to run the app. Android Studio is available to run Android Emulators.

This project uses Google Firebase to store both chat messages and images. Gmail accounts can be used to set up Firebase accounts. In the Chat.js file, your own Firebase credentials should be used for `firebaseConfig`. 

## Running the Project

1. Ensure Node.js and Expo are installed.

2. Clone project from GitHub in command line: 
- HTTPS: `$ git clone https://github.com/sarahmjenkins/chat.git`
- SSH: `$ git clone git@github.com:sarahmjenkins/chat.git`

3. Install dependencies:
`$ npm install`

4. Run using on your mobile device using the Expo app or Android studio:
`$ expo start`

## Project dependencies

    "@react-native-async-storage/async-storage": "~1.17.3",
    "@react-native-community/masked-view": "^0.1.11",
    "@react-native-community/netinfo": "9.3.5",
    "@react-navigation/native": "^6.0.13",
    "@react-navigation/stack": "^6.3.4",
    "expo": "~47.0.3",
    "expo-image-picker": "~14.0.2",
    "expo-location": "~15.0.1",
    "expo-status-bar": "~1.4.2",
    "firebase": "^8.10.1",
    "react": "18.1.0",
    "react-native": "0.70.5",
    "react-native-gesture-handler": "~2.8.0",
    "react-native-gifted-chat": "^1.0.4",
    "react-native-maps": "1.3.2",
    "react-native-reanimated": "~2.12.0",
    "react-native-safe-area-context": "4.4.1",
    "react-native-screens": "~3.18.0",
    "react-navigation": "^4.4.4"
