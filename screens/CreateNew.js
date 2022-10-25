import { StyleSheet, Text, View } from 'react-native';

export default function CreateNew() {
  return (
    <View style={styles.screen}>
      <Text>CreateNew Screen</Text>
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
