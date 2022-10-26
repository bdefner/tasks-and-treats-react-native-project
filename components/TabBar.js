import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CreateNew from '../screens/CreateNew';
import Help from '../screens/Help';
import Settings from '../screens/Settings';
import Tasks from '../screens/Tasks';
import Treats from '../screens/Treats';

export default function TabBar() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 15,
          borderRadius: 16,
          height: 90,
          margin: 15,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: (focused) => (
            <View style={styles.tabBarWrapWithIcon}>
              <Image
                source={require('../assets/icons/settings.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? 'red' : 'blue',
                  margin: 5,
                }}
              />
              <Text
                style={{
                  color: focused ? 'red' : 'blue',
                  fontSize: 11,
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
        options={{
          tabBarIcon: () => (
            <View
              style={{
                padding: 5,
                borderRadius: 8,
                backgroundColor: 'red',
              }}
            >
              <Text>Tasks</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="New"
        component={CreateNew}
        options={{
          tabBarIcon: (focused) => (
            <View style={styles.tabBarWrapCreateNew}>
              <Image
                source={require('../assets/icons/createNew.png')}
                resizeMode="contain"
                style={{
                  width: 60,
                  height: 60,
                  tintColor: focused ? 'red' : 'blue',
                  margin: 5,
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Treats"
        component={Treats}
        options={{
          tabBarIcon: () => (
            <View
              style={{
                padding: 5,
                borderRadius: 8,
                backgroundColor: 'red',
              }}
            >
              <Text>Treats</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Help"
        component={Help}
        options={{
          tabBarIcon: (focused) => (
            <View style={styles.tabBarWrapWithIcon}>
              <Image
                source={require('../assets/icons/help.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? 'red' : 'blue',
                  margin: 5,
                }}
              />
              <Text
                style={{
                  color: focused ? 'red' : 'blue',
                  fontSize: 11,
                }}
              >
                Help
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
    top: -40,
  },
});
