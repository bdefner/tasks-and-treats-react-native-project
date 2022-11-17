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
import ConditionalRuler from '../components/ConditionalRuler';
import StarBudgetDisplay from '../components/StarBudgetDisplay';
import TaskItem from '../components/TaskItem';
import TreatItem from '../components/TreatItem';
import CartsContext from '../utils/context/CartsContext';
import { colors, font, spacing } from '../utils/styleConstants';

function filterCartsForPersonalActiveTreats(carts) {
  const filteredCarts = carts.filter((item) => {
    return item.typeId === 2 && item.statusId === 1 && !item.groupId;
  });
  return filteredCarts;
}

function filterCartsForPersonalInactiveTreats(carts) {
  const filteredCarts = carts.filter((item) => {
    return item.typeId === 2 && item.statusId === 2 && !item.groupId;
  });
  const reversedFilteredCarts = filteredCarts.reverse();

  return filteredCarts;
}

function FillEmptyScreen(props) {
  if (props.isScreenEmpty) {
    return (
      <View style={styles.createFirstWrap}>
        <Image
          source={require('../assets/grafics/create-first-treat.png')}
          style={{ width: 255, height: 425 }}
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
  const [carts, setCarts] = useContext(CartsContext);

  const [currentActiveCarts, setCurrentActiveCarts] = useState(
    filterCartsForPersonalActiveTreats(carts),
  );
  const [currentInactiveCarts, setCurrentInactiveCarts] = useState(
    filterCartsForPersonalInactiveTreats(carts),
  );

  useEffect(() => {
    setCurrentActiveCarts(filterCartsForPersonalActiveTreats(carts));
    setCurrentInactiveCarts(filterCartsForPersonalInactiveTreats(carts));
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
        <Text style={styles.headerText}>Treats</Text>
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
              <TreatItem
                text={cart.label}
                typeId={cart.typeId}
                statusId={cart.statusId}
                cartId={cart.cartId}
                rating={cart.rating}
                key={cart.id}
              />
            );
          })}
          {
            <ConditionalRuler
              label="😎 that's how you treat yourself 👇"
              condition={currentInactiveCarts[0]}
            />
          }
          {currentInactiveCarts.map((cart) => {
            return (
              <TreatItem
                text={cart.label}
                typeId={cart.typeId}
                statusId={cart.statusId}
                cartId={cart.cartId}
                rating={cart.rating}
                key={cart.id}
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
  headerWrap: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.medium_1,
    backgroundColor: colors.purple_1,
    borderBottomColor: colors.greyBorder,
    borderBottomWidth: 2,
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

  headerText: {
    marginTop: spacing.large_2,
    fontSize: font.size_3,
    color: 'white',
  },
});
