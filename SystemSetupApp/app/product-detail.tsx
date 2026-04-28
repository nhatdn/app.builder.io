import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function ProductDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('mua'); // 'mua' or 'them'
  const [showModal, setShowModal] = useState(true);

  const product = {
    id: params.productId,
    title: 'Combo về tham quan Hội An',
    price: 155000,
    description: 'Về combo bao gồm về tham quan Hội An và hướng dẫn thuyết minh AI.',
    image: '🏘️',
    tickets: [
      {
        id: 'standard',
        name: 'Vé tiêu chuẩn',
        price: 155000,
        description: 'Vé tiêu chuẩn giúp du khách khám phá những điểm di tích và giới trị văn hóa độc trưng của Phố cổ Hội An.',
      },
    ],
  };

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleClose = () => {
    setShowModal(false);
    router.back();
  };

  const totalPrice = product.tickets[0].price * quantity;

  return (
    <Modal
      visible={showModal}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View className="flex-1 bg-black/50">
        {/* Close Button */}
        <TouchableOpacity
          onPress={handleClose}
          className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10 w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center"
        >
          <Text className="text-white text-lg font-bold">×</Text>
        </TouchableOpacity>

        {/* Modal Content */}
        <ScrollView
          scrollEnabled
          className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[90%]"
        >
          {/* Tab Buttons */}
          <View className="flex-row gap-3 px-4 py-4 border-b border-gray-100">
            <TouchableOpacity
              onPress={() => setSelectedTab('mua')}
              className={`flex-1 py-2 rounded-lg ${
                selectedTab === 'mua' ? 'bg-orange-500' : 'bg-beige-100'
              }`}
            >
              <Text
                className={`text-center text-sm font-semibold ${
                  selectedTab === 'mua' ? 'text-white' : 'text-gray-700'
                }`}
              >
                Mua ngay
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedTab('them')}
              className={`flex-1 py-2 rounded-lg ${
                selectedTab === 'them' ? 'bg-orange-400' : 'bg-beige-100'
              }`}
            >
              <Text
                className={`text-center text-sm font-semibold ${
                  selectedTab === 'them' ? 'text-white' : 'text-gray-700'
                }`}
              >
                Thêm vào giỏ
              </Text>
            </TouchableOpacity>
          </View>

          {/* Title */}
          <View className="px-4 py-3">
            <Text className="text-2xl font-bold text-gray-800">
              {selectedTab === 'mua' ? 'Mua ngay' : 'Thêm vào giỏ'}
            </Text>
          </View>

          {/* Product Image and Info */}
          <View className="px-4">
            <View className="w-full h-48 bg-gradient-to-br from-purple-300 to-pink-300 rounded-2xl flex items-center justify-center mb-4">
              <Text className="text-7xl">{product.image}</Text>
            </View>

            <Text className="text-xl font-bold text-gray-800 mb-2">
              {product.title}
            </Text>
            <Text className="text-gray-600 text-sm mb-3">{product.description}</Text>
          </View>

          {/* Ticket Selection */}
          <View className="px-4 py-3">
            <Text className="text-lg font-bold text-gray-800 mb-3">Lựa chọn vé</Text>

            <View className="bg-beige-100 rounded-2xl p-4 mb-4">
              <View className="flex-row items-start justify-between mb-2">
                <View>
                  <Text className="text-gray-800 font-semibold">
                    {product.tickets[0].name}
                  </Text>
                  <Text className="text-gray-500 text-xs mt-1">
                    {product.tickets[0].description}
                  </Text>
                </View>
              </View>

              <Text className="text-orange-600 font-bold text-lg mt-2">
                {product.tickets[0].price.toLocaleString()} VND
              </Text>
            </View>
          </View>

          {/* Quantity Selector */}
          <View className="px-4 py-3 bg-beige-50 rounded-2xl mx-4 mb-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-gray-700 font-semibold">Số lượng vé</Text>
              <View className="flex-row items-center gap-3">
                <TouchableOpacity
                  onPress={handleDecrement}
                  className="w-8 h-8 rounded-full bg-brown-500 flex items-center justify-center"
                >
                  <Text className="text-white text-lg font-bold">−</Text>
                </TouchableOpacity>

                <Text className="text-center text-lg font-semibold text-gray-800 w-8">
                  {quantity}
                </Text>

                <TouchableOpacity
                  onPress={handleIncrement}
                  className="w-8 h-8 rounded-full bg-brown-500 flex items-center justify-center"
                >
                  <Text className="text-white text-lg font-bold">+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Price Summary */}
          <View className="px-4 py-4 bg-white border-t border-gray-100">
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Giá hàng trống</Text>
              <Text className="text-gray-800 font-semibold">
                {totalPrice.toLocaleString()} VND
              </Text>
            </View>
            <View className="border-t border-gray-100 py-2 flex-row justify-between">
              <Text className="text-gray-800 font-bold">Tổng cộng</Text>
              <Text className="text-orange-600 font-bold text-lg">
                {totalPrice.toLocaleString()} VND
              </Text>
            </View>
            <Text className="text-gray-500 text-xs mt-2">Giá đã bao gồm phi VAT</Text>
          </View>

          {/* Action Button */}
          <View className="px-4 py-4">
            <TouchableOpacity className="w-full bg-orange-500 rounded-xl py-4 flex items-center justify-center mb-4">
              <Text className="text-white font-bold text-lg">
                {selectedTab === 'mua' ? 'Mua ngay' : 'Thêm vào giỏ'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Padding */}
          <View className="h-6" />
        </ScrollView>
      </View>
    </Modal>
  );
}
