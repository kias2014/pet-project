import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProfileStackParamList} from '@navigation/types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '@theme/colors';
import {spacing} from '@theme/spacing';
import {typography} from '@theme/typography';

type Props = NativeStackScreenProps<ProfileStackParamList, 'MyAppointments'>;

interface Appointment {
  id: string;
  petId: string;
  petName: string;
  petAvatar: string;
  vendorName: string;
  serviceName: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'confirmed';
  location: string;
  price: number;
}

type Tab = 'upcoming' | 'past';

const MyAppointmentsScreen: React.FC<Props> = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState<Tab>('upcoming');
  const [refreshing, setRefreshing] = useState(false);

  // Mock appointments data
  const allAppointments: Appointment[] = [
    {
      id: '1',
      petId: '1',
      petName: 'Max',
      petAvatar: 'https://via.placeholder.com/50',
      vendorName: 'Happy Paws Veterinary Clinic',
      serviceName: 'Annual Checkup',
      date: '2024-11-10',
      time: '10:00 AM',
      status: 'confirmed',
      location: '123 Main St, New York',
      price: 75,
    },
    {
      id: '2',
      petId: '2',
      petName: 'Luna',
      petAvatar: 'https://via.placeholder.com/50',
      vendorName: 'PetGroomers Elite',
      serviceName: 'Full Grooming Service',
      date: '2024-11-12',
      time: '2:00 PM',
      status: 'scheduled',
      location: '456 Park Ave, New York',
      price: 60,
    },
    {
      id: '3',
      petId: '1',
      petName: 'Max',
      petAvatar: 'https://via.placeholder.com/50',
      vendorName: 'Happy Paws Veterinary Clinic',
      serviceName: 'Vaccination',
      date: '2024-10-15',
      time: '11:00 AM',
      status: 'completed',
      location: '123 Main St, New York',
      price: 45,
    },
    {
      id: '4',
      petId: '3',
      petName: 'Charlie',
      petAvatar: 'https://via.placeholder.com/50',
      vendorName: 'Bark & Bath',
      serviceName: 'Teeth Cleaning',
      date: '2024-10-05',
      time: '3:30 PM',
      status: 'completed',
      location: '789 Broadway, New York',
      price: 90,
    },
    {
      id: '5',
      petId: '2',
      petName: 'Luna',
      petAvatar: 'https://via.placeholder.com/50',
      vendorName: 'PetCare Central',
      serviceName: 'Emergency Visit',
      date: '2024-09-20',
      time: '9:00 AM',
      status: 'cancelled',
      location: '321 Oak St, New York',
      price: 120,
    },
  ];

  const upcomingAppointments = allAppointments.filter(
    a => new Date(a.date) >= new Date() && a.status !== 'cancelled'
  );

  const pastAppointments = allAppointments.filter(
    a => new Date(a.date) < new Date() || a.status === 'cancelled' || a.status === 'completed'
  );

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'confirmed':
        return colors.success;
      case 'scheduled':
        return colors.primary;
      case 'completed':
        return colors.textSecondary;
      case 'cancelled':
        return colors.error;
      default:
        return colors.textSecondary;
    }
  };

  const getStatusLabel = (status: string): string => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // TODO: Fetch appointments from API
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const renderAppointmentCard = ({item}: {item: Appointment}) => (
    <TouchableOpacity
      style={styles.appointmentCard}
      onPress={() => navigation.navigate('AppointmentDetail' as any, {appointmentId: item.id})}>
      <View style={styles.cardHeader}>
        <View style={styles.petInfo}>
          <View style={styles.petAvatar}>
            <Icon name="paw" size={20} color={colors.primary} />
          </View>
          <Text style={styles.petName}>{item.petName}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            {backgroundColor: getStatusColor(item.status) + '20'},
          ]}>
          <Text
            style={[
              styles.statusText,
              {color: getStatusColor(item.status)},
            ]}>
            {getStatusLabel(item.status)}
          </Text>
        </View>
      </View>

      <View style={styles.serviceInfo}>
        <Text style={styles.serviceName}>{item.serviceName}</Text>
        <Text style={styles.vendorName}>{item.vendorName}</Text>
      </View>

      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <Icon name="calendar" size={16} color={colors.textSecondary} />
          <Text style={styles.detailText}>{formatDate(item.date)}</Text>
        </View>
        <View style={styles.detailItem}>
          <Icon name="clock-outline" size={16} color={colors.textSecondary} />
          <Text style={styles.detailText}>{item.time}</Text>
        </View>
      </View>

      <View style={styles.locationRow}>
        <Icon name="map-marker" size={16} color={colors.textSecondary} />
        <Text style={styles.locationText} numberOfLines={1}>
          {item.location}
        </Text>
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <Icon name="chevron-right" size={24} color={colors.textSecondary} />
      </View>
    </TouchableOpacity>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Icon
        name={selectedTab === 'upcoming' ? 'calendar-blank' : 'history'}
        size={80}
        color={colors.border}
      />
      <Text style={styles.emptyTitle}>
        {selectedTab === 'upcoming'
          ? 'No Upcoming Appointments'
          : 'No Past Appointments'}
      </Text>
      <Text style={styles.emptyDescription}>
        {selectedTab === 'upcoming'
          ? 'Book your first appointment to get started'
          : 'Your completed appointments will appear here'}
      </Text>
    </View>
  );

  const currentAppointments =
    selectedTab === 'upcoming' ? upcomingAppointments : pastAppointments;

  return (
    <View style={styles.container}>
      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'upcoming' && styles.tabActive,
          ]}
          onPress={() => setSelectedTab('upcoming')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'upcoming' && styles.tabTextActive,
            ]}>
            Upcoming ({upcomingAppointments.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'past' && styles.tabActive,
          ]}
          onPress={() => setSelectedTab('past')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'past' && styles.tabTextActive,
            ]}>
            Past ({pastAppointments.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Appointments List */}
      <FlatList
        data={currentAppointments}
        renderItem={renderAppointmentCard}
        keyExtractor={item => item.id}
        contentContainerStyle={[
          styles.listContent,
          currentAppointments.length === 0 && styles.listContentEmpty,
        ]}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
  },
  listContent: {
    padding: spacing.lg,
  },
  listContentEmpty: {
    flexGrow: 1,
  },
  appointmentCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  petInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  petAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  petName: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    marginLeft: spacing.sm,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  statusText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
  },
  serviceInfo: {
    marginBottom: spacing.md,
  },
  serviceName: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.xxs,
  },
  vendorName: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  detailsRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
    gap: spacing.lg,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  detailText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  locationText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    flex: 1,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  price: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
  },
  emptyTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginTop: spacing.lg,
  },
  emptyDescription: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: typography.lineHeight.lg,
  },
});

export default MyAppointmentsScreen;
