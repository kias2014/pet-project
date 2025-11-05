import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '@navigation/types';
import {Button} from '@components/common';
import {colors} from '@theme/colors';
import {spacing} from '@theme/spacing';
import {typography} from '@theme/typography';
import {STORAGE_KEYS} from '@constants/index';

type Props = NativeStackScreenProps<AuthStackParamList, 'Onboarding'>;

const {width} = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Welcome to Pet Doc',
    description: 'Your one-stop solution for all your pet care needs',
    icon: '🐕',
  },
  {
    id: '2',
    title: 'Find Expert Care',
    description: 'Connect with verified veterinarians, groomers, and trainers',
    icon: '⚕️',
  },
  {
    id: '3',
    title: 'Book Appointments',
    description: 'Schedule appointments easily and manage your pet\'s health',
    icon: '📅',
  },
  {
    id: '4',
    title: 'Join the Community',
    description: 'Share experiences and connect with fellow pet owners',
    icon: '👥',
  },
];

const OnboardingScreen: React.FC<Props> = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleComplete = async () => {
    await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, 'true');
    navigation.replace('Login');
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const renderItem = ({item}: {item: typeof slides[0]}) => (
    <View style={styles.slide}>
      <Text style={styles.icon}>{item.icon}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x / width
          );
          setCurrentIndex(index);
        }}
      />
      <View style={styles.footer}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentIndex && styles.activeDot,
              ]}
            />
          ))}
        </View>
        <View style={styles.buttons}>
          {currentIndex < slides.length - 1 ? (
            <>
              <Button
                title="Skip"
                onPress={handleSkip}
                variant="ghost"
                style={styles.button}
              />
              <Button
                title="Next"
                onPress={handleNext}
                variant="primary"
                style={styles.button}
              />
            </>
          ) : (
            <Button
              title="Get Started"
              onPress={handleComplete}
              variant="primary"
              fullWidth
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  slide: {
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  icon: {
    fontSize: 100,
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  description: {
    fontSize: typography.fontSize.lg,
    color: colors.textSecondary,
    textAlign: 'center',
    maxWidth: '80%',
  },
  footer: {
    padding: spacing.lg,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.borderDark,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: colors.primary,
    width: 24,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  button: {
    flex: 1,
  },
});

export default OnboardingScreen;
