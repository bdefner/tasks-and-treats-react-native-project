import { Button, StyleSheet, Text, View } from 'react-native';
import { Rating } from 'react-native-ratings';
import { cartItemStyles } from '../utils/cardItemStyles.js';
import { buttonStyles, colors, font } from '../utils/styleConstants';

export default function TaskList(props) {
  return (
    <View style={styles.taskItemContainer}>
      <View>
        <Text style={styles.taskItemText}>{props.text}</Text>
      </View>
      <View>
        <Rating
          type="star"
          ratingCount={props.rating}
          imageSize={17}
          tintColor={colors.green_1}
          // onFinishRating={ratingCompleted}
        />
        <View style={buttonStyles.greenSecondary}>
          <Button title="done" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  taskItemContainer: {
    padding: cartItemStyles.padding,
    margin: cartItemStyles.margin,
    backgroundColor: colors.green_1,
    borderRadius: cartItemStyles.borderRadius,
  },
  taskItemText: {
    color: 'white',
    fontSize: font.size_2,
    fontWeight: '600',
  },
});
