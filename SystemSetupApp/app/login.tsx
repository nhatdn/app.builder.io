import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (username.trim() && password.trim()) {
      // Navigate to admin dashboard
      router.push('/admin');
    }
  };

  return (
    <View className="flex-1 bg-beige-50">
      {/* Header with decorative background */}
      <View className="h-40 bg-gradient-to-b from-beige-100 to-beige-50 flex items-center justify-center">
        <Text className="text-5xl">🏛️</Text>
        <Text className="text-3xl font-bold text-gray-800 mt-2">Hội An World</Text>
      </View>

      {/* Login Form */}
      <View className="flex-1 px-6 py-8">
        <View className="mb-8">
          <Text className="text-3xl font-bold text-gray-800 mb-2">Đăng nhập</Text>
          <Text className="text-gray-600">Vui lòng nhập thông tin để tiếp tục</Text>
        </View>

        {/* Username Input */}
        <View className="mb-6">
          <Text className="text-gray-700 font-semibold mb-2">Tên đăng nhập</Text>
          <TextInput
            className="bg-white border-2 border-beige-200 rounded-lg px-4 py-3 text-gray-800"
            placeholder="Nhập tên đăng nhập"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#999"
          />
        </View>

        {/* Password Input */}
        <View className="mb-4">
          <Text className="text-gray-700 font-semibold mb-2">Mật khẩu</Text>
          <View className="flex-row items-center bg-white border-2 border-beige-200 rounded-lg px-4">
            <TextInput
              className="flex-1 py-3 text-gray-800"
              placeholder="Nhập mật khẩu"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#999"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text className="text-2xl">{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity className="mb-8">
          <Text className="text-orange-500 font-semibold text-right">Quên mật khẩu?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          onPress={handleLogin}
          className="w-full bg-orange-500 rounded-lg py-4 mb-4"
        >
          <Text className="text-center text-white font-bold text-lg">Đăng nhập</Text>
        </TouchableOpacity>

        {/* Sign Up Link */}
        <TouchableOpacity className="py-3">
          <Text className="text-center text-gray-600">
            Bạn chưa có tài khoản?{' '}
            <Text className="text-orange-500 font-semibold">Đăng ký ngay</Text>
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Decoration */}
      <View className="h-20 bg-gradient-to-t from-beige-100 to-transparent" />
    </View>
  );
}
