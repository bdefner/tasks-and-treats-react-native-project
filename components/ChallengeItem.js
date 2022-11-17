import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, font, shadow, spacing } from '../utils/styleConstants';

export default function ChallengeItem(challenge) {
  const sign = Math.sign(challenge.item.reward) === 1 && '+';

  return (
    <View
      style={{
        ...styles.challengeWrap,
        backgroundColor:
          Math.sign(challenge.item.reward) === 1
            ? colors.green_1
            : colors.purple_1,
      }}
    >
      <View
        style={{
          ...styles.labelWrap,
          backgroundColor:
            Math.sign(challenge.item.reward) === 1
              ? colors.green_2
              : colors.purple_2,
        }}
      >
        <Text style={styles.label}>{challenge.item.label}</Text>
      </View>
      <View style={styles.descriptionWrap}>
        <Text style={styles.description}>{challenge.item.description}</Text>
      </View>

      <View style={styles.bottomViewWrap}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('../assets/icons/star.png')}
            style={styles.starIcon}
          />
          <Text style={styles.rewardNumber}>
            {sign}
            {challenge.item.reward}
          </Text>
        </View>
        <Image
          source={require('../assets/icons/not-done.png')}
          style={styles.doneIcon}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  labelWrap: {
    padding: spacing.small,
    borderRadius: spacing.small,
  },
  label: {
    fontSize: font.size_3,
    textAlign: 'center',
    color: 'white',
  },
  descriptionWrap: {
    marginTop: spacing.large_1,
    marginBottom: spacing.large_1,
  },

  challengeWrap: {
    justifyContent: 'center',
    borderRadius: spacing.small,
    margin: spacing.medium_1,
    marginTop: spacing.large_2,
    padding: spacing.medium_2,
    paddingBottom: spacing.medium_1,
    width: 300,
    ...shadow,
  },
  description: {
    fontSize: font.size_2,
    marginTop: spacing.medium_2,
    marginBottom: spacing.medium_2,
    textAlign: 'center',
    color: 'white',
  },
  challengeItemWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.medium_1,
    borderBottomColor: colors.greyBorder,
    borderBottomWidth: 1,
  },
  bottomViewWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rewardWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardNumber: {
    color: colors.grey,
    marginLeft: spacing.small,
    fontSize: font.size_3,
    color: 'white',
  },
  starIcon: {
    width: spacing.medium_3,
    height: spacing.medium_3,
  },
  doneIcon: {
    width: spacing.medium_2,
    height: spacing.medium_2,
    marginTop: spacing.medium_1,
    tintColor: 'white',
  },
});
