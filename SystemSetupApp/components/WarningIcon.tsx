import React from 'react';
import { View, Text } from 'react-native';

interface WarningIconProps {
  size?: number;
  color?: string;
}

export default function WarningIcon({ size = 20, color = '#8B6F47' }: WarningIconProps) {
  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: size * 0.8, color }}>⚠</Text>
    </View>
  );
}
