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
      loggedInText: 'Please wait while we log you in.'
    }

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

    this.referenceMessages = firebase.firestore().collection('messages');
  }

  componentDidMount() {
    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });

    this.referenceMessages = firebase.firestore().collection('messages');

    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }

      this.setState({
        messages: [
          {
            _id: 1,
            text: `Hello ${name}`,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
          {
            _id: 2,
            text: `Welcome to the Chat! app. ${name} has entered the chat.`,
            createdAt: new Date(),
            system: true,
          },
        ],
        uid: this.state.uid,
        loggedInText: 'You are logged in',
      })

      this.referenceMessagesUser = firebase.firestore().collection('user').where('uid', '==', this.state.uid);

      this.unsubscribeMessagesUser = this.referenceMessagesUser.onSnapshot(this.onCollectionUpdate);
    });
  };

  componentWillUnmount() {
    this.authUnsubscribe;
    this.unsubscribeMessagesUser;
  }l

  // Adds sent messages to state
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));

    () => {this.addMessage(this.state.messages[0])};
  }

  addMessage() {
    const message = this.state.messages[0];
    this.referenceMessages.add({
      _id: message._id,
      text: message.text,
      createdAt: message.createdAt,
      user: {
        _id: message.user._id,
        name: message.user.name,
        avatar: message.user.avatar,
      },
    });
  }

  onCollectionUpdate() {
    const messages = [];
    querySnapshot.forEach((doc) => {
      var data = doc.data();
      messages.push({
        _id: data.id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
        }
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
            _id: 1,
          }}
        />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
      </View>
    )
  }
}
