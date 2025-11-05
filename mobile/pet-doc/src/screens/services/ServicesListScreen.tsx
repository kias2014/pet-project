import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ServicesStackParamList} from '@navigation/types';
import {Card} from '@components/common';
import {colors} from '@theme/colors';
import {spacing} from '@theme/spacing';
import {typography} from '@theme/typography';
import {SERVICE_CATEGORIES} from '@constants/index';

type Props = NativeStackScreenProps<ServicesStackParamList, 'ServicesList'>;

const ServicesListScreen: React.FC<Props> = ({navigation}) => {
  const featuredProviders = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Veterinary Care',
      rating: 4.9,
      reviews: 234,
      image: 'https://via.placeholder.com/80',
      distance: '0.5 km',
      available: true,
    },
    {
      id: '2',
      name: 'Pet Spa & Grooming',
      specialty: 'Grooming',
      rating: 4.7,
      reviews: 156,
      image: 'https://via.placeholder.com/80',
      distance: '1.2 km',
      available: true,
    },
    {
      id: '3',
      name: 'Training Academy',
      specialty: 'Training',
      rating: 4.8,
      reviews: 98,
      image: 'https://via.placeholder.com/80',
      distance: '2.3 km',
      available: false,
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Find Pet Care Services</Text>
        <Text style={styles.subtitle}>Browse by category or provider</Text>
      </View>

      {/* Service Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Service Categories</Text>
        <View style={styles.categoriesGrid}>
          {SERVICE_CATEGORIES.map(category => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              onPress={() =>
                navigation.navigate('ServiceProviders', {
                  categoryId: category.id,
                  categoryName: category.name,
                })
              }>
              <View style={styles.categoryIcon}>
                <Icon name={category.icon} size={32} color={colors.primary} />
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Featured Providers */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Providers</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        {featuredProviders.map(provider => (
          <Card
            key={provider.id}
            style={styles.providerCard}
            onPress={() =>
              navigation.navigate('ProviderDetail', {vendorId: provider.id})
            }>
            <Image source={{uri: provider.image}} style={styles.providerImage} />
            <View style={styles.providerInfo}>
              <View style={styles.providerHeader}>
                <Text style={styles.providerName}>{provider.name}</Text>
                {provider.available && (
                  <View style={styles.availableBadge}>
                    <View style={styles.availableDot} />
                    <Text style={styles.availableText}>Available</Text>
                  </View>
                )}
              </View>
              <Text style={styles.providerSpecialty}>{provider.specialty}</Text>
              <View style={styles.providerMeta}>
                <View style={styles.ratingContainer}>
                  <Icon name="star" size={16} color={colors.accent} />
                  <Text style={styles.rating}>{provider.rating}</Text>
                  <Text style={styles.reviews}>({provider.reviews})</Text>
                </View>
                <View style={styles.distanceContainer}>
                  <Icon name="map-marker" size={16} color={colors.textSecondary} />
                  <Text style={styles.distance}>{provider.distance}</Text>
                </View>
              </View>
            </View>
            <Icon name="chevron-right" size={24} color={colors.textTertiary} />
          </Card>
        ))}
      </View>

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  title: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
  },
  seeAll: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: typography.fontWeight.medium,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  categoryCard: {
    width: '47%',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.lg,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  categoryName: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  providerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  providerImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  providerInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  providerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs / 2,
  },
  providerName: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    flex: 1,
  },
  availableBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.successLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: 12,
  },
  availableDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
    marginRight: spacing.xs / 2,
  },
  availableText: {
    fontSize: typography.fontSize.xs,
    color: colors.success,
    fontWeight: typography.fontWeight.medium,
  },
  providerSpecialty: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  providerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
    marginLeft: spacing.xs / 2,
  },
  reviews: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginLeft: spacing.xs / 2,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distance: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginLeft: spacing.xs / 2,
  },
  bottomSpacing: {
    height: spacing.xl,
  },
});

export default ServicesListScreen;
