import { useNavigation } from '@react-navigation/native';
import Lottie from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

async function fetchUserCarts(userId) {
  const apiBaseUrl = 'http://localhost:3000/api/carts';

  try {
    const response = await fetch(apiBaseUrl, {
      method: 'POST',
      header: {
        Accept: 'application/json',
        'content-type': 'application/json',
        mode: 'no-cors',
      },
      body: JSON.stringify({
        userId: userId,
      }),
    });
    const json = await response.json();
    console.log('json: ', json);
    return json;
  } catch (error) {
    console.log(error);
  }
}

export default function FetchUserDataAndRedirect({ route }) {
  const navigation = useNavigation();
  const userId = route.params.user.userId;
  let carts = [];

  useEffect(async () => {
    carts = await fetchUserCarts(userId);
  }, []);

  setTimeout(() => {
    navigation.navigate('TabBar', { carts: carts, user: route.params.user });
  }, 3100);

  return (
    <Lottie
      source={require('../assets/grafics/successAnimation.json')}
      autoPlay
      loop={false}
    />
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
