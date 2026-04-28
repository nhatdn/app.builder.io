import React from 'react';
import { View, Text } from 'react-native';

interface DeviceIconProps {
  size?: number;
  color?: string;
}

export default function DeviceIcon({ size = 24, color = '#6B8E6F' }: DeviceIconProps) {
  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: size * 0.7, color }}>🖨</Text>
    </View>
  );
}
