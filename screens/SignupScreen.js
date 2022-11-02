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
import { buttonStyles, colors, spacing } from '../utils/styleConstants';

async function signupHandler() {
  const apiBaseUrl = 'http://localhost:3000/api/';

  const registerResponse = await fetch(`${apiBaseUrl}/signup`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  const registerResponseBody = registerResponse.json();

  console.log(registerResponseBody);

  // After registration is completed, navigate to the App
  // navigation.replace('TabBar');
}

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordTest, setPasswordTest] = useState('');

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
          />
        </View>
        <View style={styles.inputFieldWrap}>
          <TextInput
            style={styles.inputField}
            placeholder="repeat password"
            onChangeText={setPasswordTest}
          />
        </View>
      </View>

      <View>
        <Pressable
          style={buttonStyles.purplePrimary}
          onPress={() => {
            signupHandler();
          }}
        >
          <Text style={{ color: 'white' }}>Signup</Text>
        </Pressable>
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
