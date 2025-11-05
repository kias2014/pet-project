import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProfileStackParamList} from '@navigation/types';
import {Card, Avatar} from '@components/common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '@theme/colors';
import {spacing} from '@theme/spacing';
import {typography} from '@theme/typography';

type Props = NativeStackScreenProps<
  ProfileStackParamList,
  'PetMedicalRecords'
>;

interface MedicalRecord {
  id: string;
  petId: string;
  type: 'vaccination' | 'checkup' | 'prescription' | 'surgery' | 'diagnostic';
  title: string;
  date: string;
  provider: string;
  notes: string;
  attachments?: number;
  nextAppointment?: string;
}

type RecordFilter = 'all' | 'vaccination' | 'checkup' | 'prescription' | 'surgery' | 'diagnostic';

const PetMedicalRecordsScreen: React.FC<Props> = ({navigation, route}) => {
  const {petId} = route.params;
  const [selectedFilter, setSelectedFilter] = useState<RecordFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [records, setRecords] = useState<MedicalRecord[]>([]);

  // Mock pet data
  const pet = {
    id: petId,
    name: 'Max',
    species: 'Dog',
    photo: 'https://via.placeholder.com/100',
  };

  // Mock medical records data
  useEffect(() => {
    const mockRecords: MedicalRecord[] = [
      {
        id: '1',
        petId: petId,
        type: 'vaccination',
        title: 'Rabies Vaccination',
        date: '2024-10-15',
        provider: 'Dr. Sarah Johnson',
        notes: 'Annual rabies vaccination completed. Next due in 12 months.',
        attachments: 1,
        nextAppointment: '2025-10-15',
      },
      {
        id: '2',
        petId: petId,
        type: 'checkup',
        title: 'Annual Health Checkup',
        date: '2024-09-20',
        provider: 'Dr. Michael Chen',
        notes: 'Comprehensive health examination. All vitals normal. Weight: 25.5kg',
        attachments: 2,
      },
      {
        id: '3',
        petId: petId,
        type: 'prescription',
        title: 'Antibiotics Prescription',
        date: '2024-08-10',
        provider: 'Dr. Emily Wilson',
        notes: 'Prescribed amoxicillin for bacterial infection. 10-day course.',
        attachments: 1,
      },
      {
        id: '4',
        petId: petId,
        type: 'diagnostic',
        title: 'Blood Test Results',
        date: '2024-08-05',
        provider: 'VetLab Diagnostics',
        notes: 'Complete blood count and chemistry panel. All values within normal range.',
        attachments: 3,
      },
      {
        id: '5',
        petId: petId,
        type: 'surgery',
        title: 'Dental Cleaning',
        date: '2024-07-12',
        provider: 'Dr. Robert Lee',
        notes: 'Professional dental cleaning under anesthesia. Two teeth extracted.',
        attachments: 2,
      },
      {
        id: '6',
        petId: petId,
        type: 'vaccination',
        title: 'DHPP Vaccination',
        date: '2024-06-01',
        provider: 'Dr. Sarah Johnson',
        notes: 'Distemper, Hepatitis, Parvovirus, Parainfluenza vaccine administered.',
        nextAppointment: '2025-06-01',
      },
    ];
    setRecords(mockRecords);
  }, [petId]);

  const filters: {label: string; value: RecordFilter}[] = [
    {label: 'All', value: 'all'},
    {label: 'Vaccinations', value: 'vaccination'},
    {label: 'Checkups', value: 'checkup'},
    {label: 'Prescriptions', value: 'prescription'},
    {label: 'Surgery', value: 'surgery'},
    {label: 'Diagnostic', value: 'diagnostic'},
  ];

  const getRecordIcon = (type: string): string => {
    switch (type) {
      case 'vaccination':
        return 'needle';
      case 'checkup':
        return 'stethoscope';
      case 'prescription':
        return 'pill';
      case 'surgery':
        return 'hospital-box';
      case 'diagnostic':
        return 'test-tube';
      default:
        return 'file-document';
    }
  };

  const getRecordColor = (type: string): string => {
    switch (type) {
      case 'vaccination':
        return colors.success;
      case 'checkup':
        return colors.primary;
      case 'prescription':
        return colors.warning;
      case 'surgery':
        return colors.error;
      case 'diagnostic':
        return colors.info;
      default:
        return colors.textSecondary;
    }
  };

  const filteredRecords = records
    .filter(record => {
      if (selectedFilter !== 'all' && record.type !== selectedFilter) {
        return false;
      }
      if (searchQuery) {
        return (
          record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          record.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
          record.notes.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      return true;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleAddRecord = () => {
    navigation.navigate('AddMedicalRecord', {petId});
  };

  const handleEditRecord = (recordId: string) => {
    navigation.navigate('EditMedicalRecord', {petId, recordId});
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.petInfo}>
        <Avatar source={pet.photo} name={pet.name} size={50} />
        <View style={styles.petDetails}>
          <Text style={styles.petName}>{pet.name}'s Medical Records</Text>
          <Text style={styles.petSpecies}>{pet.species}</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon
          name="magnify"
          size={20}
          color={colors.textSecondary}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search records..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={colors.textSecondary}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Icon name="close-circle" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersScroll}
        contentContainerStyle={styles.filtersContainer}>
        {filters.map(filter => (
          <TouchableOpacity
            key={filter.value}
            style={[
              styles.filterChip,
              selectedFilter === filter.value && styles.filterChipActive,
            ]}
            onPress={() => setSelectedFilter(filter.value)}>
            <Text
              style={[
                styles.filterChipText,
                selectedFilter === filter.value && styles.filterChipTextActive,
              ]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.recordCount}>
        <Text style={styles.recordCountText}>
          {filteredRecords.length} {filteredRecords.length === 1 ? 'Record' : 'Records'}
        </Text>
      </View>
    </View>
  );

  const renderRecord = ({item}: {item: MedicalRecord}) => (
    <TouchableOpacity
      style={styles.recordCard}
      onPress={() => handleEditRecord(item.id)}>
      <View style={styles.recordHeader}>
        <View
          style={[
            styles.recordIcon,
            {backgroundColor: getRecordColor(item.type) + '20'},
          ]}>
          <Icon
            name={getRecordIcon(item.type)}
            size={24}
            color={getRecordColor(item.type)}
          />
        </View>
        <View style={styles.recordHeaderText}>
          <Text style={styles.recordTitle}>{item.title}</Text>
          <Text style={styles.recordDate}>{formatDate(item.date)}</Text>
        </View>
        <Icon name="chevron-right" size={24} color={colors.textSecondary} />
      </View>

      <View style={styles.recordProvider}>
        <Icon name="doctor" size={16} color={colors.textSecondary} />
        <Text style={styles.recordProviderText}>{item.provider}</Text>
      </View>

      <Text style={styles.recordNotes} numberOfLines={2}>
        {item.notes}
      </Text>

      <View style={styles.recordFooter}>
        {item.attachments && (
          <View style={styles.recordAttachments}>
            <Icon name="paperclip" size={14} color={colors.textSecondary} />
            <Text style={styles.recordAttachmentsText}>
              {item.attachments} {item.attachments === 1 ? 'file' : 'files'}
            </Text>
          </View>
        )}
        {item.nextAppointment && (
          <View style={styles.recordNextAppointment}>
            <Icon name="calendar-clock" size={14} color={colors.primary} />
            <Text style={styles.recordNextAppointmentText}>
              Next: {formatDate(item.nextAppointment)}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Icon name="file-document-outline" size={80} color={colors.border} />
      <Text style={styles.emptyTitle}>No Medical Records</Text>
      <Text style={styles.emptyDescription}>
        {searchQuery
          ? 'No records match your search'
          : selectedFilter !== 'all'
          ? `No ${selectedFilter} records found`
          : 'Add your first medical record to start tracking'}
      </Text>
      {!searchQuery && selectedFilter === 'all' && (
        <TouchableOpacity style={styles.emptyButton} onPress={handleAddRecord}>
          <Text style={styles.emptyButtonText}>Add Record</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredRecords}
        renderItem={renderRecord}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={[
          styles.listContent,
          filteredRecords.length === 0 && styles.listContentEmpty,
        ]}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={handleAddRecord}>
        <Icon name="plus" size={28} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingBottom: spacing.xxl + 60, // Extra space for FAB
  },
  listContentEmpty: {
    flexGrow: 1,
  },
  header: {
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  petInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  petDetails: {
    marginLeft: spacing.md,
    flex: 1,
  },
  petName: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  petSpecies: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xxs,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
    padding: 0,
  },
  filtersScroll: {
    marginBottom: spacing.md,
  },
  filtersContainer: {
    paddingRight: spacing.lg,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.backgroundSecondary,
    marginRight: spacing.sm,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
  },
  filterChipText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.medium,
  },
  filterChipTextActive: {
    color: colors.white,
  },
  recordCount: {
    paddingTop: spacing.sm,
  },
  recordCountText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.medium,
  },
  recordCard: {
    backgroundColor: colors.white,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    padding: spacing.lg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  recordHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  recordIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordHeaderText: {
    flex: 1,
    marginLeft: spacing.md,
  },
  recordTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
  },
  recordDate: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xxs,
  },
  recordProvider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  recordProviderText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  recordNotes: {
    fontSize: typography.fontSize.sm,
    color: colors.textPrimary,
    lineHeight: typography.lineHeight.md,
    marginBottom: spacing.md,
  },
  recordFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recordAttachments: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordAttachmentsText: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  recordNextAppointment: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordNextAppointmentText: {
    fontSize: typography.fontSize.xs,
    color: colors.primary,
    fontWeight: typography.fontWeight.medium,
    marginLeft: spacing.xs,
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
  emptyButton: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: 12,
  },
  emptyButtonText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.white,
  },
  fab: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.xl,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default PetMedicalRecordsScreen;
