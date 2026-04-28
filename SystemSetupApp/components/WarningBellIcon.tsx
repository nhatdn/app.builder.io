import React from 'react';
import { View, Text } from 'react-native';

interface WarningBellIconProps {
  size?: number;
  color?: string;
}

export default function WarningBellIcon({ size = 32, color = '#B87333' }: WarningBellIconProps) {
  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: size * 0.7, color }}>🔔</Text>
    </View>
  );
}
