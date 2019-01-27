import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button, Icon } from 'native-base';

export default class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = { textSize: 14 };
  }

  static navigationOptions = ({ navigation }) => {
    const carol = navigation.getParam('carol', { nazwa: '', tekst: '' });
    return {
      title: carol.nazwa,
      headerRight: (
        <View style={{ flexDirection: 'row' }}>
          <Button
            icon
            transparent
            onPress={navigation.getParam('decreaseFontSize')}
          >
            <Icon name="remove" />
          </Button>
          <Button
            icon
            transparent
            onPress={navigation.getParam('increaseFontSize')}
          >
            <Icon name="add" />
          </Button>
        </View>
      )
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({
      decreaseFontSize: this.decreaseFontSizeHandler,
      increaseFontSize: this.increaseFontSizeHandler
    });
  }

  render() {
    return (
      <ScrollView>
        <Text> testowy tekst</Text>
        <Text
          style={{
            padding: 10,
            paddingBottom: 16,
            fontSize: this.state.textSize
          }}
        >
          {this.getText()}
        </Text>
      </ScrollView>
    );
  }

  decreaseFontSizeHandler = () => {
    const current = this.state.textSize;
    this.setState({ textSize: current - 1 });
  };

  increaseFontSizeHandler = () => {
    const current = this.state.textSize;
    this.setState({ textSize: current + 1 });
  };

  getText() {
    const carol = this.props.navigation.getParam('carol', {
      nazwa: '',
      tekst: ''
    });

    return carol.tekst;
  }
}
