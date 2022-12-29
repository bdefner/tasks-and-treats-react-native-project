import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CartsContext from '../utils/context/CartsContext';
import globals from '../utils/globals';
import { colors, font, spacing } from '../utils/styleConstants';

export default function Dashboard({ route }) {
  const user = route.params.user;
  const [carts, setCarts] = useContext(CartsContext);
  const navigation = useNavigation();

  const activeTasks = carts.filter((item) => {
    return item.typeId === 1 && item.statusId === 1 && !item.groupId;
  });

  const activeTreats = carts.filter((item) => {
    return item.typeId === 2 && item.statusId === 1 && !item.groupId;
  });

  return (
    <ScrollView style={styles.screen}>
      <View>
        <View style={styles.chipWrap}>
          <View
            style={{
              ...styles.chip,
              backgroundColor: 'white',
              flexDirection: 'row',
            }}
          >
            <Text style={{ ...styles.chipCount, color: 'black' }}>
              {user.budget}
            </Text>
            <Image
              source={require('../assets/icons/star.png')}
              style={{
                width: spacing.medium_3,
                height: spacing.medium_3,
                marginLeft: spacing.small,
              }}
            />
          </View>
          <View style={{ ...styles.chip, flexDirection: 'row' }}>
            <Image
              source={require('../assets/icons/profile.png')}
              style={{
                width: spacing.medium_2,
                height: spacing.medium_2,
                marginRight: spacing.small,
              }}
            />
            <Text style={styles.h1}>{user.username}</Text>
          </View>
        </View>
      </View>
      <View style={styles.chipWrap}>
        <Pressable
          onPress={() => {
            navigation.navigate('Tasks');
          }}
          style={{ ...styles.chip, backgroundColor: colors.green_2 }}
        >
          <Text style={styles.chipHeading}>Tasks</Text>
          <Text style={styles.chipCount}>{activeTasks.length}</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('Treats');
          }}
          style={{ ...styles.chip, backgroundColor: colors.purple_2 }}
        >
          <Text style={styles.chipHeading}>Treats</Text>
          <Text style={styles.chipCount}>{activeTreats.length}</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('Challenges');
          }}
          style={{ ...styles.chip, backgroundColor: colors.black }}
        >
          <Text style={styles.chipHeading}>Challenges</Text>
          <Text style={styles.chipCount}>2 / 12</Text>
        </Pressable>
      </View>
      <Text style={{ ...styles.h2, marginTop: spacing.large_1 }}>
        Leaderboard
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: spacing.medium_2,
    paddingTop: spacing.large_3,
  },
  h1: {
    fontSize: font.size_4,
    margin: spacing.medium_2,
    marginBottom: spacing.medium_1,

    fontWeight: '400',
    color: 'black',
  },
  h2: {
    fontSize: font.size_3,
    marginTop: spacing.medium_1,
    marginBottom: spacing.small,
  },
  chipHeading: {
    color: 'white',
    fontWeight: '600',
    fontSize: font.size_2,
    marginBottom: spacing.medium_1,
  },
  chipCount: {
    fontWeight: '200',
    fontSize: font.size_4,
    color: 'white',
  },
  p: {
    fontSize: font.size_2,
    padding: spacing.small,
    textAlign: 'center',
  },
  chipWrap: {
    marginTop: spacing.medium_1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chip: {
    margin: spacing.small,
    padding: spacing.medium_1,
    borderRadius: spacing.small,
    alignItems: 'center',
  },
});
