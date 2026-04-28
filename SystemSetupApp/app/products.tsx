import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
}

interface Category {
  id: string;
  name: string;
  label: string;
}

const categories: Category[] = [
  { id: 'all', name: 'Tất cả', label: 'All' },
  { id: 'hoi-an', name: 'Hội An', label: 'Hội An' },
  { id: 'ba-na', name: 'Bà Nà Hills', label: 'Bà Nà Hills' },
  { id: 'hoian-ecar', name: 'Hội An E-Car', label: 'Hội An E-Car' },
  { id: 'da-nang', name: 'Đà Nẵng', label: 'Đà Nẵng' },
  { id: 'hoian-tour', name: 'Hội An Tour', label: 'Hội An Tour' },
];

const products: Product[] = [
  {
    id: '1',
    title: 'Combo về tham quan Hội An',
    price: 155000,
    image: '🏘️',
    description: 'Về combo bao gồm về tham quan Hội An và hướng dẫn thuyết minh AI.',
    category: 'hoi-an',
  },
  {
    id: '2',
    title: 'Hướng dẫn âm thanh – Thuyết minh tự động da ngôn ngữ H...',
    price: 50000,
    image: '👨‍🎧',
    description: 'Dịch vụ hướng dẫn âm thanh đa ngôn ngữ',
    category: 'hoi-an',
  },
  {
    id: '3',
    title: 'Về tham quan Hội An 5 địa điểm',
    price: 120000,
    image: '🌅',
    description: 'Gói tham quan toàn bộ 5 địa điểm nổi tiếng',
    category: 'hoi-an',
  },
  {
    id: '4',
    title: 'Về dùng thử Thuyết minh tự động HeriStepAI Hội An',
    price: 0,
    image: '🎭',
    description: 'Dùng thử miễn phí dịch vụ thuyết minh AI',
    category: 'hoi-an',
  },
];

export default function ProductsScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showSupport, setShowSupport] = useState(false);

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleProductPress = (productId: string) => {
    router.push({
      pathname: '/product-detail',
      params: { productId },
    });
  };

  return (
    <View className="flex-1 bg-beige-50">
      {/* Header */}
      <View className="bg-white px-4 py-3 flex-row items-center justify-between border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-2xl">←</Text>
        </TouchableOpacity>
        <View className="flex-row items-center gap-3 flex-1 justify-end">
          <TouchableOpacity className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
            <Text className="text-white text-lg">🎯</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
            <Text className="text-white text-lg">🛒</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-10 h-10 rounded-full bg-red-400 flex items-center justify-center">
            <Text className="text-white text-lg">❤️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Title */}
      <View className="px-4 py-4">
        <Text className="text-2xl font-bold text-gray-800">Danh sách sản phẩm</Text>
      </View>

      {/* Search Bar */}
      <View className="px-4 pb-3">
        <View className="bg-white rounded-full px-4 py-2 flex-row items-center gap-2">
          <Text className="text-gray-400">🔍</Text>
          <Text className="flex-1 text-gray-400 text-sm">Tìm kiếm...</Text>
        </View>
      </View>

      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-4 py-3 gap-2"
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            onPress={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === cat.id
                ? 'bg-brown-500'
                : 'bg-beige-100 border border-brown-500'
            }`}
          >
            <Text
              className={`text-sm font-semibold ${
                selectedCategory === cat.id ? 'text-white' : 'text-brown-500'
              }`}
            >
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Products Grid */}
      <ScrollView className="flex-1 px-4 pb-4">
        <View className="flex-row flex-wrap justify-between gap-3">
          {filteredProducts.map((product) => (
            <TouchableOpacity
              key={product.id}
              onPress={() => handleProductPress(product.id)}
              className="w-[48%] bg-white rounded-2xl overflow-hidden mb-2"
            >
              {/* Product Image */}
              <View className="w-full h-32 bg-gradient-to-br from-purple-300 to-pink-300 flex items-center justify-center">
                <Text className="text-6xl">{product.image}</Text>
              </View>

              {/* Product Info */}
              <View className="p-3">
                <Text className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2">
                  {product.title}
                </Text>

                <View className="flex-row gap-2 mb-2">
                  {product.price > 0 && (
                    <View className="bg-orange-100 rounded-full px-2 py-1">
                      <Text className="text-orange-600 text-xs font-semibold">
                        Xuất về ngay
                      </Text>
                    </View>
                  )}
                </View>

                <Text className="text-orange-600 font-bold text-sm mb-3">
                  {product.price === 0 ? 'Miễn phí' : `${product.price.toLocaleString()} VND`}
                </Text>

                <View className="flex-row gap-2">
                  <TouchableOpacity className="flex-1 bg-brown-500 rounded-lg py-2 items-center">
                    <Text className="text-white text-xs font-semibold">Mua ngay</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-1 bg-orange-500 rounded-lg py-2 items-center">
                    <Text className="text-white text-xs font-semibold">Thêm vào giỏ</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Support Button */}
      <TouchableOpacity
        onPress={() => router.push('/support')}
        className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center shadow-lg"
      >
        <Text className="text-2xl">💬</Text>
      </TouchableOpacity>
    </View>
  );
}
