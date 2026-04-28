import React from 'react';
import { View, Text } from 'react-native';

interface SettingsIconProps {
  size?: number;
  color?: string;
}

export default function SettingsIcon({ size = 24, color = '#999' }: SettingsIconProps) {
  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: size * 0.7, color }}>⚙</Text>
    </View>
  );
}
