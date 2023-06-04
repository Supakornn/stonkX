import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Auth from './pages/Auth';
import HomeScreen from './pages/HomeScreen';
import AddItem from './pages/AddItem';
import Detail from './components/Detail';
import Question from './components/Question';


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name='Login' component={Auth} options={{ title: "Login | Register" }} />
        <Stack.Screen name='HomePage' component={HomeScreen} options={{ title: "Home", headerBackVisible: false }} />
        <Stack.Screen name='Admin' component={AddItem} options={{ title: "Admin" }} />
        <Stack.Screen name='Detail' component={Detail} options={{ title: "Detail" }} />
        <Stack.Screen name='Question' component={Question} options={{ title: "Question" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

