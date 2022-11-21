import React from 'react';
import { View,Text, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: '',
        avatar: '',
        name: '',
      },
      loggedInText: 'Please wait while we log you in.'
    }

    // set up firebase
    const firebaseConfig = {
      apiKey: "AIzaSyA1msZAIh8ucOmTzZgvdXwbTL9INP2kxEE",
      authDomain: "chat-d6853.firebaseapp.com",
      projectId: "chat-d6853",
      storageBucket: "chat-d6853.appspot.com",
      messagingSenderId: "317029713479",
      appId: "1:317029713479:web:a51502a314637a00b8d362",
      measurementId: "G-NXN2PVT7PW"
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    this.referenceChatMessages = firebase.firestore().collection('messages');
  }

  // set initial state of app once logged in
  componentDidMount() {
    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });

    this.referenceChatMessages = firebase.firestore().collection('messages');

    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }

      this.setState({
        uid: user.uid,
        messages: [],
        user: {
          _id: user.uid,
          name: name,
        },
        loggedInText: 'You are logged in',
      });

      this.unsubscribe = this.referenceChatMessages.orderBy('createdAt', 'desc').onSnapshot(this.onCollectionUpdate);
    });
  };

  componentWillUnmount() {
    this.authUnsubscribe;
  };

  // adds sent messages to state and database
  onSend(messages = []) {
    this.setState(
      (previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {this.addMessage()}
    );
  }

  // adds sent message to database
  addMessage() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      uid: this.state.uid,
      _id: message._id,
      text: message.text,
      createdAt: message.createdAt,
      user: message.user,
    });
  }

  // update anytime database changes
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      messages.push({
        _id: data.id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
      });
    });

    this.setState({
      messages,
    });
  };
  
  // Makes sender text bubble black
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000'
          }
        }}
      />
    )
  }

  // UI
  render() {
    let { color } = this.props.route.params;

    return (
      <View style={{ backgroundColor: color, flex: 1 }}>
        <Text>{this.state.loggedInText}</Text>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.state.uid,
            avatar: "https://placeimg.com/140/140/any",
          }}
        />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
      </View>
    )
  }
}
