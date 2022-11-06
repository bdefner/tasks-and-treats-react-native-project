import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import TabBar from './components/TabBar';
import FetchUserDataAndRedirectScreen from './screens/FetchUserDataAndRedirectScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

function AuthStack() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Stack.Navigator
      initialRouteName={isLoggedIn ? 'TabBar' : 'WelcomeScreen'}
      // screenOptions={{
      //   headerShown: false,
      // }}
    >
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen
        name="FetchUserDataAndRedirect"
        component={FetchUserDataAndRedirectScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TabBar"
        component={TabBar}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="TabBar" component={TabBar} />
    </Stack.Navigator>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
}

export default function App() {


  return (
    <>
      <StatusBar style="dark" />
      <Navigation />
    </>
  );
}
