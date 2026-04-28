import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import CheckIcon from '@/components/CheckIcon';
import WarningIcon from '@/components/WarningIcon';
import DeviceIcon from '@/components/DeviceIcon';
import SettingsIcon from '@/components/SettingsIcon';
import MicrophoneIcon from '@/components/MicrophoneIcon';
import LocationIcon from '@/components/LocationIcon';
import WiFiIcon from '@/components/WiFiIcon';
import ShieldIcon from '@/components/ShieldIcon';
import WarningBellIcon from '@/components/WarningBellIcon';

interface RequiredItem {
  id: string;
  label: string;
  description: string;
  status: 'ready' | 'pending';
  icon: React.ComponentType<any>;
}

export default function SystemSetupScreen() {
  const router = useRouter();
  const [expandedKiosk, setExpandedKiosk] = useState<string | null>(null);

  const externalDevices: RequiredItem[] = [
    {
      id: 'printer',
      label: 'Máy in',
      description: 'Sẵn sàng hoạt động',
      status: 'ready',
      icon: DeviceIcon,
    },
    {
      id: 'pos',
      label: 'Máy POS',
      description: 'Sẵn sàng hoạt động',
      status: 'ready',
      icon: DeviceIcon,
    },
  ];

  const permissions: RequiredItem[] = [
    {
      id: 'location',
      label: 'Vị trí',
      description: 'Xác định tọa độ thiết bị Kiosk',
      status: 'ready',
      icon: LocationIcon,
    },
    {
      id: 'recording',
      label: 'Ghi âm',
      description: 'Hỗ trợ nhập liệu bằng giọng nói',
      status: 'ready',
      icon: MicrophoneIcon,
    },
    {
      id: 'app-settings',
      label: 'Cài đặt ứng dụng',
      description: 'Cho phép cập nhật phần bản mới',
      status: 'ready',
      icon: SettingsIcon,
    },
    {
      id: 'network',
      label: 'Kết nối mạng',
      description: 'Đã kết nối Internet',
      status: 'ready',
      icon: WiFiIcon,
    },
  ];

  const kioskSettings = [
    {
      id: 'device-owner',
      label: 'Device Owner',
      description: 'Quyền quản trị thiết bị để khóa ứng dụng',
      subcontent: 'Liên hệ kỹ thuật để thiết lập',
      isRequired: true,
    },
    {
      id: 'default-launcher',
      label: 'Default Launcher',
      description: 'Ứng dụng sẽ từ mở lại khi ứng dụng bị đóng',
      subcontent: 'Cần Device Owner để thiết lập',
      isRequired: false,
      isChecked: true,
    },
  ];

  const handleStartPress = () => {
    router.push('/language-selection');
  };

  const toggleKioskExpand = (id: string) => {
    setExpandedKiosk(expandedKiosk === id ? null : id);
  };

  const renderPermissionItem = (item: RequiredItem) => (
    <View key={item.id} className="flex-row items-center gap-3 bg-white px-4 py-4 border-b border-gray-100">
      <View className="w-12 h-12 rounded-full bg-mint-50 flex items-center justify-center">
        <CheckIcon />
      </View>
      <View className="flex-1">
        <Text className="font-semibold text-gray-800 text-base">{item.label}</Text>
        <Text className="text-gray-500 text-sm">{item.description}</Text>
      </View>
      <TouchableOpacity className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
        <SettingsIcon size={20} color="#999" />
      </TouchableOpacity>
    </View>
  );

  const renderExternalDeviceItem = (item: RequiredItem) => (
    <View key={item.id} className="flex-row items-center justify-between bg-white px-4 py-4 border-b border-gray-100">
      <View className="flex-row items-center gap-3 flex-1">
        <View className="w-10 h-10 rounded-lg bg-mint-50 flex items-center justify-center">
          <View className="w-5 h-5 bg-mint-500 rounded-sm" />
        </View>
        <View>
          <Text className="font-semibold text-gray-800 text-base">{item.label}</Text>
          <Text className="text-mint-500 text-sm">{item.description}</Text>
        </View>
      </View>
      <View className="bg-red-100 rounded-full px-3 py-1">
        <Text className="text-red-500 text-xs font-semibold">Ngắt</Text>
      </View>
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-beige-50">
      {/* Header */}
      <View className="items-center pt-8 pb-4">
        <View className="w-16 h-16 rounded-full bg-beige-200 flex items-center justify-center mb-4">
          <WarningBellIcon />
        </View>
        <Text className="text-3xl font-bold text-gray-800 text-center">Cài đặt hệ thống</Text>
        <Text className="text-gray-600 text-center text-sm mt-2 px-4">
          Vui lòng cập quyền và kiểm tra kết nối thiết bị{'\n'}để ứng dụng hoạt động tốt nhất.
        </Text>
      </View>

      {/* External Devices Section */}
      <View className="mx-4 my-6">
        <View className="flex-row items-center gap-2 mb-3">
          <WarningIcon />
          <Text className="text-gray-800 font-semibold">Thiết bị ngoài ví (bắt buộc)</Text>
        </View>
        <View className="bg-white rounded-2xl overflow-hidden border border-gray-100">
          {externalDevices.map(renderExternalDeviceItem)}
          {/* Warning message */}
          <View className="bg-amber-50 px-4 py-3 flex-row gap-2">
            <WarningIcon />
            <Text className="text-xs text-amber-700 flex-1">
              Nếu không kết nối được với máy in hoặc máy POS, hãy thử rút ra kiểm tra lại đầu kết nối sau đó cắm lại. Nếu vẫn không được, hãy thử khởi động lại Kiosk (Dừ báo máy POS và máy in để được bật).
            </Text>
          </View>
        </View>
      </View>

      {/* Permissions Section */}
      <View className="mx-4 my-6">
        <View className="flex-row items-center gap-2 mb-3">
          <ShieldIcon />
          <Text className="text-gray-800 font-semibold">Quyền truy cập (bắt buộc)</Text>
        </View>
        <View className="bg-white rounded-2xl overflow-hidden border border-gray-100">
          {permissions.map(renderPermissionItem)}
        </View>
      </View>

      {/* Kiosk Settings Section */}
      <View className="mx-4 my-6 mb-8">
        <View className="flex-row items-center gap-2 mb-3">
          <ShieldIcon locked />
          <Text className="text-gray-800 font-semibold">Cài đặt Kiosk (Tùy chọn, không bắt buộc)</Text>
        </View>
        <View className="bg-white rounded-2xl overflow-hidden border border-gray-100">
          {kioskSettings.map((setting) => (
            <View key={setting.id}>
              <TouchableOpacity
                onPress={() => toggleKioskExpand(setting.id)}
                className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100"
              >
                <View className="flex-row items-center gap-3 flex-1">
                  {setting.id === 'device-owner' ? (
                    <View className="w-10 h-10 rounded-full bg-brown-100 flex items-center justify-center">
                      <WarningBellIcon color="#8B6F47" />
                    </View>
                  ) : (
                    <View className="w-10 h-10 rounded-full bg-mint-50 flex items-center justify-center">
                      <CheckIcon />
                    </View>
                  )}
                  <View className="flex-1">
                    <Text className="font-semibold text-gray-800">{setting.label}</Text>
                    <Text className="text-gray-500 text-sm">{setting.description}</Text>
                  </View>
                </View>
                {setting.id === 'default-launcher' && setting.isChecked && (
                  <View className="w-6 h-6 rounded-full bg-mint-50 flex items-center justify-center">
                    <CheckIcon size={16} />
                  </View>
                )}
              </TouchableOpacity>
              {expandedKiosk === setting.id && (
                <View className="px-4 py-3 bg-gray-50">
                  <Text className="text-gray-600 text-sm">{setting.subcontent}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Start Button */}
      <View className="mx-4 mb-8">
        <TouchableOpacity
          onPress={handleStartPress}
          className="bg-orange-500 rounded-2xl py-4 flex-row items-center justify-center gap-2"
        >
          <Text className="text-white font-bold text-lg">Bắt đầu sử dụng</Text>
          <Text className="text-white text-lg">→</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
