import { Button, StyleSheet, Text, View } from 'react-native';
import { Rating } from 'react-native-ratings';
import { cartItemStyles } from '../utils/cardItemStyles.js';
import { buttonStyles, colors, font } from '../utils/styleConstants';

export default function TaskList(props) {
  console.log('props.typeId: ', props.typeId);
  return (
    <View
      style={{
        backgroundColor: props.typeId === 1 ? colors.green_1 : colors.purple_1,
        padding: cartItemStyles.padding,
        margin: cartItemStyles.margin,
        borderRadius: cartItemStyles.borderRadius,
      }}
    >
      <View>
        <Text style={styles.taskItemText}>{props.text}</Text>
      </View>
      <View>
        <Rating
          type="star"
          ratingCount={props.rating}
          imageSize={17}
          tintColor={props.typeId === 1 ? colors.green_1 : colors.purple_1}
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
    // padding: cartItemStyles.padding,
    // margin: cartItemStyles.margin,
    // borderRadius: cartItemStyles.borderRadius,
  },
  taskItemText: {
    color: 'white',
    fontSize: font.size_2,
    fontWeight: '600',
  },
});
