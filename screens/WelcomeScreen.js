import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import TabBar from '../components/TabBar';
import { colors, font, spacing } from '../utils/styleConstants';

export default function Welcome() {
  const navigation = useNavigation();

  return (
    <View style={styles.screen}>
      <Text style={{ fontSize: font.size_2 }}>Welcome to</Text>
      <View style={styles.headingWrap}>
        {/* <Text style={styles.TasksInHeading}>Tasks</Text>
        <Text style={styles.QuestionMarkInHeading}>&</Text>
        <Text style={styles.TreatsInHeading}>Treats</Text> */}

        <Image
          source={require('../assets/grafics/text-logo.png')}
          style={{ width: 220, height: 80 }}
        />
      </View>
      <Image
        source={require('../assets/grafics/welcome.png')}
        style={styles.welcomeImg}
      />
      <Text>A productivity app that's fun to use</Text>
      <Button
        title="Login"
        onPress={() => {
          navigation.navigate('Login');
        }}
      />
      <Button
        title="Signup"
        onPress={() => {
          navigation.navigate('Signup');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeImg: {
    width: 281,
    height: 225,
    margin: spacing.large_1,
  },
  headingWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: spacing.large_1,
  },
  TasksInHeading: {
    color: colors.green_1,
    fontSize: 50,
    position: 'relative',
    left: -60,
    top: 30,
  },
  QuestionMarkInHeading: {
    fontSize: 80,
    position: 'relative',
  },
  TreatsInHeading: {
    color: colors.purple_1,
    fontSize: 50,
    position: 'relative',
    right: -60,
    bottom: 30,
  },
});
