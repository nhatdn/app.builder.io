import React from 'react';
import { View, Text } from 'react-native';

interface CheckIconProps {
  size?: number;
  color?: string;
}

export default function CheckIcon({ size = 24, color = '#4CAF50' }: CheckIconProps) {
  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: size * 0.7, color, fontWeight: 'bold' }}>✓</Text>
    </View>
  );
}
