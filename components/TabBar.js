import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AboutScreen from '../screens/AboutScreen';
import AddFriend from '../screens/AddFriend';
import Challenges from '../screens/Challenges';
import CreateNew from '../screens/CreateNew';
import Settings from '../screens/Settings';
import Tasks from '../screens/Tasks';
import Treats from '../screens/Treats';
import { colors, font, shadow, spacing } from '../utils/styleConstants';

const CreateNewStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();

function CreateNewStackScreen() {
  return (
    <CreateNewStack.Navigator>
      <CreateNewStack.Screen name="CreateNew" component={CreateNew} />
      <CreateNewStack.Screen name="AddFriend" component={AddFriend} />
    </CreateNewStack.Navigator>
  );
}
function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={Settings} />
      <SettingsStack.Screen name="About" component={AboutScreen} />
    </SettingsStack.Navigator>
  );
}

export default function TabBar({ route }) {
  const Tab = createBottomTabNavigator();

  const [carts, setCarts] = useState(route.params.carts);

  return (
    <Tab.Navigator
      initialRouteName="Tasks"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="SettingsStack"
        component={SettingsStackScreen}
        options={{
          tabBarIcon: (focused) => (
            <View style={styles.tabBarWrapWithIcon}>
              <Image
                source={require('../assets/icons/settings.png')}
                resizeMode="contain"
                style={styles.navIconStyle}
              />
              <Text
                style={{
                  color: focused ? colors.black : 'blue',
                  fontSize: 10,
                }}
              >
                Settings
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={Tasks}
        initialParams={{ carts: carts }}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <View
              style={{
                padding: 4,
                borderRadius: spacing.small,
                backgroundColor: colors.green_1,
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: font.size_2,
                }}
              >
                Tasks
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="New"
        component={CreateNewStackScreen}
        initialParams={{ user: route.params.user }}
        options={{
          tabBarIcon: (focused) => (
            <View style={styles.tabBarWrapCreateNew}>
              <Image
                source={require('../assets/icons/createNew.png')}
                resizeMode="contain"
                style={{
                  width: 40,
                  height: 40,
                  tintColor: focused ? colors.black : 'blue',
                  margin: 3,
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Treats"
        component={Treats}
        initialParams={{ carts: carts }}
        options={{
          tabBarIcon: () => (
            <View
              style={{
                padding: 4,
                borderRadius: spacing.small,
                backgroundColor: colors.purple_1,
              }}
            >
              <Text style={{ color: 'white', fontSize: font.size_2 }}>
                Treats
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Challenges"
        component={Challenges}
        options={{
          tabBarIcon: (focused) => (
            <View style={styles.tabBarWrapWithIcon}>
              <Image
                source={require('../assets/icons/challenge.png')}
                resizeMode="contain"
                style={styles.navIconStyle}
              />
              <Text
                style={{
                  color: focused ? colors.black : 'blue',
                  fontSize: 10,
                }}
              >
                Challenge
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  tabBarWrapWithIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarWrapCreateNew: {
    position: 'relative',
    top: -5,
  },
  tabBarStyle: {
    alignItems: 'baseline',
    position: 'absolute',
    padding: 3,
    paddingBottom: spacing.medium_1,
    ...shadow,
  },
  navIconStyle: {
    padding: 5,
    width: spacing.medium_1,
    height: spacing.medium_1,
    tintColor: colors.black,
    margin: 3,
  },
});
