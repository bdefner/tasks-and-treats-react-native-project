import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, font, spacing } from '../utils/styleConstants';

export default function Connections() {
  return (
    <View style={styles.screen}>
      <View style={styles.contentWrap}>
        <Text style={styles.h1}>🏗 503 | under construction</Text>
        <View style={styles.innerWrap}>
          <Text style={styles.p}>This feature isn't done yet :/</Text>
          <Image
            source={require('../assets/grafics/connections-503.png')}
            style={{ width: 281, height: 134 }}
          />
          <Text style={styles.p}>
            This feature will let you connect to a friend and share tasks and
            tweets between each other in a chat like manner.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: spacing.medium_2,
  },
  contentWrap: {
    backgroundColor: 'white',
    borderRadius: spacing.small,
    marginBottom: spacing.medium_2,
    overflow: 'hidden',
  },
  innerWrap: {
    padding: spacing.small,
    alignItems: 'center',
  },
  h1: {
    fontSize: font.size_3,
    textAlign: 'center',
    marginBottom: spacing.medium_1,
    padding: spacing.small,
    fontWeight: '400',
    color: 'white',
    backgroundColor: colors.green_1,
  },
  h2: {
    fontSize: font.size_3,
    marginTop: spacing.medium_1,
    marginBottom: spacing.small,
  },
  p: {
    fontSize: font.size_2,
    padding: spacing.small,
    textAlign: 'center',
  },
});
