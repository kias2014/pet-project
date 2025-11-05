import React, {useEffect} from 'react';
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
import {HomeStackParamList} from '@navigation/types';
import {useAppSelector, useAppDispatch} from '@store/store';
import {fetchPetsStart} from '@store/slices/petSlice';
import {fetchAppointmentsStart} from '@store/slices/appointmentSlice';
import {Card, Avatar, Badge, Button} from '@components/common';
import {colors} from '@theme/colors';
import {spacing} from '@theme/spacing';
import {typography} from '@theme/typography';

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.auth);
  const {pets} = useAppSelector(state => state.pet);
  const {upcomingAppointments} = useAppSelector(state => state.appointment);
  const {unreadCount} = useAppSelector(state => state.notification);

  useEffect(() => {
    dispatch(fetchPetsStart());
    dispatch(fetchAppointmentsStart());
  }, [dispatch]);

  const quickActions = [
    {
      id: '1',
      icon: 'calendar-plus',
      label: 'Book',
      color: colors.primary,
      onPress: () => navigation.navigate('ServicesList' as any),
    },
    {
      id: '2',
      icon: 'medical-bag',
      label: 'Emergency',
      color: colors.error,
      onPress: () => navigation.navigate('Emergency'),
    },
    {
      id: '3',
      icon: 'paw',
      label: 'Add Pet',
      color: colors.secondary,
      onPress: () =>
        pets.length === 0
          ? navigation.navigate('PetSetup')
          : navigation.navigate('MyPets' as any),
    },
    {
      id: '4',
      icon: 'shopping',
      label: 'Shop',
      color: colors.accent,
      onPress: () => navigation.navigate('ShopHome' as any),
    },
  ];

  const healthReminders = [
    {
      id: '1',
      petName: 'Max',
      type: 'Vaccination',
      message: 'Rabies vaccination due in 3 days',
      dueDate: '2024-11-08',
      priority: 'high',
    },
    {
      id: '2',
      petName: 'Bella',
      type: 'Checkup',
      message: 'Annual checkup recommended',
      dueDate: '2024-11-15',
      priority: 'medium',
    },
  ];

  const nearbyServices = [
    {
      id: '1',
      name: 'Happy Paws Veterinary Clinic',
      type: 'Veterinary',
      rating: 4.8,
      distance: '0.5 km',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: '2',
      name: 'Pet Grooming Studio',
      type: 'Grooming',
      rating: 4.6,
      distance: '1.2 km',
      image: 'https://via.placeholder.com/100',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {user?.firstName || 'Pet Parent'}! 👋</Text>
          <Text style={styles.subtitle}>How can we help your pets today?</Text>
        </View>
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={() => navigation.navigate('Notifications' as any)}>
          <Icon name="bell" size={24} color={colors.textPrimary} />
          {unreadCount > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationCount}>
                {unreadCount > 9 ? '9+' : unreadCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <View style={styles.quickActions}>
          {quickActions.map(action => (
            <TouchableOpacity
              key={action.id}
              style={styles.quickAction}
              onPress={action.onPress}>
              <View
                style={[
                  styles.quickActionIcon,
                  {backgroundColor: action.color + '20'},
                ]}>
                <Icon name={action.icon} size={28} color={action.color} />
              </View>
              <Text style={styles.quickActionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* My Pets Summary */}
      {pets.length > 0 ? (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Pets</Text>
            <TouchableOpacity onPress={() => navigation.navigate('MyPets' as any)}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {pets.slice(0, 3).map(pet => (
              <Card
                key={pet.id}
                style={styles.petCard}
                onPress={() => navigation.navigate('PetDetail' as any, {petId: pet.id})}>
                <Avatar source={pet.photo} name={pet.name} size={60} />
                <Text style={styles.petName}>{pet.name}</Text>
                <Text style={styles.petSpecies}>{pet.species}</Text>
              </Card>
            ))}
          </ScrollView>
        </View>
      ) : (
        <Card style={styles.emptyPetsCard}>
          <Icon name="paw-off" size={48} color={colors.textTertiary} />
          <Text style={styles.emptyPetsTitle}>No Pets Added Yet</Text>
          <Text style={styles.emptyPetsText}>
            Add your first pet to get personalized care recommendations
          </Text>
          <Button
            title="Add Your Pet"
            onPress={() => navigation.navigate('PetSetup')}
            variant="primary"
            size="small"
            style={styles.addPetButton}
          />
        </Card>
      )}

      {/* Upcoming Appointments */}
      {upcomingAppointments.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Appointments' as any)}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {upcomingAppointments.slice(0, 2).map(appointment => (
            <Card
              key={appointment.id}
              style={styles.appointmentCard}
              onPress={() =>
                navigation.navigate('AppointmentDetail' as any, {
                  appointmentId: appointment.id,
                })
              }>
              <View style={styles.appointmentHeader}>
                <Avatar
                  source={appointment.vendor.photo}
                  name={appointment.vendor.name}
                  size={50}
                />
                <View style={styles.appointmentInfo}>
                  <Text style={styles.appointmentVendor}>
                    {appointment.vendor.name}
                  </Text>
                  <Text style={styles.appointmentService}>
                    {appointment.service.name}
                  </Text>
                  <View style={styles.appointmentMeta}>
                    <Icon name="calendar" size={14} color={colors.textSecondary} />
                    <Text style={styles.appointmentDate}>
                      {new Date(appointment.date).toLocaleDateString()}
                    </Text>
                    <Icon
                      name="clock-outline"
                      size={14}
                      color={colors.textSecondary}
                      style={styles.metaIcon}
                    />
                    <Text style={styles.appointmentTime}>
                      {appointment.startTime}
                    </Text>
                  </View>
                </View>
                <Badge
                  label={appointment.status}
                  variant={
                    appointment.status === 'confirmed' ? 'success' : 'warning'
                  }
                />
              </View>
            </Card>
          ))}
        </View>
      )}

      {/* Health Reminders */}
      {healthReminders.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Reminders</Text>
          {healthReminders.map(reminder => (
            <Card key={reminder.id} style={styles.reminderCard}>
              <View style={styles.reminderHeader}>
                <View
                  style={[
                    styles.reminderIcon,
                    {
                      backgroundColor:
                        reminder.priority === 'high'
                          ? colors.errorLight
                          : colors.warningLight,
                    },
                  ]}>
                  <Icon
                    name="alert-circle"
                    size={24}
                    color={
                      reminder.priority === 'high' ? colors.error : colors.warning
                    }
                  />
                </View>
                <View style={styles.reminderInfo}>
                  <Text style={styles.reminderPet}>{reminder.petName}</Text>
                  <Text style={styles.reminderMessage}>{reminder.message}</Text>
                  <Text style={styles.reminderDate}>
                    Due: {new Date(reminder.dueDate).toLocaleDateString()}
                  </Text>
                </View>
              </View>
            </Card>
          ))}
        </View>
      )}

      {/* Nearby Services */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Services</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ServicesList' as any)}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        {nearbyServices.map(service => (
          <Card
            key={service.id}
            style={styles.serviceCard}
            onPress={() =>
              navigation.navigate('ProviderDetail' as any, {vendorId: service.id})
            }>
            <Image
              source={{uri: service.image}}
              style={styles.serviceImage}
            />
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.serviceType}>{service.type}</Text>
              <View style={styles.serviceMeta}>
                <Icon name="star" size={16} color={colors.accent} />
                <Text style={styles.serviceRating}>{service.rating}</Text>
                <Icon
                  name="map-marker"
                  size={16}
                  color={colors.textSecondary}
                  style={styles.metaIcon}
                />
                <Text style={styles.serviceDistance}>{service.distance}</Text>
              </View>
            </View>
            <Icon name="chevron-right" size={24} color={colors.textTertiary} />
          </Card>
        ))}
      </View>

      {/* Bottom Spacing */}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  greeting: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  notificationButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: colors.white,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
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
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
    alignItems: 'center',
    flex: 1,
  },
  quickActionIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  quickActionLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.textPrimary,
    fontWeight: typography.fontWeight.medium,
  },
  emptyPetsCard: {
    alignItems: 'center',
    padding: spacing.xl,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  emptyPetsTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    marginTop: spacing.md,
  },
  emptyPetsText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  addPetButton: {
    marginTop: spacing.sm,
  },
  petCard: {
    alignItems: 'center',
    padding: spacing.md,
    marginRight: spacing.md,
    minWidth: 120,
  },
  petName: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  petSpecies: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs / 2,
  },
  appointmentCard: {
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  appointmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appointmentInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  appointmentVendor: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
  },
  appointmentService: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs / 2,
  },
  appointmentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  appointmentDate: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginLeft: spacing.xs / 2,
  },
  appointmentTime: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginLeft: spacing.xs / 2,
  },
  metaIcon: {
    marginLeft: spacing.sm,
  },
  reminderCard: {
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  reminderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reminderIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reminderInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  reminderPet: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
  },
  reminderMessage: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs / 2,
  },
  reminderDate: {
    fontSize: typography.fontSize.xs,
    color: colors.textTertiary,
    marginTop: spacing.xs / 2,
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  serviceImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  serviceInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  serviceName: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
  },
  serviceType: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs / 2,
  },
  serviceMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  serviceRating: {
    fontSize: typography.fontSize.sm,
    color: colors.textPrimary,
    marginLeft: spacing.xs / 2,
  },
  serviceDistance: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginLeft: spacing.xs / 2,
  },
  bottomSpacing: {
    height: spacing.xl,
  },
});

export default HomeScreen;
