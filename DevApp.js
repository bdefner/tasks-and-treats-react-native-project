import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import TabBar from './components/TabBar';
import AddConnection from './screens/AddConnection';
import AddFriend from './screens/AddFriend';
import CreateNew from './screens/CreateNew';
import Help from './screens/Help';
import LoginScreen from './screens/LoginScreen';
import Settings from './screens/Settings';
import SignupScreen from './screens/SignupScreen';
import Tasks from './screens/Tasks';
import Treats from './screens/Treats';
import WelcomeScreen from './screens/WelcomeScreen';
import { colors, spacing } from './utils/styleConstants';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <View style={styles.screen}>
        <StatusBar style="light" />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="WelcomeScreen">
            <Stack.Screen
              name="WelcomeScreen"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={SignupScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: spacing.medium_2,
  },
});
