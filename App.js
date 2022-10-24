// import { Redirect } from 'expo-router';
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
import { colors, spacing } from './utils/globalStyleObjects';

export default function App() {
  return (
    <>
      <View style={styles.screen}>
        <StatusBar style="light" />
        <TaskList />
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
