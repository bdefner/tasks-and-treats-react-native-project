import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import Lottie from 'lottie-react-native';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import budgetContext from '../utils/context/BudgetContext';
import CartsContext from '../utils/context/CartsContext';
import Global from '../utils/globals';
import globals from '../utils/globals';

async function StoreSessionTokenInGlobal() {
  Global.sessionToken = await SecureStore.getItemAsync('sessionToken');
}

async function fetchUserCarts(userId) {
  const apiBaseUrl = 'https://tasks-and-treats-backend.fly.dev/api/getcarts';

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

async function FetchChallenges(userId, sessionToken) {
  const apiUrl = `${globals.apiBaseUrl}/getchallenges`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      header: {
        Accept: 'application/json',
        'content-type': 'application/json',
        mode: 'no-cors',
      },
      body: JSON.stringify({
        userId: userId,
        sessionToken: sessionToken,
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

  const [carts, setCarts] = useContext(CartsContext);
  const [budget, setBudget] = useContext(budgetContext);
  // const [user, setUser] = useContext(userContext);

  // const [a, setA] = useContext(aContext);
  // Storing user information in ../utils/global.js

  Global.username = route.params.user.username;
  Global.userId = route.params.user.userId;
  // Global.budget = route.params.user.budget;

  StoreSessionTokenInGlobal();

  useEffect(async () => {
    setCarts(await fetchUserCarts(userId));
    setBudget(route.params.user.budget);
    Global.allChallenges = await FetchChallenges(
      route.params.user.userId,
      Global.sessionToken,
    );
  }, []);

  setTimeout(() => {
    navigation.navigate('TabBar', { user: route.params.user });
  }, 2600);

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
