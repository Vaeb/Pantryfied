import {
  createStackNavigator,
} from 'react-navigation';

import SearchScreen from '../screens/SearchScreen';
import RecipeScreen from '../screens/RecipeScreen'; // shows nutrition and option to view instructions
import InstructionScreen from '../screens/InstructionsScreen';

export default createStackNavigator({
  SearchScreen,
  RecipeScreen,
  InstructionScreen,
});
