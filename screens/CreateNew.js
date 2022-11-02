import { useNavigation } from '@react-navigation/native';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function CreateNew() {
  const navigation = useNavigation();
  return (
    <View style={styles.screen}>
      <Text>CreateNew Screen</Text>
      <Button
        title="Add a friend"
        onPress={() => {
          navigation.navigate('AddFriend');
        }}
      />
      <Button
        title="Create"
        onPress={() => {
          navigation.navigate('Tasks');
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
