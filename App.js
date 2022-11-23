import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { LogBox } from 'react-native';
import TabBar from './components/TabBar';
import FetchUserDataAndRedirectScreen from './screens/FetchUserDataAndRedirectScreen';
import LoginScreen from './screens/LoginScreen';
import SecureLogoutScreen from './screens/SecureLogoutScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
// import AContext from './utils/context/AContext';
import BudgetContext from './utils/context/BudgetContext';
import CartsContext from './utils/context/CartsContext';

// import UserContext from './utils/context/UserContext';

LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createNativeStackNavigator();

function AuthStack() {
  const [carts, setCarts] = useState([]);
  const [budget, setBudget] = useState(0);

  return (
    <BudgetContext.Provider value={[budget, setBudget]}>
      <CartsContext.Provider value={[carts, setCarts]}>
        <Stack.Navigator initialRouteName={'WelcomeScreen'}>
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
    </BudgetContext.Provider>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </>
  );
}
