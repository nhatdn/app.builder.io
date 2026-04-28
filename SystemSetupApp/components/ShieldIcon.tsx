import React from 'react';
import { View, Text } from 'react-native';

interface ShieldIconProps {
  size?: number;
  color?: string;
  locked?: boolean;
}

export default function ShieldIcon({ size = 20, color = '#6B8E6F', locked = false }: ShieldIconProps) {
  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: size * 0.8, color }}>🛡</Text>
    </View>
  );
}
