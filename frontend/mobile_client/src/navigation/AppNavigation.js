import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainNavigator from './MainNavigator';
import LoginPage from '../components/LoginPage';

export default createAppContainer(
  createSwitchNavigator({
    Login: LoginPage,
    Main: MainNavigator,
  }),
);
