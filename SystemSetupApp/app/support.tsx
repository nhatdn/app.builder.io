import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Image } from 'react-native';
import { useRouter } from 'expo-router';

interface SupportChannel {
  id: string;
  name: string;
  icon: string;
}

const supportChannels: SupportChannel[] = [
  { id: 'telegram', name: 'Telegram', icon: '📱' },
  { id: 'messenger', name: 'Messenger', icon: '💬' },
  { id: 'whatsapp', name: 'WhatsApp', icon: '📲' },
];

export default function SupportScreen() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(true);
  const [selectedChannel, setSelectedChannel] = useState('telegram');

  const handleClose = () => {
    setShowModal(false);
    router.back();
  };

  return (
    <Modal
      visible={showModal}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View className="flex-1 bg-black/50 flex items-center justify-center px-4">
        {/* Close Button */}
        <TouchableOpacity
          onPress={handleClose}
          className="absolute top-10 left-1/2 transform -translate-x-1/2 z-10 w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center"
        >
          <Text className="text-white text-2xl font-bold">×</Text>
        </TouchableOpacity>

        {/* Modal Card */}
        <View className="w-full max-w-sm bg-white rounded-3xl p-6">
          {/* Title */}
          <Text className="text-2xl font-bold text-gray-800 text-center mb-6">
            Customer Support
          </Text>

          {/* Channel Tabs */}
          <View className="flex-row gap-2 mb-6">
            {supportChannels.map((channel) => (
              <TouchableOpacity
                key={channel.id}
                onPress={() => setSelectedChannel(channel.id)}
                className={`flex-1 py-2 rounded-full ${
                  selectedChannel === channel.id
                    ? 'bg-orange-500'
                    : 'bg-beige-100 border border-beige-200'
                }`}
              >
                <Text
                  className={`text-center text-sm font-semibold ${
                    selectedChannel === channel.id
                      ? 'text-white'
                      : 'text-gray-700'
                  }`}
                >
                  {channel.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* QR Code Container */}
          <View className="bg-beige-50 rounded-2xl p-6 items-center mb-4">
            {/* QR Code Placeholder */}
            <View className="w-40 h-40 bg-white border-2 border-beige-200 rounded-xl flex items-center justify-center mb-4">
              <Text className="text-6xl">📱</Text>
            </View>

            {/* QR Code Text */}
            <Text className="text-center text-gray-700 text-sm">
              Scan the QR code to chat with customer support
            </Text>
          </View>

          {/* Close Button */}
          <TouchableOpacity
            onPress={handleClose}
            className="w-full bg-gray-300 rounded-full py-2"
          >
            <Text className="text-center text-gray-700 font-semibold">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
