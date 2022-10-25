import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Redirect } from 'expo-router';
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
import AddConnection from './screens/AddConnection';
import CreateNew from './screens/CreateNew';
import Help from './screens/Help';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import Settings from './screens/Settings';
import Start from './screens/Start';
import Tasks from './screens/Tasks';
import Treats from './screens/Treats';
import { colors, spacing } from './utils/globalStyleObjects';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <View style={styles.screen}>
        <StatusBar style="light" />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Start">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Start" component={Start} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Tasks" component={Tasks} />
            <Stack.Screen name="Treats" component={Treats} />
            <Stack.Screen name="CreateNew" component={CreateNew} />
            <Stack.Screen name="AddConnection" component={AddConnection} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Help" component={Help} />
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
