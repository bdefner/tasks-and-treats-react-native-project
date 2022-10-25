import { StyleSheet, Text, View } from 'react-native';

export default function Treats() {
  return (
    <View style={styles.screen}>
      <Text>Treats Screen</Text>
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
