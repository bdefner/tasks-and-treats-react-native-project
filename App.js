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
import TaskList from './screens/TaskList';
import TestScreen from './screens/TestScreen';
import { colors, spacing } from './utils/globalStyleObjects';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <View style={styles.screen}>
        <StatusBar style="light" />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="TaskList">
            <Stack.Screen name="TaskList" component={TaskList} />
            <Stack.Screen name="TestScreen" component={TestScreen} />
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
