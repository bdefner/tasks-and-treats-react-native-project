import { useNavigation } from '@react-navigation/native';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Login() {
  const navigation = useNavigation();
  return (
    <View style={styles.screen}>
      <Text>Login Screen</Text>
      <Button
        title="Login"
        onPress={() => {
          navigation.navigate('TabBar');
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
