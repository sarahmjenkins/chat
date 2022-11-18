import React from 'react';
import { View, Text, TextInput, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      name: '',
      color: '', 
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require("../assets/background-image.png")} style={styles.image}>
          
          <Text style={styles.title}>Chat!</Text>
          
          <View style={styles.innerContainer}>
            <TextInput
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
              placeholder="Your Name"
              style={styles.textInput}
              accessible={true}
              accessibilityLabel="Name input"
              accessibilityHint="Enter your name here"
            />

            <View style={styles.colorContainer}>
              <Text style={[styles.innerContainer, styles.colorText]}>Choose Background Color:</Text>
              <View style={styles.colorOptions}>
                <TouchableOpacity 
                  style={[styles.colors, styles.black]} 
                  onPress={() => this.setState({ color: "#090C08" })}
                  accessible={true}
                  accessibilityLabel="black"
                  accessibilityHint="Select for a black chat background"
                  accessibilityRole="button"
                />
                <TouchableOpacity 
                  style={[styles.colors, styles.purple]} 
                  onPress={() => this.setState({ color: "#474056" })}
                  accessible={true}
                  accessibilityLabel="purple"
                  accessibilityHint="Select for a purple chat background"
                  accessibilityRole="button"
                />
                <TouchableOpacity 
                  style={[styles.colors, styles.blue]} 
                  onPress={() => this.setState({ color: "#8A95A5" })}
                  accessible={true}
                  accessibilityLabel="blue"
                  accessibilityHint="Select for a blue chat background"
                  accessibilityRole="button"
                />
                <TouchableOpacity 
                  style={[styles.colors, styles.green]} 
                  onPress={() => this.setState({ color: "#B9C6AE" })}
                  accessible={true}
                  accessibilityLabel="green"
                  accessibilityHint="Select for a green chat background"
                  accessibilityRole="button"
                />
              </View>
            </View>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Chat", { name: this.state.name, color: this.state.color })}
              style={styles.button}
              accessible={true}
              accessibilityLabel="Join chat"
              accessibilityHint="Select to join chat"
              accessibilityRole="button"
            >
              <Text style={styles.buttonText}>Start Chatting</Text>
            </TouchableOpacity> 
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#fff',
  },
  innerContainer: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    height: '44%',
    width: '88%',
    backgroundColor: '#fff',
    bottom: '-10%',
    alignItems: 'left',
    justifyContent: 'center',
    borderRadius: 10,
  },
  textInput: {
    opacity: 50,
    width: '88%',
    height: 60,
    borderColor: '#757083',
    borderWidth: 1,
    borderRadius: 10,
    padding: '5%',
    marginLeft: 20,
    bottom: '-10%',
    // When I take this out, it's easier to tap on the name box, but the styling gets messed up. Are there any alternatives?
  },
  colorContainer: {
    justifyContent: 'left',
    width: '88%',
  },
  colorText: {
    opacity: 100,
    marginTop: 60,
    marginLeft: 20,
  },
  colorOptions: {
    flexDirection: 'row',
    marginLeft: 20,
  },
  colors: {
    borderRadius: 50,
    width: 40,
    height: 40,
    marginRight: 20,
    marginTop: -30,
  },
  black: {
    backgroundColor: '#090C08',
  },
  purple: {
    backgroundColor: '#474056',
  },
  blue: {
    backgroundColor: '#8A95A5',
  },
  green: {
    backgroundColor: '#B9C6AE',
  },
  button: {
    backgroundColor: '#757083',
    width: '88%',
    marginLeft: 20,
    height: 60,
    padding: '5%',
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '600',
    color: '#fff',
  },
})