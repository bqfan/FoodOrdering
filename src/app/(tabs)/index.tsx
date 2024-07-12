import { StyleSheet, View, Text } from 'react-native';
import Colors from '@/src/constants/Colors';

// import EditScreenInfo from '@/src/components/EditScreenInfo';
// import { Text, View } from '@/src/components/Themed';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pizza Peperoni</Text>
      <Text style={styles.price}>$12.99</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
});
