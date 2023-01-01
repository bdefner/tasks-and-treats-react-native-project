import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import Lottie from 'lottie-react-native';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import budgetContext from '../utils/context/BudgetContext';
import CartsContext from '../utils/context/CartsContext';
import Global from '../utils/globals';
import globals from '../utils/globals';

async function StoreSessionTokenInGlobal() {
  Global.sessionToken = await SecureStore.getItemAsync('sessionToken');
}

async function fetchUserCarts(userId) {
  const apiUrl = `${globals.apiBaseUrl}/getcarts`;

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

async function FetchConnectionIds(userId, sessionToken) {
  const apiUrl = `${globals.apiBaseUrl}/handleconnections`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      header: {
        Accept: 'application/json',
        'content-type': 'application/json',
        mode: 'no-cors',
      },
      body: JSON.stringify({
        requestType: 'getConnections',
        userId: userId,
        sessionToken: sessionToken,
      }),
    });
    const json = await response.json();

    const connectionUserIds = json.map((item) => {
      return item.userReceivedId === userId
        ? item.userRequestedId
        : item.userReceivedId;
    });

    return connectionUserIds;
  } catch (error) {
    console.log(error);
  }
}

async function FetchConnectionUserData(userId, sessionToken, connectionId) {
  const apiUrl = `${globals.apiBaseUrl}/handleconnections`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      header: {
        Accept: 'application/json',
        'content-type': 'application/json',
        mode: 'no-cors',
      },
      body: JSON.stringify({
        requestType: 'getConnectionsData',
        userId: userId,
        sessionToken: sessionToken,
        connections: connectionId.toString(),
      }),
    });
    const json = await response.json();

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
  const [connectionIds, setConnectionIds] = useState([]);
  const [connectionUserData, setConnectionUserData] = useState([{}]);
  const connectionData = [{}];

  // Storing user information in ../utils/global.js

  Global.username = route.params.user.username;
  Global.userId = route.params.user.userId;
  Global.inviteToken = route.params.user.inviteToken;

  StoreSessionTokenInGlobal();

  useEffect(async () => {
    setCarts(await fetchUserCarts(userId));
    setBudget(route.params.user.budget);
    Global.allChallenges = await FetchChallenges(
      route.params.user.userId,
      Global.sessionToken,
    );

    const connectionIds = await FetchConnectionIds(
      route.params.user.userId,
      Global.sessionToken,
    );

    for (let i = 0; i < connectionIds.length; i++) {
      connectionData[i] = await FetchConnectionUserData(
        route.params.user.userId,
        Global.sessionToken,
        connectionIds[i],
      );
    }

    globals.connections = connectionData;
  }, []);

  setTimeout(() => {
    navigation.navigate('TabBar', {
      user: route.params.user,
      connectionUserData: connectionData,
    });
  }, 2600);

  return (
    <View style={styles.screen}>
      <View style={{ position: 'absolute', top: 200 }}>
        {route.params.promotionUser && (
          <Text style={{ fontSize: 24 }}>
            🤩 {route.params.promotionUser} just received 10 stars!
          </Text>
        )}
      </View>

      <Lottie
        source={require('../assets/grafics/successAnimation.json')}
        autoPlay
        loop={false}
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
});
