import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from 'react';
import {
  Alert,
  Button,
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Rating } from 'react-native-ratings';
import { TypeFlags } from 'typescript';
import CartsContext from '../utils/context/CartsContext';
import Global from '../utils/globals';
import globals from '../utils/globals';
import { colors, font, spacing } from '../utils/styleConstants';

async function createCartHandler(params) {
  const apiBaseUrl = `${globals.apiBaseUrl}/createcart`;
  try {
    const response = await fetch(apiBaseUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        mode: 'no-cors',
      },
      body: JSON.stringify({
        userId: params.userId,
        sessionToken: params.sessionToken,
        timeOfCreation: params.timeOfCreation,
        typeId: params.typeId,
        label: params.label,
        rating: params.rating,
        dueDate: params.dueDate,
        statusId: params.statusId,
        assignedToUserId: params.assignedToUserId,
        receivedFromUserId: params.receivedFromUserId,
        groupId: params.groupId,
      }),
    });
    const json = await response.json();

    return json;
  } catch (error) {
    console.error(error);
  }
}

export default function CreateNew({ route }) {
  const [carts, setCarts] = useContext(CartsContext);

  // If type is true, it's a tasks, else it's a treat
  const [type, setType] = useState(true);
  const [currentRating, setCurrentRating] = useState(5);
  const [label, setLabel] = useState('');
  const [dueDate, setDueDate] = useState();
  const [assignedToUserId, setAssignedToUserId] = useState();
  const [receivedFromUserId, setReceivedFromUserId] = useState();
  const [groupId, setGroupId] = useState();

  const navigation = useNavigation();

  // Get the current date and modify it to the format YYYY-MM-DD

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  function formatDate(date) {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-');
  }

  // Get the current day

  const timeOfCreation = formatDate(new Date());

  function ratingCompleted(rating) {
    console.log('Rating is: ' + rating);
    setCurrentRating(rating);
  }

  // Create the parameters for fetching

  const params = {
    userId: Global.userId,
    sessionToken: Global.sessionToken,
    timeOfCreation: timeOfCreation,
    typeId: type ? 1 : 2,
    label: label,
    rating: currentRating,
    dueDate: dueDate ? dueDate : null,
    statusId: 1,
    assignedToUserId: assignedToUserId ? assignedToUserId : null,
    receivedFromUserId: receivedFromUserId ? receivedFromUserId : null,
    groupId: groupId ? groupId : null,
  };

  return (
    <View style={styles.screen}>
      <View style={styles.headerWrap}>
        <View
          style={{
            position: 'absolute',
            left: spacing.medium_1,
            bottom: spacing.medium_1,
          }}
        ></View>
        <Text style={styles.headerText}>Create new</Text>
      </View>
      <View style={styles.formWrap}>
        <View style={styles.innerWrap}>
          <Text style={{ textAlign: 'center' }}>
            What would you like to add?
          </Text>
          <View style={styles.toggleWrap}>
            <Pressable
              onPress={() => {
                setType(true);
                setCurrentRating(5);
              }}
              style={
                type
                  ? {
                      ...styles.toggle,
                      borderColor: colors.green_1,
                      backgroundColor: colors.green_1,
                      borderBottomEndRadius: 0,
                      borderTopEndRadius: 0,
                    }
                  : {
                      ...styles.toggle,
                      borderColor: colors.green_1,
                      borderBottomEndRadius: 0,
                      borderTopEndRadius: 0,
                    }
              }
            >
              <Text
                style={type ? { color: 'white' } : { color: colors.green_1 }}
              >
                Task
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setType(false);
                setCurrentRating(10);
              }}
              style={
                type
                  ? {
                      ...styles.toggle,
                      borderColor: colors.purple_1,
                      borderBottomStartRadius: 0,
                      borderTopStartRadius: 0,
                    }
                  : {
                      ...styles.toggle,
                      borderColor: colors.purple_1,
                      backgroundColor: colors.purple_1,
                      borderBottomStartRadius: 0,
                      borderTopStartRadius: 0,
                    }
              }
            >
              <Text
                style={type ? { color: colors.purple_1 } : { color: 'white' }}
              >
                Treat
              </Text>
            </Pressable>
          </View>
          <SafeAreaView>
            <TextInput
              style={styles.textInput}
              placeholder={
                type ? 'Describe your task...' : 'Describe your treat...'
              }
              onChangeText={setLabel}
              value={label}
            />
          </SafeAreaView>
          {type ? (
            <View style={styles.ratingWrap}>
              <Text>Rate it</Text>
              <Rating
                type="star"
                ratingCount={10}
                imageSize={17}
                tintColor={'white'}
                defaultRating={currentRating}
                onFinishRating={setCurrentRating}
              />
              <Text>{currentRating} / 10</Text>
            </View>
          ) : (
            <View style={styles.ratingWrap}>
              <Text>Rate it</Text>
              <View style={styles.ratingTextInputWrap}>
                <Image
                  source={require('../assets/icons/star.png')}
                  style={styles.starIcon}
                />

                <Text>{currentRating}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Pressable
                  onPress={() => {
                    currentRating > 1 && setCurrentRating(currentRating - 1);
                  }}
                >
                  <View
                    style={{
                      ...styles.changeRateButton,
                      borderBottomEndRadius: 0,
                      borderTopEndRadius: 0,
                    }}
                  >
                    <Text style={{ color: 'white', fontSize: font.size_3 }}>
                      -
                    </Text>
                  </View>
                </Pressable>
                <Pressable
                  onPress={() => {
                    currentRating < 999 && setCurrentRating(currentRating + 1);
                  }}
                >
                  <View
                    style={{
                      ...styles.changeRateButton,
                      borderBottomStartRadius: 0,
                      borderTopStartRadius: 0,
                    }}
                  >
                    <Text style={{ color: 'white', fontSize: font.size_3 }}>
                      +
                    </Text>
                  </View>
                </Pressable>
              </View>
            </View>
          )}
        </View>
        <Pressable
          style={styles.createButton}
          onPress={async () => {
            if (!label) {
              Alert.alert(
                '🤔 Description is missing',
                `Click into "describe your ${
                  type ? 'task' : 'treat'
                } ..." and give it some text!`,
              );
            } else {
              const response = await createCartHandler(params);
              // If response is 200, add cardId, remove sessionToken and add the  new cart to carts
              if (response.cart.cartId) {
                params.cartId = response.cart.cartId;
                delete params.sessionToken;
                setCarts((carts) => [...carts, params]);
                console.log('new carts:', carts);
                setLabel('');
                // Navigate back to Tasks or Treats
                if (type) {
                  navigation.navigate('Tasks');
                } else {
                  navigation.navigate('Treats');
                }
              }
            }
          }}
        >
          <Text style={{ color: 'white' }}>Create</Text>
        </Pressable>
      </View>
    </View>
  );
}

