import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';
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
  // const apiBaseUrl = 'http://localhost:3000/api/signup';
  // const response = await fetch(apiBaseUrl, {
  //   method: 'POST',
  //   headers: { 'Access-Control-Allow-Origin': ' http://localhost:3000' },
  //   body: {
  //     username: 'Test Name',
  //     email: 'not@real.at',
  //     password: '123abc',
  //   },
  // });
  // return response.json();
  // const response = await axios
  //   .post(apiBaseUrl, {
  //     username: 'Dada',
  //     email: 'tata@tc.to',
  //     password: 'abc123',
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error).finally(function () {
  //       console.log('Request sent');
  //     });
  //   });
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
          // onPress={() => {
          //   signupHandler();
          // }}
        >
          <Text style={{ color: 'white' }}>Signup</Text>
        </Pressable>
      </View>
      <View>
        <Text>
          Security notice: Your passwords are not saved or sent anywhere by this
          app. Your passwords get encrypted by using bcrypt and saved as
          password hashes. Also, currently there's no way for you to reset your
          password. This feature is on my ToDo list...{' '}
        </Text>
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
