import { useNavigation } from '@react-navigation/native';
import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { buttonStyles, colors, spacing } from '../utils/styleConstants';

export default function Login() {
  const navigation = useNavigation();
  return (
    <View style={styles.screen}>
      <View>
        <Text style={styles.heading}>You look familiar. Do I know you??</Text>
        <Image
          source={require('../assets/grafics/login.png')}
          style={styles.welcomeImg}
        />
        <View style={styles.inputFieldWrap}>
          <TextInput style={styles.inputField} placeholder="username" />
        </View>
        <View style={styles.inputFieldWrap}>
          <TextInput style={styles.inputField} placeholder="password" />
        </View>
      </View>
      <View>
        <Pressable
          style={buttonStyles.greenPrimary}
          onPress={() => {
            navigation.replace('TabBar');
          }}
        >
          <Text style={{ color: 'white' }}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeImg: {
    width: 281,
    height: 225,
    margin: spacing.medium_2,
  },
  inputFieldWrap: {
    borderRadius: spacing.small,
    borderColor: colors.grey,
    borderWidth: 1,
    margin: spacing.medium_1,
    backgroundColor: 'white',
  },
  inputField: {
    padding: spacing.small,
  },
  heading: {
    fontSize: spacing.medium_1,
    textAlign: 'center',
  },
});
