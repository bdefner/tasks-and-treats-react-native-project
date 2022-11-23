import { useContext, useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import userContext from '../utils/context/UserContext';
import globals from '../utils/globals';
import { colors, spacing } from '../utils/styleConstants';

export default function Profile() {
  console.log('global.username', globals.username);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <View style={styles.menuCategoryWrap}>
      <View>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../assets/grafics/edit-profile.png')}
            style={{ width: 205, height: 110 }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: spacing.medium_2,
          }}
        >
          <View>
            <View style={styles.formElementWrap}>
              <Text>Username</Text>
              <View
                style={{
                  ...styles.inputFieldWrap,
                  backgroundColor: isEditing ? colors.lightGrey : 'white',
                }}
              >
                <TextInput
                  style={styles.textInput}
                  placeholder={globals.username}
                  editable={isEditing ? true : false}
                />
              </View>
            </View>
            <View style={styles.formElementWrap}>
              <Text>Email</Text>
              <View
                style={{
                  ...styles.inputFieldWrap,
                  backgroundColor: isEditing ? colors.lightGrey : 'white',
                }}
              >
                <TextInput
                  style={styles.textInput}
                  placeholder={'hallo@deona.at'}
                  editable={isEditing ? true : false}
                />
              </View>
            </View>
            {isEditing && (
              <View style={styles.formElementWrap}>
                <Text>Please enter your current password</Text>
                <View
                  style={{
                    ...styles.inputFieldWrap,
                    backgroundColor: isEditing ? colors.lightGrey : 'white',
                  }}
                >
                  <TextInput
                    style={styles.textInput}
                    placeholder={'current password'}
                    editable={isEditing ? true : false}
                  />
                </View>
              </View>
            )}
          </View>
          <View>
            {!isEditing ? (
              <Pressable onPress={() => setIsEditing(true)}>
                <View
                  style={{ ...styles.button, backgroundColor: colors.purple_1 }}
                >
                  <Text style={{ color: 'white' }}>edit</Text>
                </View>
              </Pressable>
            ) : (
              <Pressable onPress={() => setIsEditing(false)}>
                <View
                  style={{ ...styles.button, backgroundColor: colors.green_1 }}
                >
                  <Text style={{ color: 'white' }}>save</Text>
                </View>
              </Pressable>
            )}
          </View>
        </View>
      </View>
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
    padding: spacing.medium_1,
  },
  inputFieldWrap: {
    width: 200,
    borderRadius: spacing.small,
    marginTop: spacing.medium_1,
    backgroundColor: 'white',
  },
  textInput: {
    textAlign: 'left',
    color: colors.black,
    padding: spacing.small,
  },
  button: {
    paddingLeft: spacing.medium_1,
    paddingRight: spacing.medium_1,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: 'white',
    borderRadius: spacing.small,
    marginRight: spacing.medium_1,
    marginTop: spacing.medium_1,
    maxWidth: 70,
    alignItems: 'center',
  },
  formElementWrap: {
    marginBottom: spacing.medium_1,
    marginTop: spacing.medium_1,
  },
});
