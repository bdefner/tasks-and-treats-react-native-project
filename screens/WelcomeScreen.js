import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import AuthWrap from '../components/AuthWrap';
import TabBar from '../components/TabBar';
import CartsContext from '../utils/CartsContext';
import { colors, font, spacing } from '../utils/styleConstants';

export default function Welcome() {
  return (
    <View style={styles.screen}>
      <Text style={{ fontSize: font.size_2 }}>Welcome to</Text>

      <Image
        source={require('../assets/grafics/welcome.png')}
        style={styles.welcomeImg}
      />
      <Text>An anti-procrastination app</Text>
      <Text>that's fun to use</Text>
      <View>
        <AuthWrap />
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
});
