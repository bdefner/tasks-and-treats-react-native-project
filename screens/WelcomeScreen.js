import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import TabBar from '../components/TabBar';
import { spacing } from '../utils/styleConstants';

export default function Welcome() {
  const navigation = useNavigation();

  return (
    <View style={styles.screen}>
      <Image
        source={require('../assets/grafics/welcome.png')}
        style={styles.welcomeImg}
      />
      <Text>Welcome to Tasks & Treats</Text>
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
          navigation.navigate('Register');
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
    margin: spacing.medium_2,
  },
});
