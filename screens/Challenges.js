import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import ChallengeItem from '../components/ChallengeItem';
import StarBudgetDisplay from '../components/StarBudgetDisplay';
import Global from '../utils/globals';
import { colors, font, spacing } from '../utils/styleConstants';

export default function Challenges() {
  console.log('Global.allChallenges: ', Global.allChallenges);
  return (
    <View style={styles.screen}>
      <View style={styles.headerWrap}>
        <View
          style={{
            position: 'absolute',
            left: spacing.medium_1,
            bottom: spacing.medium_1,
          }}
        >
          <StarBudgetDisplay />
        </View>
        <Text style={styles.headerText}>🚀 Challenges</Text>
      </View>
      <View>
        <FlatList
          data={Global.allChallenges}
          renderItem={ChallengeItem}
          keyExtractor={(challenge) => challenge.challengeId}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.purple_2,
  },
  headerWrap: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.medium_1,
    backgroundColor: colors.black,
    borderBottomColor: colors.greyBorder,
    borderBottomWidth: 2,
  },
  headerText: {
    marginTop: spacing.large_2,
    fontSize: font.size_4,
    color: 'white',
  },

  scrollableWrap: {
    backgroundColor: colors.greyBorder,
  },
  menuCategoryWrap: {
    margin: spacing.medium_1,
    borderRadius: spacing.small,
    backgroundColor: 'white',
  },
  menuItemWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: spacing.medium_1,
    alignItems: 'center',
    borderBottomColor: colors.greyBorder,
    borderBottomWidth: 1,
  },
});
