import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';

interface USBDevice {
  id: string;
  path: string;
  name: string;
  type: string;
  status: 'connected' | 'disconnected';
  action?: string;
}

interface SettingItem {
  id: string;
  title: string;
  status: string;
  icon?: string;
  hasError?: boolean;
  action?: () => void;
}

const usbDevices: USBDevice[] = [
  {
    id: '1',
    path: '/dev/bus/usb/001/006',
    name: 'Printer',
    type: 'Printer (0x1FC9:0x2016)',
    status: 'connected',
    action: 'Connect Printer',
  },
  {
    id: '2',
    path: '/dev/bus/usb/001/007',
    name: 'PAX Device',
    type: 'PAX (0x2F8:0x224E)',
    status: 'connected',
    action: 'Connect Payoo Device',
  },
];

export default function AdminScreen() {
  const router = useRouter();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [settings, setSettings] = useState({
    paymentMethod: true,
    versionCheck: false,
    defaultLauncher: false,
    deviceOwner: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Bạn có chắc muốn đăng xuất?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Đăng xuất',
        onPress: () => router.push('/login'),
      },
    ]);
  };

  return (
    <ScrollView className="flex-1 bg-beige-50">
      {/* Header */}
      <View className="bg-white px-4 py-4 border-b border-gray-100">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-2xl">←</Text>
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-800">Cài đặt hệ thống</Text>
          <View className="w-6" />
        </View>
      </View>

      {/* User Info */}
      <View className="px-4 py-4">
        <View className="bg-white rounded-2xl p-4 flex-row items-center gap-3">
          <View className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
            <Text className="text-2xl">👤</Text>
          </View>
          <View className="flex-1">
            <Text className="font-bold text-gray-800">Admin</Text>
            <Text className="text-gray-600 text-sm">Admin</Text>
          </View>
        </View>
      </View>

      {/* Status Section */}
      <View className="px-4 py-4">
        <Text className="text-gray-800 font-bold mb-3">Trạng thái kết nối thiết bị</Text>

        {/* Devices Status */}
        <View className="bg-white rounded-2xl overflow-hidden mb-4">
          <View className="flex-row items-center gap-3 px-4 py-4 border-b border-gray-100">
            <Text className="text-2xl">🖨️</Text>
            <View className="flex-1">
              <Text className="font-semibold text-gray-800">Máy in</Text>
              <Text className="text-red-500 text-xs">Lỗi</Text>
            </View>
          </View>

          <View className="flex-row items-center gap-3 px-4 py-4">
            <Text className="text-2xl">🖨️</Text>
            <View className="flex-1">
              <Text className="font-semibold text-gray-800">Máy POS</Text>
              <Text className="text-gray-500 text-xs">Không kết nối</Text>
            </View>
          </View>
        </View>
      </View>

      {/* USB Devices Section */}
      <View className="px-4 py-4">
        <Text className="text-gray-800 font-bold mb-3">Thiết bị USB có sẵn (2)</Text>

        <View className="bg-white rounded-2xl overflow-hidden">
          {usbDevices.map((device) => (
            <View key={device.id} className="border-b border-gray-100 last:border-b-0">
              <View className="p-4">
                <Text className="text-gray-600 text-sm font-mono mb-1">{device.path}</Text>
                <Text className="text-gray-800 font-semibold text-sm mb-1">
                  {device.name}
                </Text>
                <Text className="text-gray-500 text-xs mb-3">
                  Loại: {device.type}
                </Text>
                <TouchableOpacity className="bg-orange-500 rounded-lg py-2">
                  <Text className="text-center text-white text-sm font-semibold">
                    {device.action}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* In Thử */}
      <View className="px-4 py-4">
        <View className="bg-white rounded-2xl overflow-hidden">
          <TouchableOpacity className="px-4 py-3 bg-orange-500 rounded-lg">
            <Text className="text-center text-white font-semibold">In thử về</Text>
          </TouchableOpacity>
          <Text className="text-red-500 text-xs px-4 py-3">Máy in chưa kết nối.</Text>
        </View>
      </View>

      {/* Kiosk Mode Section */}
      <View className="px-4 py-4">
        <Text className="text-gray-800 font-bold mb-3">Khóa ứng dụng</Text>

        <View className="bg-white rounded-2xl overflow-hidden">
          <TouchableOpacity
            onPress={() => toggleSection('device-owner')}
            className="px-4 py-4 flex-row items-center justify-between border-b border-gray-100"
          >
            <View className="flex-row items-center gap-3 flex-1">
              <Text className="text-2xl">⚙️</Text>
              <View className="flex-1">
                <Text className="font-bold text-gray-800">Mở khóa ứng dụng</Text>
                <Text className="text-red-500 text-xs">
                  Device Owner chưa được thiết lập.
                </Text>
              </View>
            </View>
            <Text className="text-gray-600">›</Text>
          </TouchableOpacity>

          {expandedSection === 'device-owner' && (
            <View className="px-4 py-3 bg-gray-50 border-t border-gray-100">
              <Text className="text-gray-700 text-sm mb-3">
                Liên hệ kỹ thuật để thiết lập chức năng này.
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Default Launcher Section */}
      <View className="px-4 py-4">
        <View className="bg-white rounded-2xl overflow-hidden">
          <TouchableOpacity
            onPress={() => toggleSection('launcher')}
            className="px-4 py-4 flex-row items-center justify-between border-b border-gray-100"
          >
            <View className="flex-row items-center gap-3 flex-1">
              <Text className="text-2xl">🏠</Text>
              <View className="flex-1">
                <Text className="font-bold text-gray-800">Quản lý Default Launcher</Text>
                <Text className="text-gray-600 text-xs">
                  Khi app được đặt làm default launcher, app sẽ tự động mở...
                </Text>
              </View>
            </View>
            <Text className="text-gray-600">›</Text>
          </TouchableOpacity>

          {expandedSection === 'launcher' && (
            <View className="px-4 py-3 bg-gray-50 border-t border-gray-100 gap-2">
              <TouchableOpacity className="bg-orange-500 rounded-lg py-2">
                <Text className="text-center text-white font-semibold text-sm">
                  Set as Default Launcher
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-gray-400 rounded-lg py-2">
                <Text className="text-center text-white font-semibold text-sm">
                  Clear Default Launcher
                </Text>
              </TouchableOpacity>
              <Text className="text-red-500 text-xs mt-2">
                Device Owner chưa được thiết lập. Launcher settings không thể sử dụng.
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Payment Section */}
      <View className="px-4 py-4">
        <Text className="text-gray-800 font-bold mb-3">Phương thức thanh toán</Text>

        <View className="bg-white rounded-2xl overflow-hidden">
          <TouchableOpacity className="px-4 py-4 flex-row items-center justify-between">
            <Text className="font-semibold text-gray-800">Thanh toán bằng tiền mặt</Text>
            <View
              className={`w-12 h-7 rounded-full flex items-center justify-start p-1 ${
                settings.paymentMethod ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <View
                className={`w-5 h-5 rounded-full bg-white ${
                  settings.paymentMethod ? 'ml-auto' : ''
                }`}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Version Check Section */}
      <View className="px-4 py-4">
        <Text className="text-gray-800 font-bold mb-3">Cập nhật ứng dụng</Text>

        <View className="bg-white rounded-2xl overflow-hidden">
          <TouchableOpacity
            onPress={() => toggleSection('version')}
            className="px-4 py-4 flex-row items-center justify-between"
          >
            <View className="flex-1">
              <Text className="font-semibold text-gray-800 mb-1">Kiểm tra cập nhật</Text>
              <Text className="text-gray-600 text-xs">
                Phiên bản hiện tại: <Text className="font-mono">1.0.3 - debug</Text>
              </Text>
            </View>
            <Text className="text-gray-600">›</Text>
          </TouchableOpacity>

          {expandedSection === 'version' && (
            <View className="px-4 py-3 bg-gray-50 border-t border-gray-100">
              <View className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-3">
                <Text className="text-amber-800 text-xs">
                  ⚠️ Độc kỹ thông báo dự đây trước khi cập nhật !
                </Text>
                <Text className="text-amber-700 text-xs mt-1">
                  Vui lòng không out ra ngoài khi tải xuống apk
                </Text>
              </View>
              <TouchableOpacity className="bg-orange-500 rounded-lg py-2">
                <Text className="text-center text-white font-semibold text-sm">
                  Kiểm tra cập nhật
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Logout Button */}
      <View className="px-4 py-6">
        <TouchableOpacity
          onPress={handleLogout}
          className="w-full bg-red-500 rounded-lg py-4"
        >
          <Text className="text-center text-white font-bold text-lg">Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
