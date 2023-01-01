import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import Lottie from 'lottie-react-native';
import { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import globals from '../utils/globals';
import { colors, font, spacing } from '../utils/styleConstants';

async function UpdateBudgetByInviteToken(inviteToken) {
  const sessionToken = await SecureStore.getItemAsync('sessionToken');
  const apiUrl = `${globals.apiBaseUrl}/usepromotion`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      header: {
        Accept: 'application/json',
        'content-type': 'application/json',
        mode: 'no-cors',
      },
      body: JSON.stringify({
        sessionToken: sessionToken,
        inviteToken: inviteToken,
      }),
    });
    const json = await response.json();

    return json;
  } catch (error) {
    console.log(error);
  }

  return response;
}

export default function AfterRegistration({ route }) {
  const [inviteToken, setInviteToken] = useState('');
  const [showPromotionInput, setShowPromotionInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigation = useNavigation();

  console.log('route.params: ', route.params);

  return (
    <View style={styles.screen}>
      <Text style={styles.h1}>Welocome {route.params.user.username}</Text>

      <Lottie
        source={require('../assets/grafics/goodbyeAnimation.json')}
        autoPlay
        loop={false}
        style={styles.lottieAnimation}
      />

      <Text>How did you hear about this app?</Text>
      <View style={{ margin: spacing.medium_2, alignItems: 'center' }}>
        <Pressable
          onPress={() => {
            setShowPromotionInput(true);
          }}
          style={{ ...styles.selectionWrap, backgroundColor: colors.purple_1 }}
        >
          <Text style={{ textAlign: 'center', color: 'white' }}>
            Got invited by a friend
          </Text>
        </Pressable>
        {showPromotionInput && (
          <>
            <View style={styles.promoWrap}>
              <Text style={{ margin: spacing.medium_1 }}>
                Did you receive a promotion code?
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    ...styles.inputFieldWrap,
                    backgroundColor: 'white',
                  }}
                >
                  <TextInput
                    style={{
                      ...styles.inputField,
                      color: colors.grey,
                      textAlign: 'center',
                    }}
                    placeholder="promo code"
                    onChangeText={setInviteToken}
                    autoCorrect={false}
                  />
                </View>

                <Pressable
                  onPress={async () => {
                    const response = await UpdateBudgetByInviteToken(
                      inviteToken,
                    );

                    if (!response.user) {
                      setErrorMessage(
                        'Sorry, we could not verify your code. You can click on "skip" or contact us for support. ',
                      );
                    } else {
                      setErrorMessage('');
                      navigation.replace('FetchUserDataAndRedirect', {
                        user: route.params.user,
                        promotionUser: response.user.username,
                      });
                    }
                  }}
                  style={{
                    ...styles.promoButton,
                    backgroundColor: colors.green_1,
                  }}
                >
                  <Text style={{ color: 'white' }}>Send</Text>
                </Pressable>
                <Pressable style={{ ...styles.promoButton }}>
                  <Text>Skip</Text>
                </Pressable>
              </View>
            </View>
            <Text style={{ color: 'red', textAlign: 'center' }}>
              {errorMessage}
            </Text>
          </>
        )}
        <Pressable
          onPress={() => {
            setShowPromotionInput(false);
          }}
          style={{
            ...styles.selectionWrap,
            backgroundColor: colors.green_1,
            opacity: showPromotionInput ? 0.5 : 1,
          }}
        >
          <Text style={{ textAlign: 'center', color: 'white' }}>
            Found it on the Expo store
          </Text>
        </Pressable>
        <Pressable
          onPress={() =>
            navigation.replace('FetchUserDataAndRedirect', {
              user: route.params.user,
            })
          }
          style={{
            ...styles.selectionWrap,
            borderColor: 'black',
            borderRadius: 1,
          }}
        >
          <Text style={{ textAlign: 'center', color: 'blue' }}>
            Somehow else
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: spacing.medium_2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  h1: {
    fontSize: font.size_3,
    textAlign: 'center',
    marginBottom: spacing.small,
    padding: spacing.small,
    fontWeight: '400',
  },
  selectionWrap: {
    width: 300,
    padding: spacing.small,
    justifyContent: 'center',
    margin: spacing.medium_1,

    borderRadius: spacing.small,
  },
  promoWrap: {
    alignItems: 'center',
    width: 300,
    margin: spacing.small,
    padding: spacing.small,
    backgroundColor: 'white',
    borderRadius: spacing.small,
  },
  inputFieldWrap: {
    borderRadius: spacing.small,
    borderColor: colors.grey,
    borderWidth: 1,
    margin: spacing.small,
    backgroundColor: 'white',
  },
  inputField: {
    width: 100,
    marginRight: spacing.medium_1,
    padding: spacing.small,
  },
  promoButton: {
    padding: spacing.small,
    borderRadius: spacing.small,
  },
  lottieAnimation: {
    width: 100,
  },
});
