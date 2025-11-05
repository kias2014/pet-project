import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProfileStackParamList} from '@navigation/types';
import {Button, Input} from '@components/common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '@theme/colors';
import {spacing} from '@theme/spacing';
import {typography} from '@theme/typography';

type Props = NativeStackScreenProps<
  ProfileStackParamList,
  'EditMedicalRecord'
>;

type RecordType = 'vaccination' | 'checkup' | 'prescription' | 'surgery' | 'diagnostic';

interface RecordTypeOption {
  value: RecordType;
  label: string;
  icon: string;
  color: string;
}

const EditMedicalRecordScreen: React.FC<Props> = ({navigation, route}) => {
  const {petId, recordId} = route.params;

  const [formData, setFormData] = useState({
    type: '' as RecordType | '',
    title: '',
    date: '',
    provider: '',
    notes: '',
    nextAppointment: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const recordTypes: RecordTypeOption[] = [
    {
      value: 'vaccination',
      label: 'Vaccination',
      icon: 'needle',
      color: colors.success,
    },
    {
      value: 'checkup',
      label: 'Checkup',
      icon: 'stethoscope',
      color: colors.primary,
    },
    {
      value: 'prescription',
      label: 'Prescription',
      icon: 'pill',
      color: colors.warning,
    },
    {
      value: 'surgery',
      label: 'Surgery',
      icon: 'hospital-box',
      color: colors.error,
    },
    {
      value: 'diagnostic',
      label: 'Diagnostic',
      icon: 'test-tube',
      color: colors.info,
    },
  ];

  // Fetch existing record data
  useEffect(() => {
    // TODO: Fetch record from API
    // Mock data for now
    const mockRecord = {
      id: recordId,
      type: 'vaccination' as RecordType,
      title: 'Rabies Vaccination',
      date: '2024-10-15',
      provider: 'Dr. Sarah Johnson',
      notes: 'Annual rabies vaccination completed. Next due in 12 months.',
      nextAppointment: '2025-10-15',
    };

    setFormData({
      type: mockRecord.type,
      title: mockRecord.title,
      date: mockRecord.date,
      provider: mockRecord.provider,
      notes: mockRecord.notes,
      nextAppointment: mockRecord.nextAppointment || '',
    });
  }, [recordId]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.type) {
      newErrors.type = 'Please select a record type';
    }
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    if (!formData.provider.trim()) {
      newErrors.provider = 'Provider name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);

    // TODO: Implement API call to update medical record
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Medical record updated successfully', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    }, 1000);
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Record',
      'Are you sure you want to delete this medical record? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setDeleting(true);
            // TODO: Implement API call to delete medical record
            setTimeout(() => {
              setDeleting(false);
              Alert.alert('Success', 'Medical record deleted successfully', [
                {
                  text: 'OK',
                  onPress: () => navigation.goBack(),
                },
              ]);
            }, 1000);
          },
        },
      ]
    );
  };

  const handleTypeSelect = (type: RecordType) => {
    setFormData({...formData, type});
    setErrors({...errors, type: ''});
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Record Type *</Text>
          <View style={styles.typeGrid}>
            {recordTypes.map(type => (
              <TouchableOpacity
                key={type.value}
                style={[
                  styles.typeCard,
                  formData.type === type.value && styles.typeCardActive,
                  formData.type === type.value && {
                    borderColor: type.color,
                    backgroundColor: type.color + '10',
                  },
                ]}
                onPress={() => handleTypeSelect(type.value)}>
                <View
                  style={[
                    styles.typeIcon,
                    {backgroundColor: type.color + '20'},
                  ]}>
                  <Icon name={type.icon} size={24} color={type.color} />
                </View>
                <Text
                  style={[
                    styles.typeLabel,
                    formData.type === type.value && {color: type.color},
                  ]}>
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {errors.type && <Text style={styles.errorText}>{errors.type}</Text>}
        </View>

        <View style={styles.section}>
          <Input
            label="Title *"
            placeholder="e.g., Rabies Vaccination, Annual Checkup"
            value={formData.title}
            onChangeText={text => {
              setFormData({...formData, title: text});
              setErrors({...errors, title: ''});
            }}
            leftIcon="text"
            error={errors.title}
          />
        </View>

        <View style={styles.section}>
          <Input
            label="Date *"
            placeholder="YYYY-MM-DD"
            value={formData.date}
            onChangeText={text => {
              setFormData({...formData, date: text});
              setErrors({...errors, date: ''});
            }}
            leftIcon="calendar"
            error={errors.date}
            // In a real app, this would be a date picker
          />
          <Text style={styles.helperText}>
            Format: YYYY-MM-DD (e.g., 2024-11-05)
          </Text>
        </View>

        <View style={styles.section}>
          <Input
            label="Provider/Clinic *"
            placeholder="e.g., Dr. Smith, VetCare Clinic"
            value={formData.provider}
            onChangeText={text => {
              setFormData({...formData, provider: text});
              setErrors({...errors, provider: ''});
            }}
            leftIcon="doctor"
            error={errors.provider}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Notes</Text>
          <View style={styles.textAreaContainer}>
            <Input
              placeholder="Additional details about the medical record..."
              value={formData.notes}
              onChangeText={text => setFormData({...formData, notes: text})}
              multiline
              numberOfLines={5}
              style={styles.textArea}
            />
          </View>
          <Text style={styles.helperText}>
            Include diagnosis, treatment, medications, or any other relevant information
          </Text>
        </View>

        {(formData.type === 'vaccination' || formData.type === 'checkup') && (
          <View style={styles.section}>
            <Input
              label="Next Appointment"
              placeholder="YYYY-MM-DD (optional)"
              value={formData.nextAppointment}
              onChangeText={text =>
                setFormData({...formData, nextAppointment: text})
              }
              leftIcon="calendar-clock"
            />
            <Text style={styles.helperText}>
              When is the next vaccination/checkup due?
            </Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.label}>Attachments</Text>
          <TouchableOpacity style={styles.attachmentButton}>
            <Icon name="paperclip" size={20} color={colors.primary} />
            <Text style={styles.attachmentButtonText}>
              Add Photos or Documents
            </Text>
          </TouchableOpacity>
          <Text style={styles.helperText}>
            Attach reports, prescriptions, or images
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Cancel"
            onPress={() => navigation.goBack()}
            variant="outline"
            fullWidth
            style={styles.cancelButton}
          />
          <Button
            title="Update Record"
            onPress={handleSubmit}
            loading={loading}
            fullWidth
            style={styles.saveButton}
          />
        </View>

        <View style={styles.deleteSection}>
          <Button
            title="Delete Record"
            onPress={handleDelete}
            loading={deleting}
            variant="outline"
            fullWidth
            style={styles.deleteButton}
            leftIcon="delete"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  typeCard: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
  },
  typeCardActive: {
    borderWidth: 2,
  },
  typeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  typeLabel: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  label: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  textAreaContainer: {
    minHeight: 120,
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
    paddingTop: spacing.md,
  },
  helperText: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    lineHeight: typography.lineHeight.sm,
  },
  errorText: {
    fontSize: typography.fontSize.sm,
    color: colors.error,
    marginTop: spacing.xs,
  },
  attachmentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    backgroundColor: colors.primary + '10',
  },
  attachmentButtonText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.primary,
    marginLeft: spacing.sm,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  cancelButton: {
    flex: 1,
  },
  saveButton: {
    flex: 1,
  },
  deleteSection: {
    marginTop: spacing.xl,
    paddingTop: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  deleteButton: {
    borderColor: colors.error,
  },
});

export default EditMedicalRecordScreen;
