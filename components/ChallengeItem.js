import { Image, Pressable, Share, StyleSheet, Text, View } from 'react-native';
import Global from '../utils/globals';
import { colors, font, shadow, spacing } from '../utils/styleConstants';

async function onShare(username, inviteToken) {
  try {
    const result = await Share.share({
      message: `Get things done the fun way! 🥳
      With this free and fun app for procrastination lovers! Use the code "${inviteToken}" on registration and help ${username} to get a reward!`,
      url: 'exp://exp.host/@beppino/tasks-and-treats',
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
}

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
        {challenge.item.challengeId === 1 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
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
              <Text style={{ color: 'white', fontWeight: '700' }}>
                {Global.inviteToken}
              </Text>
            </View>
            <Pressable
              onPress={() => onShare(Global.username, Global.inviteToken)}
              style={styles.inMessageButton}
            >
              <Text style={{ color: 'white' }}>Copy & Share</Text>
            </Pressable>
          </View>
        )}
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
        {challenge.item.challengeId === 1 ? (
          <Text style={{ color: 'white' }}>use it often!</Text>
        ) : (
          <Image
            source={require('../assets/icons/not-done.png')}
            style={styles.doneIcon}
          />
        )}
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
    justifyContent: 'space-between',
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
    alignItems: 'center',
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
  inMessageButton: {
    margin: spacing.small,
    padding: spacing.small,
    backgroundColor: colors.purple_1,
    borderRadius: spacing.small,
  },
});
