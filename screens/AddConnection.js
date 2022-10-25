import { StyleSheet, Text, View } from 'react-native';

export default function AddConnection() {
  return (
    <View style={styles.screen}>
      <Text>AddConnection Screen</Text>
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
