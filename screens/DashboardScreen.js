import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { useContext, useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import CartsContext from '../utils/context/CartsContext';
import globals, { userId } from '../utils/globals';
import { colors, font, spacing } from '../utils/styleConstants';

async function handleCreateNewConnectionRequest(userId) {
  const sessionToken = await SecureStore.getItemAsync('sessionToken');
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
        userId: userId,
        sessionToken: sessionToken,
        requestType: 'createConnection',
      }),
    });
    const json = await response.json();

    return json;
  } catch (error) {
    console.log(error);
  }

  return response;
}
async function handleConfirmConnection(userId, connectionToken) {
  const sessionToken = await SecureStore.getItemAsync('sessionToken');
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
        userId: userId,
        sessionToken: sessionToken,
        requestType: 'acceptConnection',
        connectionToken: connectionToken,
      }),
    });
    const json = await response.json();

    return json;
  } catch (error) {
    console.log(error);
  }

  return response;
}

async function onShare(connectionToken) {
  try {
    const result = await Share.share({
      message: `Let's challenge: ${connectionToken}`,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
}

export default function Dashboard({ route }) {
  const user = route.params.user;
  const [carts, setCarts] = useContext(CartsContext);
  const navigation = useNavigation();
  const [connectionToken, setConnectionToken] = useState('');
  const [ranking, setRanking] = useState(() => {
    if (globals.connections[0]) {
      const rankingData = globals.connections;
      rankingData.push([{ budget: user.budget, username: user.username }]);

      const sortedRankingData = []
        .concat(rankingData)
        .sort((a, b) => (a.budget > b.budget ? 1 : -1));
      return sortedRankingData;
    } else {
      return [0];
    }
  });
  const [displayConnections, setDisplayConnections] = useState(
    ranking[0][0].budget === 0 ? false : true,
  );

  const activeTasks = carts.filter((item) => {
    return item.typeId === 1 && item.statusId === 1 && !item.groupId;
  });

  const activeTreats = carts.filter((item) => {
    return item.typeId === 2 && item.statusId === 1 && !item.groupId;
  });

  return (
    <ScrollView style={styles.screen}>
      <View>
        <View style={styles.chipWrap}>
          <View
            style={{
              ...styles.chip,
              backgroundColor: 'white',
              flexDirection: 'row',
            }}
          >
            <Text style={{ ...styles.chipCount, color: 'black' }}>
              {user.budget}
            </Text>
            <Image
              source={require('../assets/icons/star.png')}
              style={{
                width: spacing.medium_3,
                height: spacing.medium_3,
                marginLeft: spacing.small,
              }}
            />
          </View>
          <View style={{ ...styles.chip, flexDirection: 'row' }}>
            <Image
              source={require('../assets/icons/profile.png')}
              style={{
                width: spacing.medium_2,
                height: spacing.medium_2,
                marginRight: spacing.small,
              }}
            />
            <Text style={styles.h1}>{user.username}</Text>
          </View>
        </View>
      </View>
      <View style={styles.chipWrap}>
        <Pressable
          onPress={() => {
            navigation.navigate('Tasks');
          }}
          style={{ ...styles.chip, backgroundColor: colors.green_2 }}
        >
          <Text style={styles.chipHeading}>Tasks</Text>
          <Text style={styles.chipCount}>{activeTasks.length}</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('Treats');
          }}
          style={{ ...styles.chip, backgroundColor: colors.purple_2 }}
        >
          <Text style={styles.chipHeading}>Treats</Text>
          <Text style={styles.chipCount}>{activeTreats.length}</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('Challenges');
          }}
          style={{ ...styles.chip, backgroundColor: colors.black }}
        >
          <Text style={styles.chipHeading}>Challenges</Text>
          <Text style={styles.chipCount}>2 / 12</Text>
        </Pressable>
      </View>
      <Text style={{ ...styles.h2, marginTop: spacing.large_1 }}>
        Leaderboard
      </Text>
      {displayConnections &&
        ranking.map((element, index) => {
          return (
            <View key={index}>
              <View
                style={{
                  ...styles.rankingListElementWrap,
                  backgroundColor:
                    index === 0 ? colors.green_1 : colors.green_3,
                }}
              >
                <Text style={{ fontSize: font.size_3, color: 'white' }}>
                  {index === 0 && '👑 '}
                  {ranking[index][0].username}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={require('../assets/icons/star.png')}
                    style={{
                      width: spacing.medium_1,
                      height: spacing.medium_1,
                      marginLeft: spacing.small,
                    }}
                  />
                  <Text
                    style={{
                      marginLeft: spacing.small,
                      color: 'white',
                      fontSize: font.size_3,
                    }}
                  >
                    {ranking[index][0].budget}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: spacing.medium_2,
        }}
      >
        <TextInput
          style={{
            ...styles.inputField,
            color: colors.grey,
            textAlign: 'center',
          }}
          placeholder="invitation code"
          onChangeText={setConnectionToken}
          autoCorrect={false}
        />
        <Pressable
          onPress={async () =>
            await handleConfirmConnection(user.userId, connectionToken)
          }
          style={{
            ...styles.promoButton,
            backgroundColor: colors.purple_1,
            borderColor: colors.purple_1,
          }}
        >
          <Text style={{ color: 'white' }}>Confirm</Text>
        </Pressable>
        <Pressable
          onPress={async () => {
            const connectionToken = await handleCreateNewConnectionRequest(
              user.userId,
            );

            onShare(connectionToken);
          }}
          style={styles.promoButton}
        >
          <Text>+ Add</Text>
        </Pressable>
        <View></View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: spacing.medium_2,
    paddingTop: spacing.large_3,
  },
  h1: {
    fontSize: font.size_4,
    margin: spacing.medium_2,
    marginBottom: spacing.medium_1,

    fontWeight: '400',
    color: 'black',
  },
  h2: {
    fontSize: font.size_3,
    marginTop: spacing.medium_1,
    marginBottom: spacing.small,
  },
  chipHeading: {
    color: 'white',
    fontWeight: '600',
    fontSize: font.size_2,
    marginBottom: spacing.medium_1,
  },
  chipCount: {
    fontWeight: '200',
    fontSize: font.size_4,
    color: 'white',
  },
  p: {
    fontSize: font.size_2,
    padding: spacing.small,
    textAlign: 'center',
  },
  chipWrap: {
    marginTop: spacing.medium_1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chip: {
    margin: spacing.small,
    padding: spacing.medium_1,
    borderRadius: spacing.small,
    alignItems: 'center',
  },
  rankingListElementWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.small,
    marginTop: spacing.medium_2,
    borderRadius: spacing.small,
    backgroundColor: colors.green_2,
  },
  inputField: {
    width: 150,
    marginRight: spacing.medium_1,
    padding: spacing.small,
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: spacing.small,
  },
  promoButton: {
    margin: spacing.medium_1,
    padding: spacing.small,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: spacing.small,
  },
});
