import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from 'react';
import {
  Button,
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Rating } from 'react-native-ratings';
import CartsContext from '../utils/CartsContext';
import Global from '../utils/globals';
import { colors, spacing } from '../utils/styleConstants';

async function createCartHandler(params) {
  const apiBaseUrl = 'http://localhost:3000/api/createcart';

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

  // If category is true, it's a tasks, else it's a treat
  const [type, setType] = useState(true);
  const [assignedTo, setAssignedTo] = useState('self');
  const [currentRating, setCurrentRating] = useState(10);
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
      <Text>Let's add a ...</Text>
      <View style={styles.toggleWrap}>
        <Pressable
          onPress={() => setType(true)}
          style={
            type
              ? {
                  ...styles.toggle,
                  borderColor: colors.green_1,
                  backgroundColor: colors.green_1,
                }
              : { ...styles.toggle, borderColor: colors.green_1 }
          }
        >
          <Text style={type ? { color: 'white' } : { color: colors.green_1 }}>
            Task
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setType(false)}
          style={
            type
              ? {
                  ...styles.toggle,
                  borderColor: colors.purple_1,
                }
              : {
                  ...styles.toggle,
                  borderColor: colors.purple_1,
                  backgroundColor: colors.purple_1,
                }
          }
        >
          <Text style={type ? { color: colors.purple_1 } : { color: 'white' }}>
            Treat
          </Text>
        </Pressable>
      </View>
      <Text>for ...</Text>
      <Text>(myself) - (Franzi) - [add connection]</Text>
      <View style={styles.inputWrap}>
        <SafeAreaView>
          <TextInput
            placeholder={
              type ? 'Describe your task...' : 'Describe your treat...'
            }
            onChangeText={setLabel}
          />
        </SafeAreaView>
        <View style={styles.ratingWrap}>
          <Text>Rate it</Text>
          <Rating
            type="star"
            ratingCount={10}
            imageSize={17}
            tintColor={'white'}
            onFinishRating={ratingCompleted}
          />
          <Text>{currentRating} / 10</Text>
        </View>
      </View>
      <Pressable
        style={styles.createButton}
        onPress={async () => {
          const response = await createCartHandler(params);
          // If response is 200, add cardId, remove sessionToken and add the  new cart to carts
          if (response.cart.cartId) {
            params.cartId = response.cart.cartId;
            delete params.sessionToken;
            setCarts((carts) => [...carts, params]);
            console.log('new carts:', carts);

            // Navigate back to Tasks or Treats
            if (type) {
              navigation.navigate('Tasks');
            } else {
              navigation.navigate('Treats');
            }
          }
        }}
      >
        <Text style={{ color: 'white' }}>Create</Text>
      </Pressable>
    </View>
  );
}

// ScreenDimensions is used for the input field wrapper
const screenDimensions = Dimensions.get('window');

const styles = StyleSheet.create({
  screen: {
    padding: spacing.large_1,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  toggleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggle: {
    margin: spacing.medium_2,
    padding: spacing.small,
    paddingLeft: spacing.medium_2,
    paddingRight: spacing.medium_2,
    borderWidth: 1,
    borderRadius: spacing.small,
  },
  inputWrap: {
    marginTop: spacing.large_1,
    padding: spacing.medium_1,
    backgroundColor: 'white',
    borderRadius: spacing.small,
    width: screenDimensions.width - spacing.large_1,
  },
  ratingWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.medium_2,
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
