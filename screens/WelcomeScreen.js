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

      <Image
        source={require('../assets/grafics/welcome.png')}
        style={styles.welcomeImg}
      />
      <Text>A productivity app that's fun to use</Text>
      <View style={styles.buttonWrap}>
        <View style={styles.button}>
          <Button
            title="Login"
            onPress={() => {
              navigation.navigate('Login');
            }}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Signup"
            onPress={() => {
              navigation.navigate('Signup');
            }}
          />
        </View>
      </View>
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
    width: 275,
    height: 265,
    margin: spacing.large_2,
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
  buttonWrap: {
    padding: spacing.large_2,
    flexDirection: 'row',
  },
  button: {
    padding: spacing.medium_1,
    margin: spacing.small,
  },
});
