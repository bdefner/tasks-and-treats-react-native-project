import Lottie from 'lottie-react-native';
import { useContext, useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Rating } from 'react-native-ratings';
import ConditionalRuler from '../components/ConditionalRuler';
import StarBudgetDisplay from '../components/StarBudgetDisplay';
import TaskItem from '../components/TaskItem';
import CartsContext from '../utils/CartsContext';
import { colors, font, spacing } from '../utils/styleConstants';

function filterCartsForPersonalActiveTasks(carts) {
  const filteredCarts = carts.filter((item) => {
    return item.typeId === 1 && item.statusId === 1 && !item.groupId;
  });
  return filteredCarts;
}

function filterCartsForPersonalInactiveTasks(carts) {
  const filteredCarts = carts.filter((item) => {
    return item.typeId === 1 && item.statusId === 2 && !item.groupId;
  });
  const reversedFilteredCarts = filteredCarts.reverse();

  return filteredCarts;
}

function FillEmptyScreen(props) {
  if (props.isScreenEmpty) {
    return (
      <View style={styles.createFirstWrap}>
        <Image
          source={require('../assets/grafics/create-first-task.png')}
          style={{ width: 248, height: 415 }}
        />
      </View>
    );
  }
}

function isScreenEmpty(currentActiveCarts, currentInactiveCarts) {
  if (!currentActiveCarts[0] && !currentInactiveCarts[0]) {
    return true;
  } else {
    return false;
  }
}

export default function TaskList({ route }) {
  // const [taskInput, setTaskInput] = useState('');
  // const [ratingInput, setRatingInput] = useState(5);
  // const [currentCartId, setCurrentCartId] = useState(1);

  const [carts, setCarts] = useContext(CartsContext);
  // const [currentBudget, setCurrentBudget] = useContext(budgetContext);
  // setCurrentBudget(10);

  const [currentActiveCarts, setCurrentActiveCarts] = useState(
    filterCartsForPersonalActiveTasks(carts),
  );
  const [currentInactiveCarts, setCurrentInactiveCarts] = useState(
    filterCartsForPersonalInactiveTasks(carts),
  );

  useEffect(() => {
    setCurrentActiveCarts(filterCartsForPersonalActiveTasks(carts));
    setCurrentInactiveCarts(filterCartsForPersonalInactiveTasks(carts));
    if (!currentActiveCarts[0] && !currentInactiveCarts[0]) {
    }
  }, [carts]);

  return (
    <View style={styles.screen}>
      <View style={styles.headerWrap}>
        <View
          style={{
            position: 'absolute',
            left: spacing.medium_1,
            bottom: spacing.medium_1,
          }}
        >
          <StarBudgetDisplay />
        </View>
        <Text style={styles.headerText}>Tasks</Text>
        <View></View>
      </View>
      {/* On top horizontal scroll navigation */}

      <View>
        {/* <FlatList
          horizontal={true}
          data={groups}
          renderItem={(group) => {
            return (
              <Pressable
                onPress={() => {
                  setCurrentCartId(group.item.id);
                }}
                style={{
                  margin: spacing.medium_1,
                  padding: spacing.small,
                  borderWidth: 1,
                  borderRadius: spacing.small,
                  backgroundColor:
                    group.item.id === currentCartId ? colors.green_1 : 'white',
                  borderColor: colors.green_1,
                }}
              >
                <Text
                  style={{
                    color:
                      group.item.id === currentCartId
                        ? 'white'
                        : colors.green_1,
                  }}
                >
                  {group.item.name}
                </Text>
              </Pressable>
            );
          }}
        /> */}
      </View>

      <FillEmptyScreen
        isScreenEmpty={isScreenEmpty(currentActiveCarts, currentInactiveCarts)}
      />
      {/*
      FlatList is not used, since there are two list to be rendered in one scrollview. Performance should be good, even with long lists
      */}
      <ScrollView>
        <View style={styles.itemListContainer}>
          {currentActiveCarts.map((cart) => {
            return (
              <TaskItem
                text={cart.label}
                typeId={cart.typeId}
                statusId={cart.statusId}
                cartId={cart.cartId}
                rating={cart.rating}
              />
            );
          })}
          {
            <ConditionalRuler
              label="😎 see what you've done 👇"
              condition={currentInactiveCarts[0]}
            />
          }
          {currentInactiveCarts.map((cart) => {
            return (
              <TaskItem
                text={cart.label}
                typeId={cart.typeId}
                statusId={cart.statusId}
                cartId={cart.cartId}
                rating={cart.rating}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  topNavigationItem: {
    margin: spacing.medium_1,
    padding: spacing.small,
    borderWidth: 1,
    borderRadius: spacing.small,
  },
  createFirstWrap: {
    flex: 100,
    padding: spacing.medium_1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemListContainer: {
    flex: 100,
    padding: spacing.medium_1,
    borderWidth: 0,
  },

  inputContainer: {
    padding: spacing.medium_1,
    flex: 4,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tasksInput: {
    flex: 1,
    borderWidth: 1,
    padding: spacing.small,
    borderColor: colors.grey,
    backgroundColor: colors.lightGrey,
    borderRadius: 8,
  },
  rowOfInputs: {
    flexDirection: 'row',
  },
  ratingContainer: {
    flex: 1,
  },
  headerWrap: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.medium_1,
    backgroundColor: colors.green_1,
    borderBottomColor: colors.greyBorder,
    borderBottomWidth: 2,
  },
  headerText: {
    marginTop: spacing.large_2,
    fontSize: font.size_4,
    color: 'white',
  },
});
