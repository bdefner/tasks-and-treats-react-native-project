import Lottie from 'lottie-react-native';
import { useContext } from 'react';
import { Image, Text, View } from 'react-native';
import budgetContext from '../utils/BudgetContext';
import Global from '../utils/globals';
import { font, spacing } from '../utils/styleConstants';

export default function StarBudgetDisplay(props) {
  const [budget, setBudget] = useContext(budgetContext);

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
        {budget}
      </Text>
    </View>
  );
}
