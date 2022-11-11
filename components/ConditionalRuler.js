import { Text, View } from 'react-native';
import { colors } from '../utils/styleConstants';

export default function ConditionalRuler(props) {
  if (props.condition) {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{ flex: 1, height: 1, backgroundColor: colors.greyBorder }}
        />
        <View>
          <Text style={{ textAlign: 'center' }}>{props.label}</Text>
        </View>
        <View
          style={{ flex: 1, height: 1, backgroundColor: colors.greyBorder }}
        />
      </View>
    );
  } else {
    return <></>;
  }
}
