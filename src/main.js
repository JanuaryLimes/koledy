import React, { Component } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import teksty from '../assets/teksty.json';
import { ListItem } from 'native-base';
import accents from 'remove-accents';

export default class Main extends Component {
  constructor(props) {
    super(props);

    const tablicaKoled = teksty['koledy']['koleda'];
    this.state = { tablicaKoled: tablicaKoled };
  }

  static navigationOptions = {
    title: 'Kolędy'
  };

  render() {
    return (
      <View>
        <FlatList
          data={this.state.tablicaKoled
            .map(this.addKey)
            .sort(this.alphabeticalSorting)}
          renderItem={({ item }) => (
            <ListItem onPress={() => this.onListItemPress(item)}>
              <Text>{item.key}</Text>
            </ListItem>
          )}
        />
      </View>
    );
  }

  onListItemPress(item) {
    const el = this.state.tablicaKoled.find(x => (x.nazwa = item.key));
    this.props.navigation.navigate('Details', {
      carol: el
    });
  }

  addKey(x) {
    return { key: x.nazwa };
  }

  alphabeticalSorting(a, b) {
    // to niestety nie zalatwia sprawy sortowania s i ś
    const aLow = accents.remove(a.key.toLowerCase());
    const bLow = accents.remove(b.key.toLowerCase());
    if (aLow > bLow) {
      return 1;
    }
    if (aLow < bLow) {
      return -1;
    }
    return 0;
  }
}
