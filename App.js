import { createStackNavigator } from '@react-navigation/stack';
import TodoView from './Components/TodoView';
import { NavigationContainer } from '@react-navigation/native';
import CreateTodoItem from './Components/CreateTodoItem';
import { store } from './Store/Store';
import { Provider } from 'react-redux';
import {persistor} from "./Store/Store"
import { PersistGate } from 'redux-persist/lib/integration/react';
import { StatusBar } from 'react-native';
const Stack = createStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
        <StatusBar
        animated={true}
        backgroundColor="#5F33E1"
      />
      <PersistGate loading={null} persistor={persistor}>
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown : false ,keyboardHandlingEnabled :true}}>
      <Stack.Screen name='TodoView' component={TodoView}/>
      <Stack.Screen name='CreateTodoItem' component={CreateTodoItem} options={{
        animationTypeForReplace : "push",
      }}/>
    </Stack.Navigator>
    </NavigationContainer>
    </PersistGate>
    </Provider>

  )
}

export default App;