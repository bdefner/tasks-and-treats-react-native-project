import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import Lottie from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function SecureLogoutScreen({ route }) {
  const navigation = useNavigation();

  async function deleteUserData() {
    console.log(
      'token before: ',
      await SecureStore.getItemAsync('sessionToken'),
    );
    await SecureStore.deleteItemAsync('sessionToken').catch((error) => {
      'did not work', console.log(error);
    });
    console.log(
      'token after: ',
      await SecureStore.getItemAsync('sessionToken'),
    );
  }

  // ToDo: Clear all state variables. Just in case

  deleteUserData();

  setTimeout(() => {
    navigation.navigate('WelcomeScreen');
  }, 1500);

  return (
    <View style={styles.screen}>
      <Lottie
        source={require('../assets/grafics/goodbyeAnimation.json')}
        autoPlay
        loop={false}
        style={styles.lottieAnimation}
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
  lottieAnimation: {
    width: 150,
  },
});
