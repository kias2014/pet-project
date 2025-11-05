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
import {useAppDispatch} from '@store/store';
import {addPet} from '@store/slices/petSlice';
import {Button, Input, Card} from '@components/common';
import {colors} from '@theme/colors';
import {spacing} from '@theme/spacing';
import {typography} from '@theme/typography';
import {PET_SPECIES} from '@constants/index';

type Props = NativeStackScreenProps<ProfileStackParamList, 'AddPet'>;

const AddPetScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    birthDate: '',
    gender: 'male' as 'male' | 'female',
    weight: '',
    color: '',
    photo: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Pet name is required';
    }

    if (!formData.species) {
      newErrors.species = 'Please select a species';
    }

    if (formData.age && isNaN(Number(formData.age))) {
      newErrors.age = 'Age must be a number';
    }

    if (formData.weight && isNaN(Number(formData.weight))) {
      newErrors.weight = 'Weight must be a number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // TODO: Call API to create pet
      const newPet = {
        id: Date.now().toString(),
        userId: 'current-user-id',
        name: formData.name,
        species: formData.species,
        breed: formData.breed || undefined,
        age: formData.age ? Number(formData.age) : undefined,
        birthDate: formData.birthDate || undefined,
        gender: formData.gender,
        weight: formData.weight ? Number(formData.weight) : undefined,
        color: formData.color || undefined,
        photo: formData.photo || undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      dispatch(addPet(newPet));

      Alert.alert(
        'Success',
        `${formData.name} has been added successfully!`,
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to add pet. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoSelect = () => {
    // TODO: Implement image picker
    Alert.alert('Photo Upload', 'Image picker will be implemented here');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Photo Upload */}
        <View style={styles.photoSection}>
          <TouchableOpacity
            style={styles.photoContainer}
            onPress={handlePhotoSelect}>
            {formData.photo ? (
              <Image source={{uri: formData.photo}} style={styles.photo} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Icon name="camera-plus" size={40} color={colors.primary} />
                <Text style={styles.photoText}>Add Photo</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Basic Information */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>

          <Input
            label="Pet Name *"
            placeholder="Enter your pet's name"
            value={formData.name}
            onChangeText={(text) => setFormData({...formData, name: text})}
            error={errors.name}
            leftIcon="paw"
          />

          <Text style={styles.label}>Species *</Text>
          <View style={styles.speciesGrid}>
            {PET_SPECIES.map((species) => (
              <TouchableOpacity
                key={species.value}
                style={[
                  styles.speciesOption,
                  formData.species === species.value && styles.speciesOptionSelected,
                ]}
                onPress={() => setFormData({...formData, species: species.value})}>
                <Text
                  style={[
                    styles.speciesLabel,
                    formData.species === species.value && styles.speciesLabelSelected,
                  ]}>
                  {species.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {errors.species && <Text style={styles.errorText}>{errors.species}</Text>}

          <Input
            label="Breed"
            placeholder="Enter breed (e.g., Labrador, Persian)"
            value={formData.breed}
            onChangeText={(text) => setFormData({...formData, breed: text})}
            leftIcon="dog"
          />

          <Text style={styles.label}>Gender</Text>
          <View style={styles.genderRow}>
            <TouchableOpacity
              style={[
                styles.genderOption,
                formData.gender === 'male' && styles.genderOptionSelected,
              ]}
              onPress={() => setFormData({...formData, gender: 'male'})}>
              <Icon
                name="gender-male"
                size={24}
                color={formData.gender === 'male' ? colors.white : colors.primary}
              />
              <Text
                style={[
                  styles.genderLabel,
                  formData.gender === 'male' && styles.genderLabelSelected,
                ]}>
                Male
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.genderOption,
                formData.gender === 'female' && styles.genderOptionSelected,
              ]}
              onPress={() => setFormData({...formData, gender: 'female'})}>
              <Icon
                name="gender-female"
                size={24}
                color={formData.gender === 'female' ? colors.white : colors.error}
              />
              <Text
                style={[
                  styles.genderLabel,
                  formData.gender === 'female' && styles.genderLabelSelected,
                ]}>
                Female
              </Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Additional Details */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Details</Text>

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Input
                label="Age (years)"
                placeholder="Age"
                value={formData.age}
                onChangeText={(text) => setFormData({...formData, age: text})}
                keyboardType="numeric"
                error={errors.age}
                leftIcon="calendar"
              />
            </View>
            <View style={styles.halfInput}>
              <Input
                label="Weight (kg)"
                placeholder="Weight"
                value={formData.weight}
                onChangeText={(text) => setFormData({...formData, weight: text})}
                keyboardType="numeric"
                error={errors.weight}
                leftIcon="weight"
              />
            </View>
          </View>

          <Input
            label="Color/Markings"
            placeholder="e.g., Brown with white spots"
            value={formData.color}
            onChangeText={(text) => setFormData({...formData, color: text})}
            leftIcon="palette"
          />

          <Input
            label="Birth Date"
            placeholder="YYYY-MM-DD"
            value={formData.birthDate}
            onChangeText={(text) => setFormData({...formData, birthDate: text})}
            leftIcon="cake-variant"
          />
        </Card>

        {/* Buttons */}
        <View style={styles.buttons}>
          <Button
            title="Cancel"
            onPress={() => navigation.goBack()}
            variant="outline"
            style={styles.cancelButton}
          />
          <Button
            title="Add Pet"
            onPress={handleSubmit}
            loading={loading}
            style={styles.submitButton}
          />
        </View>

        <View style={styles.bottomSpacing} />
      </View>
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
  photoSection: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  photoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  photoPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.backgroundTertiary,
    borderWidth: 2,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoText: {
    marginTop: spacing.xs,
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: typography.fontWeight.medium,
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
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  speciesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  speciesOption: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  speciesOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '20',
  },
  speciesLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.textPrimary,
    fontWeight: typography.fontWeight.medium,
  },
  speciesLabelSelected: {
    color: colors.primary,
  },
  genderRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  genderOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    gap: spacing.sm,
  },
  genderOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  genderLabel: {
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
    fontWeight: typography.fontWeight.medium,
  },
  genderLabelSelected: {
    color: colors.white,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  halfInput: {
    flex: 1,
  },
  errorText: {
    fontSize: typography.fontSize.xs,
    color: colors.error,
    marginTop: -spacing.sm,
    marginBottom: spacing.md,
  },
  buttons: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  cancelButton: {
    flex: 1,
  },
  submitButton: {
    flex: 1,
  },
  bottomSpacing: {
    height: spacing.xl,
  },
});

export default AddPetScreen;
