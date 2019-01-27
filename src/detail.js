import React, { Component } from 'react';
import { View, Text, ScrollView, AsyncStorage } from 'react-native';
import { Button, Icon } from 'native-base';

export default class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultFontSize: 20,
      textSize: 20,
      showFAB: false,
      debugInfo: false
    };
  }

  static navigationOptions = ({ navigation }) => {
    const carol = navigation.getParam('carol', { nazwa: '', tekst: '' });
    return {
      title: carol.nazwa,
      headerRight: (
        <View style={{ flexDirection: 'row' }}>
          <Button
            icon
            dark
            transparent
            onPress={navigation.getParam('settings')}
          >
            <Icon name="settings" />
          </Button>
        </View>
      )
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({
      settings: this.settingsHandler
    });
  }

  componentWillMount() {
    this.getStoredTextSize()
      .then(storedTextSize => {
        this.setState({ textSize: storedTextSize });
      })
      .catch(error => {
        this.setState({ textSize: this.state.defaultFontSize });
      });
  }

  settingsHandler = () => {
    this.setState({ showFAB: !this.state.showFAB });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          {this.state.debugInfo && (
            <Text> testowy tekst: {this.state.textSize}</Text>
          )}
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
        {this.state.showFAB && (
          <View
            style={{
              position: 'absolute',
              zIndex: 2,
              alignSelf: 'flex-end',
              padding: 12
            }}
          >
            <Button
              rounded
              iconRight
              success
              style={{ alignSelf: 'flex-end' }}
              onPress={this.increaseFontSize}
            >
              <Text style={{ paddingLeft: 12 }}>Zwiększ tekst</Text>
              <Icon name="add" />
            </Button>
            <Button
              rounded
              info
              style={{ alignSelf: 'flex-end', marginTop: 12 }}
              onPress={this.setDefaultFontSize}
            >
              <Text style={{ paddingLeft: 12, paddingRight: 12 }}>
                Przywróć domyślny rozmiar
              </Text>
            </Button>
            <Button
              rounded
              iconRight
              danger
              style={{ alignSelf: 'flex-end', marginTop: 12 }}
              onPress={this.decreaseFontSize}
            >
              <Text style={{ paddingLeft: 12 }}>Zmniejsz tekst</Text>
              <Icon name="remove" />
            </Button>
          </View>
        )}
      </View>
    );
  }

  increaseFontSize = () => {
    if (this.state.textSize >= 40) {
      return;
    }

    this.setState({ textSize: this.state.textSize + 1 }, () => {
      this.updateAsyncStorage();
    });
  };

  setDefaultFontSize = () => {
    this.setState({ textSize: this.state.defaultFontSize }, () => {
      this.updateAsyncStorage();
    });
  };

  decreaseFontSize = () => {
    if (this.state.textSize <= 5) {
      return;
    }

    this.setState({ textSize: this.state.textSize - 1 }, () => {
      this.updateAsyncStorage();
    });
  };

  getText() {
    const carol = this.props.navigation.getParam('carol', {
      nazwa: '',
      tekst: ''
    });

    return carol.tekst;
  }

  async updateAsyncStorage() {
    try {
      const obj = { textSizeNumber: this.state.textSize };
      console.log(obj.textSizeNumber);
      await AsyncStorage.setItem('textSize', JSON.stringify(obj));
    } catch (error) {
      console.log(error);
    }
  }

  async getStoredTextSize() {
    try {
      const value = await AsyncStorage.getItem('textSize');
      const fontSize = JSON.parse(value);
      return fontSize.textSizeNumber;
    } catch (error) {
      return 20;
    }
  }
}
