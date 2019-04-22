import { createStackNavigator } from 'react-navigation';

import MainSettingsPage from '../screens/MainSettingsScreen';
import PreferencesScreen from '../screens/PreferencesScreen';
import PersonalDetailsScreen from '../screens/PersonalDetailsScreen';
import AccountDetailsScreen from '../screens/AccountDetailsScreen';
import LogoutScreen from '../screens/LogoutScreen';
import UnitsScreen from '../screens/UnitsScreen';

export default createStackNavigator(
  {
    MainSettingsPage,
    PreferencesScreen,
    PersonalDetailsScreen,
    AccountDetailsScreen,
    LogoutScreen,
    UnitsScreen,
  },
  {
    headerMode: 'none',
  },
);
