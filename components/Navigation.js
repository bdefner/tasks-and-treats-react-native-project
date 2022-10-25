import { useNavigation } from '@react-navigation/native';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Navigation() {
  const navigation = useNavigation();

  return (
    <View style={styles.navigation}>
      <Button title="S" onPress={() => navigation.navigate('Settings')} />
      <Button title="Tasks" onPress={() => navigation.navigate('Tasks')} />
      <Button title="New" onPress={() => navigation.navigate('CreateNew')} />
      <Button title="Treats" onPress={() => navigation.navigate('Treats')} />
      <Button title="?" onPress={() => navigation.navigate('Help')} />
    </View>
  );
}

const styles = StyleSheet.create({
  navigation: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
