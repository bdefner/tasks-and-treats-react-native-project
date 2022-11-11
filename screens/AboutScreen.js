import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors, font, spacing } from '../utils/styleConstants';

export default function About() {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <View style={styles.contentWrap}>
          <View style={styles.innerWrap}>
            <Text style={styles.p}>This app was created by me, Beppino.</Text>
            <Text style={styles.p}>
              It is part my final project of the UpLeveled Bootcamp Vienna in
              November 2022
            </Text>
            <Text style={styles.p}>
              I'm happy, if you want to get in touch!
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Pressable>
                <Image
                  source={require('../assets/icons/social/github.png')}
                  style={styles.socialIcons}
                />
              </Pressable>
              <Pressable>
                <Image
                  source={require('../assets/icons/social/linkedin.png')}
                  style={styles.socialIcons}
                />
              </Pressable>
              <Pressable>
                <Image
                  source={require('../assets/icons/social/whatsapp.png')}
                  style={styles.socialIcons}
                />
              </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.contentWrap}>
          <Text style={styles.h1}>The project</Text>
          <View style={styles.innerWrap}>
            <Text style={styles.p}>
              This is a fullstack react native and node.js project.
            </Text>
            <Text style={styles.h2}>The frontend</Text>
            <Text style={styles.p}>
              This app was written using react native with expo.
            </Text>
            <Pressable
              style={{ ...styles.iconButton, backgroundColor: 'black' }}
            >
              <Image
                source={require('../assets/icons/github.png')}
                style={{ ...styles.buttonIcon, tintColor: 'white' }}
              />
              <Text style={styles.buttonText}>see the code</Text>
            </Pressable>
            <Text style={styles.h2}>The backend</Text>
            <Text style={styles.p}>
              The backend was written in next.js, node.js and sql, using
              postgres.
            </Text>
            <Text style={styles.p}>You can see the code here:</Text>
            <Text></Text>
          </View>
        </View>
      </View>
    </ScrollView>
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
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.small,
    margin: spacing.medium_1,
    borderRadius: spacing.small,
    width: 'auto',
  },
  buttonIcon: {
    width: 30,
    height: 30,
  },
  buttonText: {
    fontSize: font.size_2,
    marginLeft: spacing.medium_1,
    marginRight: spacing.medium_1,
    fontWeight: '500',
    color: 'white',
  },
  socialIcons: {
    width: 32,
    height: 32,
    margin: spacing.medium_1,
  },
});
