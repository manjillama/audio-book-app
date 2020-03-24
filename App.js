import React from 'react';
import { View } from 'react-native';
import { AppLoading } from 'expo';
import { Container, Content, Text } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import reduxThunk from 'redux-thunk';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';

import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import BookViewScreen from './src/screens/BookViewScreen';

import { PRIMARY_COLOR } from './src/constants/Colors';

import MediaBottomSheet from './src/components/MediaBottomSheet';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './src/reducers';
import { connect } from 'react-redux';

const store = createStore(
  reducers,
  {},
  applyMiddleware(reduxThunk)
);

/*
* Manually hiding the bottom navigation tab when media player bottom sheet is opened
* Just to fix the android bottom tab not getting overlapped by media player bottom sheet smh
*/
const bottomTabNavigation = props => {
  return <BottomTabBar {...props} style={[props.showBottomTabs ? {}:{opacity: 0}, {borderTopColor: '#000'}]}/>;
}
function mapStateToProps({showBottomTabs}){
  return {showBottomTabs}
}
const TabBarComponent = connect(mapStateToProps)(bottomTabNavigation);


const bottomMediaPanel = props => {
  return props.media.currentlyPlaying ? <MediaBottomSheet {...props}/> : null;
}

function mapStateToProps1({media}){
  return {media}
}
const MediaBottomPanel = connect(mapStateToProps1)(bottomMediaPanel);

const switchNavigator = createSwitchNavigator({
  mainFlow: createBottomTabNavigator({
    Home: createStackNavigator({
      Home: HomeScreen,
      BookView: BookViewScreen,
    },{
      headerMode: 'none'
    }),
    Search: createStackNavigator({
      Search: SearchScreen,
      BookView: BookViewScreen,
    },{
      headerMode: 'none'
    }),
    // MyBooks: MyBooksScreen,
    // Profile: createStackNavigator({
    //   Profile: ProfileScreen,
    //   About: AboutScreen
    // },{
    //   headerMode: 'none'
    // }),
  },{
    tabBarComponent: props => (
      <View>
        <MediaBottomPanel {...props}/>
        <TabBarComponent {...props}/>
      </View>
    ),
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;

        switch (routeName) {
          case 'Home':
            iconName = 'ios-home';
            break;
          case 'Search':
            iconName = 'ios-search';
            break;
          case 'MyBooks':
            iconName = 'ios-book'
            break;
            // focused ? 'ios-search' : 'ios-search';
          case 'Profile':
            iconName = 'ios-person';
            break;
          default:
            iconName = 'ios-information-circle'
        }

        if (routeName === 'Home') {

          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
        } else if (routeName === 'Settings') {
          iconName = focused ? 'ios-list-box' : 'ios-list';
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: PRIMARY_COLOR,
      inactiveTintColor: 'gray',
    },
  })
});

const Navigation = createAppContainer(switchNavigator);


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return <Provider store={store}>
      <Navigation theme="dark"/>
    </Provider>
  }
}
