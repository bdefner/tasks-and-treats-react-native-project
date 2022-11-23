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
import budgetContext from '../utils/context/BudgetContext';
import cartsContext from '../utils/context/CartsContext';
import Global from '../utils/globals.js';
import globals from '../utils/globals.js';
import { colors, font, spacing } from '../utils/styleConstants';

function getTintColorBasedOnStatus(typeId, statusId) {
  if (typeId === 2 && statusId == 1) return colors.purple_1;
  if (typeId === 2 && statusId == 2) return colors.purple_2;
}

async function updateCartHandler(params) {
  const apiUrl = `${globals.apiBaseUrl}/updatecart`;
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
  const apiBaseUrl = `${globals.apiBaseUrl}/deletecart`;
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
    const apiBaseUrl = `${globals.apiBaseUrl}/updateuser`;
    // Update the budget on the database

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

  const tintColor = getTintColorBasedOnStatus(props.typeId, currentStatusId);

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
                ? colors.purple_2
                : isEditing
                ? colors.purple_2
                : colors.purple_1,
          }}
          value={currentLabel}
        />
      </View>
      {params.statusId == 1 && (
        <View>
          <View
            style={{
              ...styles.ratingWrap,
              backgroundColor: isEditing ? colors.purple_2 : colors.purple_1,
            }}
          >
            <View
              style={{
                ...styles.flexRowCenter,
                justifyContent: 'center',
              }}
            >
              <View style={styles.flexRowCenter}>
                <Image
                  source={require('../assets/icons/star.png')}
                  style={styles.starIcon}
                />

                <Text style={{ color: 'white' }}>{currentRating}</Text>
                {isEditing && (
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: spacing.medium_1,
                    }}
                  >
                    <Pressable
                      onPress={() => {
                        currentRating > 1 &&
                          setCurrentRating(currentRating - 1);
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
                        currentRating < 999 &&
                          setCurrentRating(currentRating + 1);
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
                )}
              </View>
            </View>
          </View>

          <View style={styles.iconMenuWrap}>
            <View style={styles.flexRowCenter}>
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
                  }}
                >
                  <View
                    style={{
                      ...styles.textButton,
                      marginRight: spacing.medium_1,
                    }}
                  >
                    <Text style={{ color: colors.purple_1 }}>save</Text>
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
              {currentRating > budget ? (
                <Text style={{ color: 'white' }}>
                  you need {currentRating - budget} more stars
                </Text>
              ) : isEditing ? (
                <View></View>
              ) : (
                <Pressable
                  onPress={async () => {
                    // Remove stars to budget
                    updateBudget(budget - params.rating, params);
                    setBudget(budget - params.rating);
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
                  <View style={styles.textButton}>
                    <Text style={{ color: colors.purple_1 }}>redeem</Text>
                  </View>
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
                console.log('params.rating:', params.rating);

                // Put stars back to budget

                updateBudget(budget + params.rating, params);
                setBudget(budget + params.rating);

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
    backgroundColor: colors.purple_2,
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
  starIcon: {
    width: spacing.medium_2,
    height: spacing.medium_2,
    marginRight: spacing.small,
  },
  textButton: {
    paddingLeft: spacing.small,
    paddingRight: spacing.small,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: 'white',
    borderRadius: spacing.small,
  },
  flexRowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
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
});
