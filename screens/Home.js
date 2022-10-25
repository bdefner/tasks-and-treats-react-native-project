import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function Home() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Tasks" component={Tasks} />
      <Tab.Screen name="Treats" component={Treats} />
    </Tab.Navigator>
  );
}
