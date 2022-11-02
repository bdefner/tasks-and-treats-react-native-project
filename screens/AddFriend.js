import { useNavigation } from '@react-navigation/native';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function AddFriend() {
  const navigation = useNavigation();
  return (
    <View style={styles.screen}>
      <Text>CreateNew Screen</Text>
      <Button
        title="Add"
        onPress={() => {
          navigation.navigate('CreateNew');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
