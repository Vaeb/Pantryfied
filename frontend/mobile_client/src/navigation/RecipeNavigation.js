import {
  createStackNavigator,
} from 'react-navigation';

import SearchScreen from '../screens/SearchScreen';
import RecipeScreen from '../screens/RecipeScreen'; // shows nutrition and option to view instructions
import InstructionScreen from '../screens/InstructionsScreen';
import SearchResultsScreen from '../screens/SearchResultsScreen';

export default createStackNavigator(
  {
    SearchScreen,
    SearchResultsScreen,
    RecipeScreen,
    InstructionScreen,
  },
  {
    headerMode: 'none',
  },
);
