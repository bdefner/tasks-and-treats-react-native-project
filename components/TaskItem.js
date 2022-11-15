import { useContext, useState } from 'react';
import { Button, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Rating } from 'react-native-ratings';
import budgetContext from '../utils/BudgetContext';
import cartsContext from '../utils/CartsContext';
import Global from '../utils/globals.js';
import { colors, font, spacing } from '../utils/styleConstants';

function getTintColorBasedOnStatusAndType(typeId, statusId) {
  if (typeId === 1 && statusId == 1) return colors.green_1;
  if (typeId === 1 && statusId == 2) return colors.green_2;
  if (typeId === 2 && statusId == 1) return colors.purple_1;
  if (typeId === 2 && statusId == 2) return colors.purple_2;
}

async function updateCartHandler(params) {
  const apiBaseUrl = 'http://localhost:3000/api/updatecart';

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
  const apiBaseUrl = 'http://localhost:3000/api/deletecart';

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
  const [carts, setCarts] = useContext(cartsContext);
  const [currentLabel, setCurrentLabe] = useState(props.text);
  const [currentRating, setCurrentRating] = useState(props.rating);
  const [currentStatusId, setCurrentStatusId] = useState(props.statusId);
  const [budget, setBudget] = useContext(budgetContext);

  async function updateBudget(budget, params) {
    const apiBaseUrl = 'http://localhost:3000/api/updateuser';
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
        <Text style={styles.taskItemText}>{currentLabel}</Text>
      </View>
      {params.statusId == 1 && (
        <View>
          <View style={styles.ratingWrap}>
            <Rating
              type="star"
              ratingCount={currentRating}
              imageSize={17}
              tintColor={tintColor}
              // onFinishRating={ratingCompleted}
            />
          </View>

          <View style={styles.iconMenuWrap}>
            <View style={{ flexDirection: 'row' }}>
              <Pressable>
                <Image
                  source={require('../assets/icons/edit.png')}
                  style={{ ...styles.icons, marginRight: spacing.medium_1 }}
                />
              </Pressable>
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
  },
  ratingWrap: {
    padding: spacing.medium_1,
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
});
