import Lottie from 'lottie-react-native';
import { Image, Text, View } from 'react-native';
import { font, spacing } from '../utils/styleConstants';

export default function StarBudgetDisplay(porps) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image
        source={require('../assets/icons/star.png')}
        style={{
          width: spacing.medium_2,
          height: spacing.medium_2,
          marginRight: spacing.small,
        }}
      />
      <Text
        style={{ color: 'white', fontSize: font.size_2, fontWeight: '700' }}
      >
        110
      </Text>
    </View>
  );
}
