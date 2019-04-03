import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import SearchStack from './RecipeNavigation';
import FavouritesScreen from '../screens/FavouritesScreen';
import MainSettingsScreen from '../screens/MainSettingsScreen';

// stack is like one screen loading on top of another one
const FavouritesStack = createStackNavigator(
  {
    Favourites: FavouritesScreen,
  },
  {
    headerMode: 'none',
  },
);

FavouritesStack.navigationOptions = {
  tabBarLabel: 'Favourites',
};

const SettingsStack = createStackNavigator(
  {
    MainSettings: MainSettingsScreen,
  },
  {
    headerMode: 'none',
  },
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
};

SearchStack.navigationOptions = {
  tabBarLabel: 'Search',
};

// tab navigator is like buttons at the bottom side scrolling through screens
export default createBottomTabNavigator({
  FavouritesStack,
  SearchStack,
  SettingsStack,
});
