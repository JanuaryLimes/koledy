import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { ListItem, Item, Icon, Input, Button } from 'native-base';
import accents from 'remove-accents';
import teksty from '../assets/teksty.json';

export default class Main extends Component {
  constructor(props) {
    super(props);

    const tablicaKoled = teksty['koledy']['koleda'];
    this.state = {
      tablicaKoled: tablicaKoled,
      search: '',
      searchBarVisible: false
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Kolędy',
      headerRight: (
        <View style={{ flexDirection: 'row' }}>
          <Button icon dark transparent onPress={navigation.getParam('search')}>
            <Icon name="search" />
          </Button>
        </View>
      )
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({
      search: this.searchHandler
    });
  }

  searchHandler = () => {
    if (this.state.searchBarVisible) {
      this.clearSearch();
    }

    this.setState({ searchBarVisible: !this.state.searchBarVisible });
  };

  render() {
    return (
      <View>
        {this.state.searchBarVisible && (
          <View searchBar rounded style={{ paddingLeft: 15 }}>
            <Item>
              <Input
                placeholder="Szukaj"
                onChangeText={this.updateSearch}
                value={this.state.search}
              />
              <View style={{ flexDirection: 'row' }}>
                <Button icon dark transparent onPress={this.clearSearch}>
                  <Icon name="close" />
                </Button>
              </View>
            </Item>
          </View>
        )}
        <FlatList
          data={this.state.tablicaKoled
            .filter(this.filterSearch)
            .map(this.addKey)
            .sort(this.alphabeticalSorting)}
          renderItem={({ item }) => (
            <ListItem onPress={() => this.onListItemPress(item)}>
              <Text style={{ fontSize: 20 }}>{item.key}</Text>
            </ListItem>
          )}
        />
      </View>
    );
  }

  filterSearch = carol => {
    if (!this.state.search) {
      return true;
    } else {
      let sn = accents.remove(this.state.search.toLowerCase());
      let cn = accents.remove(carol.nazwa.toLowerCase());
      return cn.includes(sn);
    }
  };

  updateSearch = search => {
    this.setState({ search });
  };

  clearSearch = () => {
    this.setState({ search: '' });
  };

  onListItemPress(item) {
    const el = this.state.tablicaKoled.find(x => x.nazwa === item.key);
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
