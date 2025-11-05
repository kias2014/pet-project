import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '@theme/colors';
import {spacing} from '@theme/spacing';
import {typography} from '@theme/typography';

interface EmergencyContact {
  id: string;
  name: string;
  description: string;
  phone: string;
  available: string;
  icon: string;
  color: string;
}

interface NearbyClinic {
  id: string;
  name: string;
  address: string;
  phone: string;
  distance: string;
  openNow: boolean;
  rating: number;
}

const EmergencyScreen = () => {
  const [selectedPetId, setSelectedPetId] = useState<string>('1');

  // Emergency contacts
  const emergencyContacts: EmergencyContact[] = [
    {
      id: '1',
      name: 'Emergency Vet Hotline',
      description: '24/7 Emergency veterinary assistance',
      phone: '1-800-VET-HELP',
      available: '24/7',
      icon: 'phone-alert',
      color: colors.error,
    },
    {
      id: '2',
      name: 'Pet Poison Control',
      description: 'ASPCA Poison Control Hotline',
      phone: '1-888-426-4435',
      available: '24/7',
      icon: 'skull',
      color: colors.warning,
    },
    {
      id: '3',
      name: 'Animal Ambulance',
      description: 'Pet emergency transport service',
      phone: '1-800-PET-AMBU',
      available: '24/7',
      icon: 'ambulance',
      color: colors.primary,
    },
  ];

  // Nearby 24-hour emergency clinics
  const nearbyEmergencyClinics: NearbyClinic[] = [
    {
      id: '1',
      name: 'BluePearl Emergency Pet Hospital',
      address: '123 Emergency Way, New York, NY',
      phone: '(212) 555-0100',
      distance: '0.8 mi',
      openNow: true,
      rating: 4.8,
    },
    {
      id: '2',
      name: 'VEG - Veterinary Emergency Group',
      address: '456 Urgent Care Blvd, New York, NY',
      phone: '(212) 555-0200',
      distance: '1.2 mi',
      openNow: true,
      rating: 4.7,
    },
    {
      id: '3',
      name: 'After Hours Animal Hospital',
      address: '789 Night St, New York, NY',
      phone: '(212) 555-0300',
      distance: '2.1 mi',
      openNow: true,
      rating: 4.6,
    },
  ];

  // Emergency symptoms/situations
  const emergencySymptoms = [
    'Difficulty breathing',
    'Severe bleeding',
    'Unconsciousness',
    'Seizures',
    'Suspected poisoning',
    'Severe vomiting or diarrhea',
    'Unable to urinate',
    'Severe injury or trauma',
    'Bloated abdomen',
    'Eye injuries',
  ];

  const handleCallEmergency = (phone: string, name: string) => {
    Alert.alert(
      'Call Emergency Service',
      `Do you want to call ${name}?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Call',
          onPress: () => {
            Linking.openURL(`tel:${phone.replace(/[^0-9]/g, '')}`);
          },
        },
      ]
    );
  };

  const handleCallClinic = (phone: string, name: string) => {
    Linking.openURL(`tel:${phone.replace(/[^0-9]/g, '')}`);
  };

  const handleGetDirections = (address: string) => {
    // TODO: Open maps with directions
    Alert.alert('Directions', `Opening directions to: ${address}`);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Alert Banner */}
      <View style={styles.alertBanner}>
        <Icon name="alert-circle" size={24} color={colors.white} />
        <Text style={styles.alertText}>
          In case of life-threatening emergency, call 911 or rush to nearest
          emergency clinic
        </Text>
      </View>

      {/* Pet Selector */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emergency For:</Text>
        <View style={styles.petSelector}>
          <View style={styles.selectedPet}>
            <View style={styles.petAvatar}>
              <Icon name="paw" size={20} color={colors.primary} />
            </View>
            <View style={styles.petInfo}>
              <Text style={styles.petName}>Max</Text>
              <Text style={styles.petDetails}>Golden Retriever • 3 years</Text>
            </View>
            <TouchableOpacity>
              <Icon name="chevron-down" size={24} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Emergency Contacts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emergency Contacts</Text>
        {emergencyContacts.map(contact => (
          <TouchableOpacity
            key={contact.id}
            style={styles.contactCard}
            onPress={() => handleCallEmergency(contact.phone, contact.name)}>
            <View
              style={[
                styles.contactIcon,
                {backgroundColor: contact.color + '20'},
              ]}>
              <Icon name={contact.icon} size={28} color={contact.color} />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactDescription}>
                {contact.description}
              </Text>
              <View style={styles.contactMeta}>
                <Icon name="phone" size={14} color={colors.textSecondary} />
                <Text style={styles.contactPhone}>{contact.phone}</Text>
                <View style={styles.availableBadge}>
                  <Text style={styles.availableText}>{contact.available}</Text>
                </View>
              </View>
            </View>
            <Icon name="phone" size={24} color={contact.color} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Nearby Emergency Clinics */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Emergency Clinics</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View on Map</Text>
          </TouchableOpacity>
        </View>
        {nearbyEmergencyClinics.map(clinic => (
          <View key={clinic.id} style={styles.clinicCard}>
            <View style={styles.clinicHeader}>
              <View style={styles.clinicLeft}>
                <Text style={styles.clinicName}>{clinic.name}</Text>
                <View style={styles.clinicMeta}>
                  <Icon name="star" size={14} color={colors.warning} />
                  <Text style={styles.clinicRating}>{clinic.rating}</Text>
                  <Text style={styles.clinicDistance}>• {clinic.distance}</Text>
                  {clinic.openNow && (
                    <View style={styles.openBadge}>
                      <Text style={styles.openText}>Open Now</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
            <View style={styles.clinicAddress}>
              <Icon name="map-marker" size={16} color={colors.textSecondary} />
              <Text style={styles.addressText}>{clinic.address}</Text>
            </View>
            <View style={styles.clinicActions}>
              <TouchableOpacity
                style={[styles.actionButton, styles.callButton]}
                onPress={() => handleCallClinic(clinic.phone, clinic.name)}>
                <Icon name="phone" size={20} color={colors.white} />
                <Text style={styles.callButtonText}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.directionsButton]}
                onPress={() => handleGetDirections(clinic.address)}>
                <Icon name="directions" size={20} color={colors.primary} />
                <Text style={styles.directionsButtonText}>Directions</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Emergency Symptoms Guide */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>When to Seek Emergency Care</Text>
        <View style={styles.symptomsCard}>
          <Text style={styles.symptomsTitle}>
            Seek immediate veterinary care if your pet shows:
          </Text>
          {emergencySymptoms.map((symptom, index) => (
            <View key={index} style={styles.symptomItem}>
              <Icon
                name="alert-circle-outline"
                size={16}
                color={colors.error}
              />
              <Text style={styles.symptomText}>{symptom}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* First Aid Tips */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>First Aid Resources</Text>
        <TouchableOpacity style={styles.resourceCard}>
          <Icon
            name="book-open-variant"
            size={24}
            color={colors.primary}
          />
          <Text style={styles.resourceText}>Pet First Aid Guide</Text>
          <Icon name="chevron-right" size={24} color={colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.resourceCard}>
          <Icon name="video" size={24} color={colors.primary} />
          <Text style={styles.resourceText}>CPR Tutorial Videos</Text>
          <Icon name="chevron-right" size={24} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  alertBanner: {
    backgroundColor: colors.error,
    flexDirection: 'row',
    padding: spacing.lg,
    alignItems: 'center',
    gap: spacing.md,
  },
  alertText: {
    flex: 1,
    fontSize: typography.fontSize.sm,
    color: colors.white,
    fontWeight: typography.fontWeight.semiBold,
    lineHeight: typography.lineHeight.md,
  },
  section: {
    padding: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  viewAllText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: typography.fontWeight.medium,
  },
  petSelector: {
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedPet: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  petAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  petInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  petName: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
  },
  petDetails: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xxs,
  },
  contactCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  contactIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  contactName: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.xxs,
  },
  contactDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  contactMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  contactPhone: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
  availableBadge: {
    backgroundColor: colors.success + '20',
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: spacing.xs,
  },
  availableText: {
    fontSize: typography.fontSize.xxs,
    color: colors.success,
    fontWeight: typography.fontWeight.bold,
  },
  clinicCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  clinicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  clinicLeft: {
    flex: 1,
  },
  clinicName: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  clinicMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  clinicRating: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
  clinicDistance: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
  openBadge: {
    backgroundColor: colors.success + '20',
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: spacing.xs,
  },
  openText: {
    fontSize: typography.fontSize.xxs,
    color: colors.success,
    fontWeight: typography.fontWeight.bold,
  },
  clinicAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  addressText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    flex: 1,
  },
  clinicActions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    borderRadius: 8,
    gap: spacing.xs,
  },
  callButton: {
    backgroundColor: colors.error,
  },
  callButtonText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.white,
  },
  directionsButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  directionsButtonText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.primary,
  },
  symptomsCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  symptomsTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  symptomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  symptomText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  resourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  resourceText: {
    flex: 1,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
  },
});

export default EmergencyScreen;
