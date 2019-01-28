import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { ListItem, Item, Icon, Input, Button } from 'native-base';
import accents from 'remove-accents';
import teksty from '../assets/teksty.json';

export default class Main extends Component {
  constructor(props) {
    super(props);

    const carolList = teksty['koledy']['koleda'];
    this.state = {
      carolList: carolList,
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

    this.setState({ searchBarVisible: !this.state.searchBarVisible }, () => {
      if (this.state.searchBarVisible) {
        this.textInput._root.focus();
      }
    });
  };

  render() {
    return (
      <View>
        {this.state.searchBarVisible && (
          <View searchBar rounded style={{ paddingLeft: 15 }}>
            <Item>
              <Input
                ref={input => (this.textInput = input)}
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
          data={this.state.carolList
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
      let searchText = accents.remove(this.state.search.toLowerCase());
      let carolName = accents.remove(carol.nazwa.toLowerCase());
      return carolName.includes(searchText);
    }
  };

  updateSearch = search => {
    this.setState({ search });
  };

  clearSearch = () => {
    this.setState({ search: '' });
  };

  onListItemPress(item) {
    const pressedElement = this.state.carolList.find(x => x.nazwa === item.key);
    this.props.navigation.navigate('Details', {
      carol: pressedElement
    });
  }

  addKey(carol) {
    return { key: carol.nazwa };
  }

  alphabeticalSorting(a, b) {
    // to niestety nie zalatwia sprawy sortowania s i ś
    const aLowered = accents.remove(a.key.toLowerCase());
    const bLowered = accents.remove(b.key.toLowerCase());
    if (aLowered > bLowered) {
      return 1;
    }
    if (aLowered < bLowered) {
      return -1;
    }
    return 0;
  }
}
