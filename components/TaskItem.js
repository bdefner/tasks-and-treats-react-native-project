import { useContext, useState } from 'react';
import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Rating } from 'react-native-ratings';
import budgetContext from '../utils/context/BudgetContext';
import cartsContext from '../utils/context/CartsContext';
import Global from '../utils/globals.js';
import globals from '../utils/globals.js';
import { colors, font, spacing } from '../utils/styleConstants';

function getTintColorBasedOnStatusAndType(typeId, statusId) {
  if (typeId === 1 && statusId == 1) return colors.green_1;
  if (typeId === 1 && statusId == 2) return colors.green_2;
  if (typeId === 2 && statusId == 1) return colors.purple_1;
  if (typeId === 2 && statusId == 2) return colors.purple_2;
}

async function updateCartHandler(params) {
  const apiBaseUrl = `${globals.apiBaseUrl}/updatecart`;

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
        cartId: params.cartId,
        sessionToken: params.sessionToken,
        label: params.label,
        rating: params.rating,
        statusId: params.statusId,
      }),
    });
    const json = await response.json();

    return json;
  } catch (error) {
    console.error(error);
  }
}

async function deleteCartHandler(params) {
  const apiUrl = `${globals.apiBaseUrl}/deletecart`;
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        mode: 'no-cors',
      },
      body: JSON.stringify({
        userId: params.userId,
        cartId: params.cartId,
        sessionToken: params.sessionToken,
      }),
    });

    const json = await response.json();

    return json;
  } catch (error) {
    console.error(error);
  }
}

