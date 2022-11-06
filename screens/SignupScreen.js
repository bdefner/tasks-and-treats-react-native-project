import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { buttonStyles, colors, font, spacing } from '../utils/styleConstants';
import * as SecureStore from 'expo-secure-store';

async function signupHandler(username, email, passwordHash) {
  const apiBaseUrl = 'http://localhost:3000/api/signup';

  try {
    const response = await fetch(apiBaseUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        mode: 'no-cors',
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: passwordHash,
      }),
    });
    const json = await response.json();


    // check if there is already a token stored and replace it

    const tokenTest = await SecureStore.getItemAsync('sessionToken');

    console.log('Token before check: ', tokenTest);

    if (tokenTest) {
      SecureStore.deleteItemAsync("sessionToken")
      .catch(error => console.log("Could not delete sessionToken ", error));
    }

    await SecureStore.setItemAsync('sessionToken', json.user.sessionToken);

    return json.user;

  } catch (error) {
    console.error(error);
  }
}


export default function Signup() {
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordTest, setPasswordTest] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [infoTextVisible, setInfoTextVisible] = useState(false);


  const navigation = useNavigation();
  return (
    <View style={styles.screen}>
      <View>
        <Text style={styles.heading}>Who would you like to be to me?</Text>
        <Image
          source={require('../assets/grafics/signup.png')}
          style={styles.welcomeImg}
        />
        <View style={styles.inputFieldWrap}>
          <TextInput
            style={styles.inputField}
            placeholder="username"
            onChangeText={setUsername}
          />
        </View>
        <Text>{usernameError}</Text>
        <View style={styles.inputFieldWrap}>
          <TextInput
            style={styles.inputField}
            placeholder="e-mail"
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputFieldWrap}>
          <TextInput
            style={styles.inputField}
            placeholder="password"
            onChangeText={setPassword}
            textContentType="newPassword"
          />
        </View>
        <Text style={styles.errorMessage}>{passwordError}</Text>
        <View style={styles.inputFieldWrap}>
          <TextInput
            style={styles.inputField}
            placeholder="repeat password"
            onChangeText={setPasswordTest}
            extContentType="password"
          />
        </View>
      </View>

      <View>
        <Pressable
          style={buttonStyles.purplePrimary}
          onPress={async () => {
            if (password !== passwordTest) {
              setPasswordError("Repeated password doesn't match!");
            } else {
             const userData = await signupHandler(username, email, password);
             console.log('userData:', userData )

            }
          }}
        >
          <Text style={{ color: 'white' }}>Signup</Text>
        </Pressable>
      </View>
      <View style={styles.infoWrap}>
        <Pressable
          onPress={() => {
            infoTextVisible
              ? setInfoTextVisible(false)
              : setInfoTextVisible(true);
          }}
        >
          <Image
            source={require('../assets/icons/secure.png')}
            style={{
              width: spacing.medium_1,
              height: spacing.medium_1,
              margin: spacing.medium_1,
            }}
          />
        </Pressable>
        <View
          style={infoTextVisible ? { display: 'flex' } : { display: 'none' }}
        >
          <Text
            style={{
              backgroundColor: 'white',
              padding: spacing.medium_1,
              borderRadius: spacing.small,
            }}
          >
            Your passwords are not saved or sent anywhere by this app. Your
            passwords get encrypted by using bcrypt and saved as password
            hashes. Also, currently there's no way for you to reset your
            password. This feature is on my ToDo list...{' '}
          </Text>
        </View>
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
    width: 196,
    height: 249,
    margin: spacing.medium_2,
  },
  inputFieldWrap: {
    borderRadius: spacing.small,
    borderColor: colors.grey,
    borderWidth: 1,
    margin: spacing.small,
    backgroundColor: 'white',
  },
  inputField: {
    padding: spacing.small,
  },
  heading: {
    fontSize: spacing.medium_1,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: font.size_1,
    color: colors.redAlert,
    textAlign: 'center',
  },
  infoWrap: {
    padding: spacing.medium_1,
  },
});
