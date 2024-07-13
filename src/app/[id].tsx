import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text style={{ fontSize: 20 }}>ProductDetailsScreen of id: {id}</Text>
    </View>
  )
}

export default ProductDetailsScreen
