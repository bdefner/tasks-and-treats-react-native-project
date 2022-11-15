import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, font, shadow, spacing } from '../utils/styleConstants';

export default function ChallengeItem(challenge) {
  const sign = Math.sign(challenge.item.reward) === 1 && '+';

  return (
    <View style={styles.challengeWrap}>
      <Text style={styles.label}>{challenge.item.label}</Text>
      <Text style={styles.description}>{challenge.item.description}</Text>
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
  label: {
    fontSize: font.size_3,
    textAlign: 'center',
  },
  challengeWrap: {
    justifyContent: 'center',
    borderRadius: spacing.small,
    margin: spacing.medium_1,
    marginTop: spacing.large_2,
    padding: spacing.medium_2,
    paddingBottom: spacing.medium_1,
    backgroundColor: 'white',
    width: 300,
    ...shadow,
    shadowColor: colors.green_1,
  },
  description: {
    fontSize: font.size_2,
    marginTop: spacing.large_1,
    marginBottom: spacing.large_1,
    textAlign: 'center',
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
  },
  starIcon: {
    width: spacing.medium_3,
    height: spacing.medium_3,
  },
  doneIcon: {
    width: spacing.medium_2,
    height: spacing.medium_2,
    marginTop: spacing.medium_1,
    tintColor: colors.grey,
  },
});
