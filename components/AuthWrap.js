import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

export default function AddConnection() {
  const [tryToLogIn, setTryToLogIn] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    async function fetchSessionToken() {
      const apiBaseUrl = 'http://localhost:3000/api/auth';
      const token = await SecureStore.getItemAsync('sessionToken');
      console.log('token', token);

      if (token) {
        // Get the user (username, userId, userEmail)

        try {
          const response = await fetch(apiBaseUrl, {
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

          if (!json.user) {
            setTryToLogIn(false);
          }

          if (json.user) {
            // Navigate to FetchUserDataAndRedirect sending userId

            navigation.navigate('FetchUserDataAndRedirect', {
              user: json.user,
            });
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
        <Text>Trying to log in by token</Text>
      ) : (
        <Text>couldn't log in by token</Text>
      )}
    </>
  );
}
