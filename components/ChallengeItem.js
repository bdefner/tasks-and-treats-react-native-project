import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, font, spacing } from '../utils/styleConstants';

export default function ChallengeItem(challenge) {
  const sign = Math.sign(challenge.reward) === 1 && '+';

  return (
    <View>
      <View style={styles.challengeItemWrap}>
        <View>
          <Text style={styles.label}>{challenge.label}</Text>
          <Text style={styles.description}>{challenge.description}</Text>
        </View>
        <View>
          <View style={{ alignItems: 'flex-end' }}>
            <View style={styles.rewardWrap}>
              <Text style={styles.rewardNumber}>
                {sign}
                {challenge.reward}
              </Text>
              <Image
                source={require('../assets/icons/star.png')}
                style={styles.starIcon}
              />
            </View>
            <Image
              source={require('../assets/icons/not-done.png')}
              style={styles.doneIcon}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: font.size_2,
  },
  description: {
    fontSize: font.size_1,
    marginTop: spacing.medium_1,
  },
  challengeItemWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.medium_1,
    borderBottomColor: colors.greyBorder,
    borderBottomWidth: 1,
  },
  rewardWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardNumber: {
    color: colors.grey,
    marginRight: spacing.small,
  },
  starIcon: {
    width: spacing.medium_2,
    height: spacing.medium_2,
  },
  doneIcon: {
    width: spacing.medium_2,
    height: spacing.medium_2,
    marginTop: spacing.medium_1,
    tintColor: colors.grey,
  },
});
