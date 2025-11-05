import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ProfileStackParamList} from '@navigation/types';
import {useAppSelector} from '@store/store';
import {Card, Avatar, Badge, Button} from '@components/common';
import {colors} from '@theme/colors';
import {spacing} from '@theme/spacing';
import {typography} from '@theme/typography';

type Props = NativeStackScreenProps<ProfileStackParamList, 'PetDetail'>;

const PetDetailScreen: React.FC<Props> = ({navigation, route}) => {
  const {petId} = route.params;
  const {pets} = useAppSelector(state => state.pet);
  const pet = pets.find(p => p.id === petId);

  const [selectedTab, setSelectedTab] = useState<'overview' | 'health' | 'records'>('overview');

  if (!pet) {
    return (
      <View style={styles.container}>
        <Text>Pet not found</Text>
      </View>
    );
  }

  // Mock health data
  const healthStats = {
    weight: 25.5,
    weightTrend: 'stable', // up, down, stable
    lastCheckup: '2024-10-15',
    nextVaccination: '2024-11-10',
    vaccinationStatus: 'due-soon',
  };

  const upcomingVaccinations = [
    {
      id: '1',
      name: 'Rabies Booster',
      dueDate: '2024-11-10',
      status: 'due-soon',
    },
    {
      id: '2',
      name: 'DHPP',
      dueDate: '2024-12-05',
      status: 'upcoming',
    },
  ];

  const recentRecords = [
    {
      id: '1',
      type: 'vaccination',
      title: 'Rabies Vaccination',
      date: '2023-11-10',
      veterinarian: 'Dr. Sarah Johnson',
    },
    {
      id: '2',
      type: 'checkup',
      title: 'Annual Health Checkup',
      date: '2024-10-15',
      veterinarian: 'Dr. Sarah Johnson',
    },
    {
      id: '3',
      type: 'prescription',
      title: 'Flea & Tick Treatment',
      date: '2024-09-20',
      veterinarian: 'Dr. Mike Wilson',
    },
  ];

  const handleEditPet = () => {
    navigation.navigate('EditPet', {petId: pet.id});
  };

  const handleViewMedicalRecords = () => {
    navigation.navigate('PetMedicalRecords', {petId: pet.id});
  };

  const handleAddRecord = () => {
    navigation.navigate('AddMedicalRecord', {petId: pet.id});
  };

  const getRecordIcon = (type: string) => {
    switch (type) {
      case 'vaccination':
        return 'needle';
      case 'checkup':
        return 'stethoscope';
      case 'prescription':
        return 'pill';
      case 'surgery':
        return 'hospital-box';
      default:
        return 'file-document';
    }
  };

  const getRecordColor = (type: string) => {
    switch (type) {
      case 'vaccination':
        return colors.primary;
      case 'checkup':
        return colors.secondary;
      case 'prescription':
        return colors.warning;
      case 'surgery':
        return colors.error;
      default:
        return colors.textSecondary;
    }
  };

  const renderOverviewTab = () => (
    <View>
      {/* Basic Information */}
      <Card style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          <TouchableOpacity onPress={handleEditPet}>
            <Icon name="pencil" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Icon name="paw" size={20} color={colors.textSecondary} />
            <Text style={styles.infoLabel}>Species</Text>
            <Text style={styles.infoValue}>{pet.species}</Text>
          </View>

          {pet.breed && (
            <View style={styles.infoItem}>
              <Icon name="dog" size={20} color={colors.textSecondary} />
              <Text style={styles.infoLabel}>Breed</Text>
              <Text style={styles.infoValue}>{pet.breed}</Text>
            </View>
          )}

          <View style={styles.infoItem}>
            <Icon
              name={pet.gender === 'male' ? 'gender-male' : 'gender-female'}
              size={20}
              color={pet.gender === 'male' ? colors.primary : colors.error}
            />
            <Text style={styles.infoLabel}>Gender</Text>
            <Text style={styles.infoValue}>
              {pet.gender === 'male' ? 'Male' : 'Female'}
            </Text>
          </View>

          {pet.age && (
            <View style={styles.infoItem}>
              <Icon name="calendar" size={20} color={colors.textSecondary} />
              <Text style={styles.infoLabel}>Age</Text>
              <Text style={styles.infoValue}>{pet.age} years</Text>
            </View>
          )}

          {pet.weight && (
            <View style={styles.infoItem}>
              <Icon name="weight" size={20} color={colors.textSecondary} />
              <Text style={styles.infoLabel}>Weight</Text>
              <Text style={styles.infoValue}>{pet.weight} kg</Text>
            </View>
          )}

          {pet.color && (
            <View style={styles.infoItem}>
              <Icon name="palette" size={20} color={colors.textSecondary} />
              <Text style={styles.infoLabel}>Color</Text>
              <Text style={styles.infoValue}>{pet.color}</Text>
            </View>
          )}
        </View>
      </Card>

      {/* Health Summary */}
      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Health Summary</Text>
        <View style={styles.healthStats}>
          <View style={styles.statCard}>
            <Icon name="weight-kilogram" size={32} color={colors.primary} />
            <Text style={styles.statValue}>{healthStats.weight} kg</Text>
            <Text style={styles.statLabel}>Current Weight</Text>
            <Badge
              label={healthStats.weightTrend}
              variant={
                healthStats.weightTrend === 'stable' ? 'success' : 'warning'
              }
              style={styles.statBadge}
            />
          </View>

          <View style={styles.statCard}>
            <Icon name="calendar-check" size={32} color={colors.secondary} />
            <Text style={styles.statValue}>
              {new Date(healthStats.lastCheckup).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </Text>
            <Text style={styles.statLabel}>Last Checkup</Text>
          </View>
        </View>
      </Card>

      {/* Quick Actions */}
      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleViewMedicalRecords}>
            <Icon name="file-document" size={24} color={colors.primary} />
            <Text style={styles.actionText}>Medical Records</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleAddRecord}>
            <Icon name="plus-circle" size={24} color={colors.secondary} />
            <Text style={styles.actionText}>Add Record</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('BookingFlow' as any)}>
            <Icon name="calendar-plus" size={24} color={colors.accent} />
            <Text style={styles.actionText}>Book Appointment</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );

  const renderHealthTab = () => (
    <View>
      {/* Upcoming Vaccinations */}
      <Card style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Vaccinations</Text>
          <Badge label={upcomingVaccinations.length.toString()} variant="warning" />
        </View>

        {upcomingVaccinations.map(vaccination => (
          <View key={vaccination.id} style={styles.vaccinationCard}>
            <View style={styles.vaccinationIcon}>
              <Icon name="needle" size={24} color={colors.warning} />
            </View>
            <View style={styles.vaccinationInfo}>
              <Text style={styles.vaccinationName}>{vaccination.name}</Text>
              <Text style={styles.vaccinationDate}>
                Due: {new Date(vaccination.dueDate).toLocaleDateString()}
              </Text>
            </View>
            <Badge
              label={vaccination.status === 'due-soon' ? 'Due Soon' : 'Upcoming'}
              variant={vaccination.status === 'due-soon' ? 'warning' : 'info'}
            />
          </View>
        ))}

        <Button
          title="Schedule Vaccination"
          onPress={() => navigation.navigate('BookingFlow' as any)}
          variant="outline"
          fullWidth
          style={styles.scheduleButton}
        />
      </Card>

      {/* Weight Tracking */}
      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Weight History</Text>
        <View style={styles.weightChart}>
          <View style={styles.chartPlaceholder}>
            <Icon name="chart-line" size={48} color={colors.textTertiary} />
            <Text style={styles.chartText}>
              Weight tracking chart will appear here
            </Text>
          </View>
          <View style={styles.weightHistory}>
            <View style={styles.weightEntry}>
              <Text style={styles.weightDate}>Oct 15, 2024</Text>
              <Text style={styles.weightValue}>25.5 kg</Text>
            </View>
            <View style={styles.weightEntry}>
              <Text style={styles.weightDate}>Sep 10, 2024</Text>
              <Text style={styles.weightValue}>25.3 kg</Text>
            </View>
            <View style={styles.weightEntry}>
              <Text style={styles.weightDate}>Aug 5, 2024</Text>
              <Text style={styles.weightValue}>25.0 kg</Text>
            </View>
          </View>
        </View>
      </Card>

      {/* Health Reminders */}
      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Health Reminders</Text>
        <View style={styles.reminder}>
          <Icon name="alert-circle" size={24} color={colors.warning} />
          <View style={styles.reminderContent}>
            <Text style={styles.reminderTitle}>Flea & Tick Treatment</Text>
            <Text style={styles.reminderText}>Monthly treatment due in 5 days</Text>
          </View>
        </View>
        <View style={styles.reminder}>
          <Icon name="information" size={24} color={colors.info} />
          <View style={styles.reminderContent}>
            <Text style={styles.reminderTitle}>Dental Checkup</Text>
            <Text style={styles.reminderText}>Recommended every 6 months</Text>
          </View>
        </View>
      </Card>
    </View>
  );

  const renderRecordsTab = () => (
    <View>
      <Card style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Medical Records</Text>
          <TouchableOpacity onPress={handleViewMedicalRecords}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        {recentRecords.map(record => (
          <TouchableOpacity
            key={record.id}
            style={styles.recordCard}
            onPress={handleViewMedicalRecords}>
            <View
              style={[
                styles.recordIcon,
                {backgroundColor: getRecordColor(record.type) + '20'},
              ]}>
              <Icon
                name={getRecordIcon(record.type)}
                size={24}
                color={getRecordColor(record.type)}
              />
            </View>
            <View style={styles.recordInfo}>
              <Text style={styles.recordTitle}>{record.title}</Text>
              <Text style={styles.recordMeta}>
                {new Date(record.date).toLocaleDateString()} • {record.veterinarian}
              </Text>
            </View>
            <Icon name="chevron-right" size={24} color={colors.textTertiary} />
          </TouchableOpacity>
        ))}

        <Button
          title="Add Medical Record"
          onPress={handleAddRecord}
          variant="outline"
          fullWidth
          style={styles.addRecordButton}
        />
      </Card>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Pet Header */}
        <View style={styles.header}>
          <Avatar source={pet.photo} name={pet.name} size={100} />
          <Text style={styles.petName}>{pet.name}</Text>
          <Text style={styles.petBreed}>
            {pet.species} {pet.breed && `• ${pet.breed}`}
          </Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'overview' && styles.activeTab]}
            onPress={() => setSelectedTab('overview')}>
            <Text
              style={[
                styles.tabText,
                selectedTab === 'overview' && styles.activeTabText,
              ]}>
              Overview
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'health' && styles.activeTab]}
            onPress={() => setSelectedTab('health')}>
            <Text
              style={[
                styles.tabText,
                selectedTab === 'health' && styles.activeTabText,
              ]}>
              Health
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'records' && styles.activeTab]}
            onPress={() => setSelectedTab('records')}>
            <Text
              style={[
                styles.tabText,
                selectedTab === 'records' && styles.activeTabText,
              ]}>
              Records
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        <View style={styles.content}>
          {selectedTab === 'overview' && renderOverviewTab()}
          {selectedTab === 'health' && renderHealthTab()}
          {selectedTab === 'records' && renderRecordsTab()}
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.surface,
  },
  petName: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginTop: spacing.md,
  },
  petBreed: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginTop: spacing.xs / 2,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
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
  viewAll: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: typography.fontWeight.medium,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  infoItem: {
    width: '47%',
    padding: spacing.md,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 8,
  },
  infoLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  infoValue: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    marginTop: spacing.xs / 2,
  },
  healthStats: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 12,
  },
  statValue: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  statLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginTop: spacing.xs / 2,
  },
  statBadge: {
    marginTop: spacing.xs,
  },
  quickActions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 12,
  },
  actionText: {
    fontSize: typography.fontSize.xs,
    color: colors.textPrimary,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  vaccinationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  vaccinationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.warningLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vaccinationInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  vaccinationName: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
  },
  vaccinationDate: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs / 2,
  },
  scheduleButton: {
    marginTop: spacing.sm,
  },
  weightChart: {
    marginTop: spacing.md,
  },
  chartPlaceholder: {
    height: 150,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  chartText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  weightHistory: {
    gap: spacing.sm,
  },
  weightEntry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  weightDate: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  weightValue: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
  },
  reminder: {
    flexDirection: 'row',
    padding: spacing.md,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  reminderContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  reminderTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
  },
  reminderText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs / 2,
  },
  recordCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  recordIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  recordTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
  },
  recordMeta: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs / 2,
  },
  addRecordButton: {
    marginTop: spacing.sm,
  },
  bottomSpacing: {
    height: spacing.xl,
  },
});

export default PetDetailScreen;
