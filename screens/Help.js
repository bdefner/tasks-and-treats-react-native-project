import { StyleSheet, Text, View } from 'react-native';

export default function Help() {
  return (
    <View style={styles.screen}>
      <Text>Help Screen</Text>
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
