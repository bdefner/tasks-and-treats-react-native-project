import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import {
  Button,
  Image,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { buttonStyles, colors, spacing } from '../utils/styleConstants';

async function handleLogin(username, password) {
  const apiBaseUrl = 'http://localhost:3000/api/login';

  try {
    const response = await fetch(apiBaseUrl, {
      method: 'POST',
      header: {
        Accept: 'application/json',
        'content-type': 'application/json',
        mode: 'no-cors',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const json = await response.json();
    console.log('json.user?.username', json.user);

    if (await SecureStore.getItemAsync('sessionToken')) {
      SecureStore.deleteItemAsync('sessionToken').catch((error) =>
        console.log('Could not delete sessionToken ', error),
      );
    }
    console.log('json.user.sessionToken: ', json.user.sessionToken);

    await SecureStore.setItemAsync('sessionToken', json.user.sessionToken);

    if (!json.user?.username === 'undefined') {
      return false;
    } else if (json.user?.username === username) {
      return json.user;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
}

export default function Login() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <ScrollView>
      <View style={styles.screen}>
        <View>
          <Text style={styles.heading}>You look familiar. Do I know you??</Text>
          <Image
            source={require('../assets/grafics/login.png')}
            style={styles.welcomeImg}
          />
          <View style={styles.inputFieldWrap}>
            <TextInput
              style={styles.inputField}
              placeholder="username"
              onChangeText={setUsername}
            />
          </View>
          <View style={styles.inputFieldWrap}>
            <TextInput
              style={styles.inputField}
              placeholder="password"
              onChangeText={setPassword}
            />
          </View>
        </View>
        <Text>{errorMessage}</Text>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View>
            <Pressable
              style={buttonStyles.greenPrimary}
              onPress={async () => {
                const loginResponse = await handleLogin(username, password);

                console.log('loginResponse', loginResponse);

                if (!loginResponse) {
                  setErrorMessage('Username or password is incorrect.');
                } else {
                  navigation.replace('FetchUserDataAndRedirect', {
                    user: loginResponse,
                  });
                }
              }}
            >
              <Text style={{ color: 'white' }}>Login</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
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
  inputFieldWrap: {
    borderRadius: spacing.small,
    borderColor: colors.grey,
    borderWidth: 1,
    margin: spacing.medium_1,
    backgroundColor: 'white',
  },
  inputField: {
    padding: spacing.small,
  },
  heading: {
    fontSize: spacing.medium_1,
    textAlign: 'center',
  },
});
