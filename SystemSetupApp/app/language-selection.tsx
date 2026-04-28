import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

interface Language {
  id: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  { id: 'vi', name: 'Vietnamese', nativeName: 'Việt Nam', flag: '🇻🇳' },
  { id: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { id: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { id: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { id: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { id: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭' },
  { id: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱' },
  { id: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { id: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { id: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  { id: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { id: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱' },
];

export default function LanguageSelectionScreen() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState<string>('vi');

  const handleLanguageSelect = (langId: string) => {
    setSelectedLanguage(langId);
    // Navigate to product listing
    router.push('/products');
  };

  return (
    <View className="flex-1 bg-beige-50">
      {/* Header with image */}
      <View className="h-40 bg-beige-200 relative">
        <Text className="text-4xl font-bold text-center text-gray-800 pt-8">
          Ticket Booth
        </Text>
      </View>

      {/* Language Selection Title */}
      <View className="px-4 py-6">
        <Text className="text-2xl font-bold text-gray-800 text-center mb-8">
          Language Selection
        </Text>

        {/* Language Grid */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex-row flex-wrap justify-between gap-3">
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.id}
                onPress={() => handleLanguageSelect(lang.id)}
                className={`w-[23%] aspect-square rounded-3xl flex items-center justify-center mb-2 ${
                  selectedLanguage === lang.id
                    ? 'bg-orange-500'
                    : 'bg-beige-100 border-2 border-beige-200'
                }`}
              >
                <View className="items-center gap-2">
                  <Text className="text-4xl">{lang.flag}</Text>
                  <Text
                    className={`text-center text-xs font-semibold ${
                      selectedLanguage === lang.id
                        ? 'text-white'
                        : 'text-gray-700'
                    }`}
                  >
                    {lang.nativeName}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
