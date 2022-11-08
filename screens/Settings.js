import { useNavigation } from '@react-navigation/native';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors, font, spacing } from '../utils/styleConstants';

export default function Settings() {
  const navigation = useNavigation();
  return (
    <View style={styles.screen}>
      <ScrollView style={styles.scrollableWrap}>
        <View style={styles.menuCategoryWrap}>
          <Pressable style={styles.menuItemWrap} onPress={() => {}}>
            <View>
              <Image
                source={require('../assets/icons/alert.png')}
                style={{ ...styles.icons, tintColor: colors.green_1 }}
              />
            </View>
            <View>
              <Text style={{ fontSize: font.size_2 }}>Notifications</Text>
            </View>
          </Pressable>
          <Pressable
            style={styles.menuItemWrap}
            onPress={() => {
              navigation.navigate('About');
            }}
          >
            <View>
              <Image
                source={require('../assets/icons/about.png')}
                style={{ ...styles.icons, tintColor: colors.black }}
              />
            </View>
            <View>
              <Text style={{ fontSize: font.size_2 }}>About</Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.menuCategoryWrap}>
          <Pressable
            style={styles.menuItemWrap}
            onPress={() => {
              navigation.navigate('SecureLogoutScreen');
            }}
          >
            <View>
              <Image
                source={require('../assets/icons/logout.png')}
                style={{ ...styles.icons, tintColor: colors.purple_1 }}
              />
            </View>
            <View>
              <Text style={{ fontSize: font.size_2 }}>Logout</Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollableWrap: {
    backgroundColor: colors.greyBorder,
  },
  headerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.medium_1,
    backgroundColor: colors.lightGrey,
    borderBottomColor: colors.greyBorder,
    borderBottomWidth: 2,
  },
  headerText: {
    marginTop: spacing.large_2,
    fontSize: font.size_3,
    color: colors.black,
  },
  menuItemWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: spacing.medium_1,
    alignItems: 'center',
    borderBottomColor: colors.greyBorder,
    borderBottomWidth: 1,
  },
  menuCategoryWrap: {
    margin: spacing.medium_1,
    borderRadius: spacing.small,
    backgroundColor: 'white',
  },
  icons: {
    height: spacing.medium_2,
    width: spacing.medium_2,
    marginRight: spacing.medium_2,
  },
});
