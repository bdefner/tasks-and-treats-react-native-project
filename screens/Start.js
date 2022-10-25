import { useNavigation } from '@react-navigation/native';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Start() {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Welcome to Tasks & Treats</Text>
      <Button
        title="Login"
        onPress={() => {
          navigation.navigate('Home');
        }}
      />
      <Button title="Register" />
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
