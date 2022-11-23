import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import Lottie from 'lottie-react-native';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import globals from '../utils/globals';
import { spacing } from '../utils/styleConstants';

export default function AddConnection() {
  const [tryToLogIn, setTryToLogIn] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    async function fetchSessionToken() {
      const apiUrl = `${globals.apiBaseUrl}/auth`;
      const token = await SecureStore.getItemAsync('sessionToken');
      console.log('token', token);

      if (!token) {
        setTryToLogIn(false);
      }

      if (token) {
        // Get the user (username, userId, userEmail)

        try {
          const response = await fetch(apiUrl, {
            method: 'POST',
            header: {
              Accept: 'application/json',
              'content-type': 'application/json',
              mode: 'no-cors',
            },
            body: JSON.stringify({
              sessionToken: token,
            }),
          });
          const json = await response.json();

          console.log('json.user', json.user);

          // Major TODO!! If json.user = undefined, then the token is not valid and needs to be deleted! Afterwards tryToLogIn is to be set to false

          if (json.user) {
            // Navigate to FetchUserDataAndRedirect sending userId

            // Note: The timeout is only for a smoother UX

            setTimeout(() => {
              navigation.navigate('FetchUserDataAndRedirect', {
                user: json.user,
              });
            }, 1500);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }

    fetchSessionToken();
  }, []);

  return (
    <>
      {tryToLogIn ? (
        <></>
      ) : (
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
      )}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: spacing.medium_1,
    margin: spacing.small,
  },
  buttonWrap: {
    padding: spacing.large_2,
    flexDirection: 'row',
  },
});
