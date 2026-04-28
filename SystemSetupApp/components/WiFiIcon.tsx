import React from 'react';
import { View, Text } from 'react-native';

interface WiFiIconProps {
  size?: number;
  color?: string;
}

export default function WiFiIcon({ size = 24, color = '#6B8E6F' }: WiFiIconProps) {
  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: size * 0.7, color }}>📶</Text>
    </View>
  );
}