export default function TaskList(props) {
  const [currentLabel, setCurrentLabel] = useState(props.text);
  const [currentRating, setCurrentRating] = useState(props.rating);
  const [currentStatusId, setCurrentStatusId] = useState(props.statusId);
  const [isEditing, setIsEditing] = useState(false);
  const [budget, setBudget] = useContext(budgetContext);
  const [carts, setCarts] = useContext(cartsContext);

  async function updateBudget(budget, params) {
    const apiBaseUrl =
      'https://tasks-and-treats-backend.fly.dev/api/updateuser';
    // Update the budget on the database

    console.log('params: ', params);
    console.log('budget: ', budget);

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
          budget: budget,
        }),
      });
      const json = await response.json();
      console.log('json: ', json);
      return json;
    } catch (error) {
      console.error(error);
    }
  }

  // Creating parameters for fetching

  const params = {
    userId: Global.userId,
    sessionToken: Global.sessionToken,
    cartId: props.cartId,
    statusId: props.statusId,
    label: currentLabel,
    rating: currentRating,
  };

  const tintColor = getTintColorBasedOnStatusAndType(
    props.typeId,
    currentStatusId,
  );

  return (
    <View
      style={{
        ...styles.taskItemContainer,
        backgroundColor: tintColor,
      }}
    >
      <View>
        <TextInput
          multiline={true}
          editable={isEditing ? true : false}
          onChangeText={setCurrentLabel}
          style={{
            ...styles.taskItemText,
            backgroundColor:
              params.statusId === 2
                ? colors.green_2
                : isEditing
                ? colors.green_2
                : colors.green_1,
          }}
          value={currentLabel}
        />
      </View>
      {params.statusId == 1 && (
        <View>
          <View
            style={{
              ...styles.ratingWrap,
              backgroundColor: isEditing ? colors.green_2 : colors.green_1,
            }}
          >
            <Rating
              startingValue={params.rating}
              type="star"
              ratingCount={10}
              imageSize={17}
              tintColor={isEditing ? colors.green_2 : colors.green_1}
              readonly={isEditing ? false : true}
              onFinishRating={setCurrentRating}
            />
          </View>

          <View style={styles.iconMenuWrap}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {isEditing ? (
                <Pressable
                  onPress={async () => {
                    setIsEditing(false);
                    // Update cart in database
                    const response = await updateCartHandler(params);

                    // Update cart in local storage
                    const newCarts = carts.map((cart) => {
                      if (cart.cartId === params.cartId) {
                        return {
                          ...cart,
                          rating: currentRating,
                          label: currentLabel,
                        };
                      }
                      return cart;
                    });
                    setCarts(newCarts);

                    console.log('currentRating: ', currentRating);
                    console.log('currentLabel: ', currentLabel);
                    console.log('params: ', params);
                    console.log('carts: ', carts);
                  }}
                >
                  <View style={styles.saveButton}>
                    <Text style={{ color: colors.green_1 }}>save</Text>
                  </View>
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => {
                    setIsEditing(true);
                  }}
                >
                  <Image
                    source={require('../assets/icons/edit.png')}
                    style={{ ...styles.icons, marginRight: spacing.medium_1 }}
                  />
                </Pressable>
              )}

              <Pressable
                onPress={() => {
                  deleteCartHandler(params);
                  // delete cart locally in state

                  const newCarts = carts.filter(function (cart) {
                    return cart.cartId !== props.cartId;
                  });
                  setCarts(newCarts);
                }}
              >
                <Image
                  source={require('../assets/icons/delete.png')}
                  style={{ ...styles.icons }}
                />
              </Pressable>
            </View>
            <View>
              {isEditing ? (
                <View></View>
              ) : (
                <Pressable
                  onPress={async () => {
                    // Add stars to budget

                    updateBudget(budget + params.rating, params);
                    setBudget(budget + params.rating);
                    // Update statusId in params
                    params.statusId = 2;
                    // Update cart in database
                    const response = await updateCartHandler(params);

                    // Update cart in local state
                    const newCarts = carts.map((cart) => {
                      if (cart.cartId === params.cartId) {
                        return { ...cart, statusId: 2 };
                      }
                      return cart;
                    });
                    setCarts(newCarts);
                  }}
                >
                  <Image
                    source={require('../assets/icons/done.png')}
                    style={{ ...styles.icons }}
                  />
                </Pressable>
              )}
            </View>
          </View>
        </View>
      )}
      {params.statusId == 2 && (
        <View style={{ ...styles.iconMenuWrap, marginTop: spacing.medium_1 }}>
          <View style={{ flexDirection: 'row' }}>
            <Pressable
              onPress={() => {
                deleteCartHandler(params);
                // delete cart locally in state

                const newCarts = carts.filter(function (cart) {
                  return cart.cartId !== props.cartId;
                });
                setCarts(newCarts);
              }}
            >
              <Image
                source={require('../assets/icons/delete.png')}
                style={{ ...styles.icons }}
              />
            </Pressable>
            <View
              style={{ flexDirection: 'row', marginLeft: spacing.medium_1 }}
            >
              <Image
                source={require('../assets/icons/star.png')}
                style={styles.star}
              />
              <Text style={{ color: 'white', marginLeft: spacing.small }}>
                {currentRating}
              </Text>
            </View>
          </View>
          <View>
            <Pressable
              onPress={async () => {
                // Remove stars from budget

                updateBudget(budget - params.rating, params);
                setBudget(budget - params.rating);

                // Update statusId in params
                params.statusId = 1;
                // Update cart in database
                const response = await updateCartHandler(params);
                console.log('response ', response);
                // Update cart in local state
                const newCarts = carts.map((cart) => {
                  if (cart.cartId === params.cartId) {
                    return { ...cart, statusId: 1 };
                  }
                  return cart;
                });
                console.log('newCarts: ', newCarts);
                setCarts(newCarts);
              }}
            >
              <Image
                source={require('../assets/icons/putBack.png')}
                style={{ ...styles.icons }}
              />
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  taskItemContainer: {
    padding: spacing.medium_1,
    margin: spacing.medium_1,
    borderRadius: spacing.small,
  },
  taskItemText: {
    color: 'white',
    fontSize: font.size_2,
    fontWeight: '600',
    padding: spacing.small,
    borderRadius: spacing.small,
  },
  ratingWrap: {
    margin: spacing.medium_1,
    padding: spacing.small,
    borderRadius: spacing.small,
  },
  iconMenuWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icons: {
    height: spacing.medium_1,
    width: spacing.medium_1,
    tintColor: colors.lightGrey,
  },
  star: {
    width: spacing.medium_1,
    height: spacing.medium_1,
    tintColor: colors.yellowStar,
  },
  saveButton: {
    paddingLeft: spacing.small,
    paddingRight: spacing.small,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: 'white',
    borderRadius: spacing.small,
    marginRight: spacing.medium_1,
  },
});
