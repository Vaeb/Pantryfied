/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

// List of classes will go down here:
// import App from "./App";
import App from './src/App';
import Login from './src/routes/Login';
import SignUp from './src/routes/SignUp';

AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerComponent(appName, () => Login);
// AppRegistry.registerComponent(appName, () => SignUp);
