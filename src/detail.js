import React, { Component } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';

export default class Detail extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => {
    const carol = navigation.getParam('carol', { nazwa: '', tekst: '' });
    return {
      title: carol.nazwa,
      headerRight: <Button onPress={() => alert(carol.tekst)} title="+" />
    };
  };

  render() {
    return (
      <ScrollView>
        <Text style={{ padding: 10, paddingBottom: 16 }}>{this.getText()}</Text>
      </ScrollView>
    );
  }

  getText() {
    const carol = this.props.navigation.getParam('carol', {
      nazwa: '',
      tekst: ''
    });

    return carol.tekst;
  }
}
