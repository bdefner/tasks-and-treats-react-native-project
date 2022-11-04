import { useState } from 'react';
import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Rating } from 'react-native-ratings';
import TaskItem from '../components/TaskItem';
// import { carts } from '../database/carts';
// import { groups } from '../database/groups';
import { colors, font, spacing } from '../utils/styleConstants';

function filterCartsForPersonalTreats(carts) {
  const filteredCarts = carts.filter((item) => {
    return item.typeId === 2 && !item.groupId;
  });
  return filteredCarts;
}

export default function TaskList({ route }) {
  const [taskInput, setTaskInput] = useState('');
  const [CurrentTasks, setCurrentTasks] = useState([]);
  const [ratingInput, setRatingInput] = useState(5);
  const [currentCartId, setCurrentCartId] = useState(1);

  const currentCarts = filterCartsForPersonalTreats(route.params.carts);

  function taskInputHandler(input) {
    setTaskInput(input);
  }

  function ratingCompleted(rating) {
    console.log('Rating is: ' + rating);
    setRatingInput(rating);
  }

  function addTaskHandler() {
    setTasks((currentTasks) => [
      ...currentTasks,
      { text: taskInput, rating: ratingInput, id: Math.random().toString() },
    ]);
  }

  return (
    <View style={styles.screen}>
      <View style={styles.headerWrap}>
        <Text style={styles.headerText}>Treats</Text>
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
      <View style={styles.itemListContainer}>
        <FlatList
          data={currentCarts}
          renderItem={(cart) => {
            return (
              <TaskItem
                text={cart.item.label}
                id={cart.item.cartId}
                rating={cart.item.rating}
                typeId={cart.item.typeId}
              />
            );
          }}
          keyExtractor={(item, index) => {
            return item.cartid;
          }}
        />
      </View>
      {/* <View style={styles.inputContainer}>
        <View style={styles.rowOfInputs}>
          <View>
            <View style={styles.tasksInput}>
              <TextInput
                placeholder="add a task"
                onChangeText={taskInputHandler}
              />
            </View>
            <View style={styles.ratingContainer}>
              <Rating
                type="star"
                ratingCount={10}
                imageSize={30}
                showRating
                onFinishRating={ratingCompleted}
              />
            </View>
          </View>
          <Button title="Add Task" onPress={addTaskHandler} />
        </View>
      </View> */}
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
  itemListContainer: {
    flex: 8,
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
    justifyContent: 'center',
    padding: spacing.medium_1,
    backgroundColor: colors.purple_1,
    borderBottomColor: colors.greyBorder,
    borderBottomWidth: 2,
  },
  headerText: {
    marginTop: spacing.large_2,
    fontSize: font.size_4,
    color: 'white',
  },
});
