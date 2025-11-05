import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ServicesStackParamList} from '@navigation/types';
import {Card, Button} from '@components/common';
import {colors} from '@theme/colors';
import {spacing} from '@theme/spacing';
import {typography} from '@theme/typography';

type Props = NativeStackScreenProps<
  ServicesStackParamList,
  'BookingConfirmation'
>;

const BookingConfirmationScreen: React.FC<Props> = ({navigation, route}) => {
  const {appointmentId} = route.params;

  // Mock appointment data - in real app, fetch from store or API
  const appointment = {
    id: appointmentId,
    confirmationNumber: 'APT-' + Date.now().toString().slice(-6),
    service: 'General Checkup',
    provider: 'Dr. Sarah Johnson',
    pet: 'Max',
    date: new Date().toLocaleDateString(),
    time: '10:00 AM',
    duration: '30 min',
    price: 500,
    address: '123 Pet Care Street, Downtown',
  };

  const handleGoHome = () => {
    navigation.navigate('HomeTab' as any);
  };

  const handleViewAppointment = () => {
    navigation.navigate('AppointmentDetail', {appointmentId});
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      {/* Success Icon */}
      <View style={styles.successIconContainer}>
        <View style={styles.successIcon}>
          <Icon name="check-circle" size={80} color={colors.success} />
        </View>
      </View>

      {/* Success Message */}
      <Text style={styles.title}>Booking Confirmed!</Text>
      <Text style={styles.subtitle}>
        Your appointment has been successfully booked
      </Text>

      {/* Confirmation Number */}
      <Card style={styles.confirmationCard}>
        <Text style={styles.confirmationLabel}>Confirmation Number</Text>
        <Text style={styles.confirmationNumber}>
          {appointment.confirmationNumber}
        </Text>
      </Card>

      {/* Appointment Details */}
      <Card style={styles.detailsCard}>
        <Text style={styles.cardTitle}>Appointment Details</Text>

        <View style={styles.detailRow}>
          <View style={styles.detailIconContainer}>
            <Icon name="medical-bag" size={24} color={colors.primary} />
          </View>
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Service</Text>
            <Text style={styles.detailValue}>{appointment.service}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailIconContainer}>
            <Icon name="doctor" size={24} color={colors.primary} />
          </View>
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Provider</Text>
            <Text style={styles.detailValue}>{appointment.provider}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailIconContainer}>
            <Icon name="paw" size={24} color={colors.primary} />
          </View>
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Pet</Text>
            <Text style={styles.detailValue}>{appointment.pet}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailIconContainer}>
            <Icon name="calendar" size={24} color={colors.primary} />
          </View>
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Date</Text>
            <Text style={styles.detailValue}>{appointment.date}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailIconContainer}>
            <Icon name="clock-outline" size={24} color={colors.primary} />
          </View>
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Time</Text>
            <Text style={styles.detailValue}>
              {appointment.time} ({appointment.duration})
            </Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailIconContainer}>
            <Icon name="map-marker" size={24} color={colors.primary} />
          </View>
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Location</Text>
            <Text style={styles.detailValue}>{appointment.address}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalValue}>₹{appointment.price}</Text>
        </View>
      </Card>

      {/* What's Next Card */}
      <Card style={styles.nextStepsCard}>
        <Text style={styles.cardTitle}>What's Next?</Text>

        <View style={styles.stepItem}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>1</Text>
          </View>
          <Text style={styles.stepText}>
            You'll receive a confirmation email shortly
          </Text>
        </View>

        <View style={styles.stepItem}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>2</Text>
          </View>
          <Text style={styles.stepText}>
            We'll send a reminder 1 day before your appointment
          </Text>
        </View>

        <View style={styles.stepItem}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>3</Text>
          </View>
          <Text style={styles.stepText}>
            Arrive 10 minutes early for check-in
          </Text>
        </View>
      </Card>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <Button
          title="View Appointment"
          onPress={handleViewAppointment}
          variant="primary"
          fullWidth
        />
        <Button
          title="Back to Home"
          onPress={handleGoHome}
          variant="outline"
          fullWidth
          style={styles.homeButton}
        />
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
  content: {
    padding: spacing.lg,
  },
  successIconContainer: {
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  successIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.successLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  confirmationCard: {
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
    backgroundColor: colors.primary + '10',
  },
  confirmationLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  confirmationNumber: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    letterSpacing: 2,
  },
  detailsCard: {
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  cardTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  detailIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailContent: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: 'center',
  },
  detailLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginBottom: spacing.xs / 2,
  },
  detailValue: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
  },
  totalValue: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  nextStepsCard: {
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.white,
  },
  stepText: {
    flex: 1,
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
    marginLeft: spacing.md,
    marginTop: spacing.xs / 2,
  },
  actions: {
    gap: spacing.md,
  },
  homeButton: {
    marginTop: spacing.xs,
  },
  bottomSpacing: {
    height: spacing.xl,
  },
});

export default BookingConfirmationScreen;
