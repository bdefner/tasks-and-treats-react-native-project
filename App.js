import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import TabBar from './components/TabBar';
import FetchUserDataAndRedirectScreen from './screens/FetchUserDataAndRedirectScreen';
import LoginScreen from './screens/LoginScreen';
import SecureLogoutScreen from './screens/SecureLogoutScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import CartsContext from './utils/CartsContext';

const Stack = createNativeStackNavigator();

function AuthStack() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartsX, setCartsX] = useState([]);

  return (
    <CartsContext.Provider value={[cartsX, setCartsX]}>
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
          name="SecureLogoutScreen"
          component={SecureLogoutScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TabBar"
          component={TabBar}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </CartsContext.Provider>
  );
}

// function AuthenticatedStack() {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerStyle: { backgroundColor: Colors.primary500 },
//         headerTintColor: 'white',
//         contentStyle: { backgroundColor: Colors.primary100 },
//       }}
//     >
//       <Stack.Screen name="TabBar" component={TabBar} />
//     </Stack.Navigator>
//   );
// }

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
