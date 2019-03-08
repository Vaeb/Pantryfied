import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import HomeScreen from 'Wherever';
import NutritionScreen from 'these';
import IngredientsScreen from 'will';
import InstructionsScreen from 'be';

// stack is like one screen loading on top of another one
const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    headerMode: 'none',
  },
);


// HomeStack.navigationOptions = {};
// not used yet

const RecipeStack = createStackNavigator({
  Nutrition: NutritionScreen,
  Ingredients: IngredientsScreen,
  Instructions: InstructionsScreen,
});

// tab navigator is like buttons at the bottom side scrolling through screens
export default createBottomTabNavigator({
  HomeStack,
  RecipeStack,
});
