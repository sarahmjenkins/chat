import React from 'react';
import { View, Text } from 'react-native';

export default class Chat extends React.Component {
  componentDidMount() {
    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });
  }

  render() {
    let { color } = this.props.route.params;

    return (
      <View style={{ backgroundColor: color, flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 45, fontWeight: '600', color: "#fff" }}>Welcome to Chat!</Text>
      </View>
    )
  }
}