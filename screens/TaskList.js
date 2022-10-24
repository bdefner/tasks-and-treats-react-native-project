import { useState } from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Rating } from 'react-native-ratings';
import TaskItem from '../components/TaskItem';
import { colors, spacing } from '../utils/globalStyleObjects';

export default function TaskList() {
  const [taskInput, setTaskInput] = useState('');
  const [tasks, setTasks] = useState([]);
  const [ratingInput, setRatingInput] = useState(5);

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
      <View style={styles.topNavigation}>
        <Text>Top navigation</Text>
      </View>
      <View style={styles.itemListContainer}>
        <FlatList
          data={tasks}
          renderItem={(data) => {
            return (
              <TaskItem
                text={data.item.text}
                id={data.item.id}
                rating={data.item.rating}
              />
            );
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
        />
      </View>
      <View style={styles.inputContainer}>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  topNavigation: {
    flex: 1,
    padding: spacing.small,
    borderWidth: 1,
  },
  itemListContainer: {
    flex: 3,
    padding: spacing.medium_1,
    borderWidth: 1,
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
});