// ScreenDimensions is used for the input field wrapper
const screenDimensions = Dimensions.get('window');

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  headerWrap: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.medium_1,
    backgroundColor: colors.black,
    borderBottomColor: colors.greyBorder,
    borderBottomWidth: 2,
  },
  headerText: {
    marginTop: spacing.large_2,
    fontSize: font.size_3,
    color: 'white',
  },
  formWrap: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  toggleWrap: {
    padding: spacing.medium_2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggle: {
    padding: spacing.small,
    paddingLeft: spacing.medium_2,
    paddingRight: spacing.medium_2,
    borderWidth: 1,
    borderRadius: spacing.small,
  },
  textInput: {
    marginTop: spacing.medium_2,
    marginBottom: spacing.medium_2,
    textAlign: 'center',
    color: colors.black,
  },
  innerWrap: {
    marginTop: spacing.large_1,
    padding: spacing.medium_1,
    backgroundColor: 'white',
    borderRadius: spacing.small,
    width: screenDimensions.width - spacing.large_1,
  },
  ratingWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.medium_2,
  },
  ratingTextInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rateTextInput: {
    minWidth: 50,
    fontSize: font.size_2,
    padding: spacing.small,
    borderColor: colors.greyBorder,
    borderWidth: 1,
    borderRadius: spacing.small,
    marginLeft: spacing.small,
  },
  changeRateButton: {
    padding: 3,
    paddingLeft: spacing.medium_1,
    paddingRight: spacing.medium_1,
    borderColor: colors.greyBorder,
    borderWidth: 1,
    backgroundColor: colors.yellowStar,
    borderRadius: spacing.small,
  },
  starIcon: {
    width: spacing.medium_2,
    height: spacing.medium_2,
    marginRight: spacing.small,
  },
  createButton: {
    margin: spacing.medium_2,
    padding: spacing.small,
    paddingLeft: spacing.medium_2,
    paddingRight: spacing.medium_2,
    borderWidth: 1,
    borderRadius: spacing.small,
    backgroundColor: colors.black,
  },
});
