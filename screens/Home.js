import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateNew from './CreateNew';
import Help from './Help';
import Settings from './Settings';
import Tasks from './Tasks';
import Treats from './Treats';

export default function Home() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
      }}
    >
      <Tab.Screen name="Settings" component={Settings} />
      <Tab.Screen name="Tasks" component={Tasks} />
      <Tab.Screen name="New" component={CreateNew} />
      <Tab.Screen name="Treats" component={Treats} />
      <Tab.Screen name="Help" component={Help} />
    </Tab.Navigator>
  );
}
