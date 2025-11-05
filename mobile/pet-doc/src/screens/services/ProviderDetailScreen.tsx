import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ServicesStackParamList} from '@navigation/types';
import {Card, Badge, Button, Avatar} from '@components/common';
import {colors} from '@theme/colors';
import {spacing} from '@theme/spacing';
import {typography} from '@theme/typography';

type Props = NativeStackScreenProps<ServicesStackParamList, 'ProviderDetail'>;

const ProviderDetailScreen: React.FC<Props> = ({navigation, route}) => {
  const {vendorId} = route.params;
  const [selectedTab, setSelectedTab] = useState<'about' | 'services' | 'reviews'>('about');

  // Mock data - replace with API call
  const provider = {
    id: vendorId,
    name: 'Dr. Sarah Johnson',
    specialty: 'Veterinary Care',
    photo: 'https://via.placeholder.com/150',
    rating: 4.9,
    reviewCount: 234,
    distance: '0.5 km',
    about: 'Experienced veterinarian with over 15 years of practice. Specializing in general veterinary care, vaccinations, and preventive medicine. Passionate about providing the best care for your furry friends.',
    address: '123 Pet Care Street, Downtown',
    phone: '+1 234-567-8900',
    email: 'sarah.johnson@petcare.com',
    workingHours: 'Mon-Sat: 9:00 AM - 6:00 PM',
    isVerified: true,
    isOpen: true,
  };

  const services = [
    {
      id: '1',
      name: 'General Checkup',
      description: 'Complete physical examination',
      price: 500,
      duration: 30,
    },
    {
      id: '2',
      name: 'Vaccination',
      description: 'Core and non-core vaccines',
      price: 300,
      duration: 15,
    },
    {
      id: '3',
      name: 'Dental Cleaning',
      description: 'Professional teeth cleaning',
      price: 1200,
      duration: 60,
    },
    {
      id: '4',
      name: 'Surgery Consultation',
      description: 'Pre-surgery consultation',
      price: 800,
      duration: 45,
    },
  ];

  const reviews = [
    {
      id: '1',
      userName: 'John Doe',
      userPhoto: 'https://via.placeholder.com/40',
      rating: 5,
      date: '2024-10-28',
      comment: 'Excellent service! Dr. Sarah was very caring with my dog Max.',
    },
    {
      id: '2',
      userName: 'Jane Smith',
      userPhoto: 'https://via.placeholder.com/40',
      rating: 5,
      date: '2024-10-25',
      comment: 'Highly recommend! Very professional and knowledgeable.',
    },
    {
      id: '3',
      userName: 'Mike Wilson',
      userPhoto: 'https://via.placeholder.com/40',
      rating: 4,
      date: '2024-10-20',
      comment: 'Great experience overall. Waited a bit longer than expected.',
    },
  ];

  const handleBookService = (serviceId: string) => {
    navigation.navigate('BookingFlow', {
      vendorId: provider.id,
      serviceId: serviceId,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Provider Header */}
        <View style={styles.header}>
          <Image source={{uri: provider.photo}} style={styles.providerPhoto} />
          <View style={styles.headerContent}>
            <View style={styles.headerTop}>
              <View style={styles.headerInfo}>
                <Text style={styles.providerName}>{provider.name}</Text>
                {provider.isVerified && (
                  <Icon name="check-decagram" size={20} color={colors.primary} />
                )}
              </View>
              <View style={styles.statusBadge}>
                <View
                  style={[
                    styles.statusDot,
                    {backgroundColor: provider.isOpen ? colors.success : colors.error},
                  ]}
                />
                <Text style={styles.statusText}>
                  {provider.isOpen ? 'Open Now' : 'Closed'}
                </Text>
              </View>
            </View>
            <Text style={styles.providerSpecialty}>{provider.specialty}</Text>
            <View style={styles.ratingRow}>
              <Icon name="star" size={18} color={colors.accent} />
              <Text style={styles.rating}>{provider.rating}</Text>
              <Text style={styles.reviews}>({provider.reviewCount} reviews)</Text>
            </View>
            <View style={styles.metaRow}>
              <Icon name="map-marker" size={16} color={colors.textSecondary} />
              <Text style={styles.metaText}>{provider.distance}</Text>
            </View>
          </View>
        </View>

        {/* Quick Info Cards */}
        <View style={styles.quickInfo}>
          <TouchableOpacity style={styles.infoCard}>
            <Icon name="phone" size={24} color={colors.primary} />
            <Text style={styles.infoLabel}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoCard}>
            <Icon name="map-marker" size={24} color={colors.primary} />
            <Text style={styles.infoLabel}>Directions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoCard}>
            <Icon name="share-variant" size={24} color={colors.primary} />
            <Text style={styles.infoLabel}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoCard}>
            <Icon name="heart-outline" size={24} color={colors.primary} />
            <Text style={styles.infoLabel}>Save</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'about' && styles.activeTab]}
            onPress={() => setSelectedTab('about')}>
            <Text
              style={[
                styles.tabText,
                selectedTab === 'about' && styles.activeTabText,
              ]}>
              About
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'services' && styles.activeTab]}
            onPress={() => setSelectedTab('services')}>
            <Text
              style={[
                styles.tabText,
                selectedTab === 'services' && styles.activeTabText,
              ]}>
              Services
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'reviews' && styles.activeTab]}
            onPress={() => setSelectedTab('reviews')}>
            <Text
              style={[
                styles.tabText,
                selectedTab === 'reviews' && styles.activeTabText,
              ]}>
              Reviews
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        <View style={styles.content}>
          {selectedTab === 'about' && (
            <View>
              <Card style={styles.section}>
                <Text style={styles.sectionTitle}>About</Text>
                <Text style={styles.aboutText}>{provider.about}</Text>
              </Card>

              <Card style={styles.section}>
                <Text style={styles.sectionTitle}>Contact Information</Text>
                <View style={styles.contactItem}>
                  <Icon name="map-marker" size={20} color={colors.textSecondary} />
                  <Text style={styles.contactText}>{provider.address}</Text>
                </View>
                <View style={styles.contactItem}>
                  <Icon name="phone" size={20} color={colors.textSecondary} />
                  <Text style={styles.contactText}>{provider.phone}</Text>
                </View>
                <View style={styles.contactItem}>
                  <Icon name="email" size={20} color={colors.textSecondary} />
                  <Text style={styles.contactText}>{provider.email}</Text>
                </View>
                <View style={styles.contactItem}>
                  <Icon name="clock-outline" size={20} color={colors.textSecondary} />
                  <Text style={styles.contactText}>{provider.workingHours}</Text>
                </View>
              </Card>
            </View>
          )}

          {selectedTab === 'services' && (
            <View>
              {services.map(service => (
                <Card key={service.id} style={styles.serviceCard}>
                  <View style={styles.serviceHeader}>
                    <View style={styles.serviceInfo}>
                      <Text style={styles.serviceName}>{service.name}</Text>
                      <Text style={styles.serviceDescription}>
                        {service.description}
                      </Text>
                      <View style={styles.serviceMeta}>
                        <Icon
                          name="clock-outline"
                          size={14}
                          color={colors.textSecondary}
                        />
                        <Text style={styles.duration}>{service.duration} min</Text>
                      </View>
                    </View>
                    <View style={styles.serviceRight}>
                      <Text style={styles.servicePrice}>₹{service.price}</Text>
                      <Button
                        title="Book"
                        onPress={() => handleBookService(service.id)}
                        size="small"
                        style={styles.bookButton}
                      />
                    </View>
                  </View>
                </Card>
              ))}
            </View>
          )}

          {selectedTab === 'reviews' && (
            <View>
              {/* Rating Summary */}
              <Card style={styles.section}>
                <View style={styles.ratingSummary}>
                  <View style={styles.ratingLeft}>
                    <Text style={styles.ratingLarge}>{provider.rating}</Text>
                    <View style={styles.starsRow}>
                      {[1, 2, 3, 4, 5].map(star => (
                        <Icon
                          key={star}
                          name="star"
                          size={16}
                          color={colors.accent}
                        />
                      ))}
                    </View>
                    <Text style={styles.ratingCount}>
                      {provider.reviewCount} reviews
                    </Text>
                  </View>
                  <View style={styles.ratingBars}>
                    {[5, 4, 3, 2, 1].map(rating => (
                      <View key={rating} style={styles.ratingBar}>
                        <Text style={styles.ratingLabel}>{rating}</Text>
                        <View style={styles.barBackground}>
                          <View
                            style={[
                              styles.barFill,
                              {
                                width: `${
                                  rating === 5 ? 80 : rating === 4 ? 15 : 5
                                }%`,
                              },
                            ]}
                          />
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              </Card>

              {/* Reviews List */}
              {reviews.map(review => (
                <Card key={review.id} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <Avatar
                      source={review.userPhoto}
                      name={review.userName}
                      size={40}
                    />
                    <View style={styles.reviewInfo}>
                      <Text style={styles.reviewUser}>{review.userName}</Text>
                      <View style={styles.reviewStars}>
                        {[1, 2, 3, 4, 5].map(star => (
                          <Icon
                            key={star}
                            name="star"
                            size={12}
                            color={
                              star <= review.rating ? colors.accent : colors.border
                            }
                          />
                        ))}
                      </View>
                    </View>
                    <Text style={styles.reviewDate}>
                      {new Date(review.date).toLocaleDateString()}
                    </Text>
                  </View>
                  <Text style={styles.reviewComment}>{review.comment}</Text>
                </Card>
              ))}
            </View>
          )}
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Bottom Book Button */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomPrice}>Starting from ₹300</Text>
          <Text style={styles.bottomPriceLabel}>per service</Text>
        </View>
        <Button
          title="Book Appointment"
          onPress={() => handleBookService(services[0].id)}
          style={styles.bottomButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    padding: spacing.lg,
    backgroundColor: colors.surface,
  },
  providerPhoto: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  headerContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  providerName: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.successLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: 12,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: spacing.xs / 2,
  },
  statusText: {
    fontSize: typography.fontSize.xs,
    color: colors.success,
    fontWeight: typography.fontWeight.medium,
  },
  providerSpecialty: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs / 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  rating: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    marginLeft: spacing.xs / 2,
  },
  reviews: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginLeft: spacing.xs / 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs / 2,
  },
  metaText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginLeft: spacing.xs / 2,
  },
  quickInfo: {
    flexDirection: 'row',
    padding: spacing.lg,
    gap: spacing.md,
  },
  infoCard: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 12,
  },
  infoLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.medium,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: typography.fontWeight.semiBold,
  },
  content: {
    padding: spacing.lg,
  },
  section: {
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  aboutText: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.lg,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  contactText: {
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
    marginLeft: spacing.md,
  },
  serviceCard: {
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
  },
  serviceDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs / 2,
  },
  serviceMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  duration: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginLeft: spacing.xs / 2,
  },
  serviceRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  servicePrice: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  bookButton: {
    minWidth: 80,
  },
  ratingSummary: {
    flexDirection: 'row',
    gap: spacing.xl,
  },
  ratingLeft: {
    alignItems: 'center',
  },
  ratingLarge: {
    fontSize: typography.fontSize.display,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  starsRow: {
    flexDirection: 'row',
    marginTop: spacing.xs,
  },
  ratingCount: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs / 2,
  },
  ratingBars: {
    flex: 1,
  },
  ratingBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  ratingLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.textPrimary,
    width: 20,
  },
  barBackground: {
    flex: 1,
    height: 8,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 4,
    marginLeft: spacing.sm,
  },
  barFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 4,
  },
  reviewCard: {
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  reviewInfo: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  reviewUser: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
  },
  reviewStars: {
    flexDirection: 'row',
    marginTop: spacing.xs / 2,
  },
  reviewDate: {
    fontSize: typography.fontSize.xs,
    color: colors.textTertiary,
  },
  reviewComment: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.md,
  },
  bottomSpacing: {
    height: 80,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  bottomPrice: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  bottomPriceLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
  bottomButton: {
    minWidth: 160,
  },
});

export default ProviderDetailScreen;
