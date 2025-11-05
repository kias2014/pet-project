import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ProfileStackParamList} from '@navigation/types';
import {useAppSelector, useAppDispatch} from '@store/store';
import {fetchPetsStart} from '@store/slices/petSlice';
import {Card, Avatar, EmptyState, Loading} from '@components/common';
import {colors} from '@theme/colors';
import {spacing} from '@theme/spacing';
import {typography} from '@theme/typography';
import {Pet} from '@types/index';

type Props = NativeStackScreenProps<ProfileStackParamList, 'MyPets'>;

const MyPetsScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {pets, isLoading} = useAppSelector(state => state.pet);

  useEffect(() => {
    dispatch(fetchPetsStart());
  }, [dispatch]);

  const renderPetCard = ({item}: {item: Pet}) => (
    <Card
      style={styles.petCard}
      onPress={() => navigation.navigate('PetDetail', {petId: item.id})}>
      <View style={styles.petContent}>
        <Avatar source={item.photo} name={item.name} size={60} />
        <View style={styles.petInfo}>
          <Text style={styles.petName}>{item.name}</Text>
          <View style={styles.petMeta}>
            <Icon name="paw" size={14} color={colors.textSecondary} />
            <Text style={styles.petSpecies}>{item.species}</Text>
            {item.breed && (
              <>
                <Text style={styles.separator}>•</Text>
                <Text style={styles.petBreed}>{item.breed}</Text>
              </>
            )}
          </View>
          <View style={styles.petDetails}>
            {item.age && (
              <View style={styles.detailItem}>
                <Icon name="calendar" size={14} color={colors.textTertiary} />
                <Text style={styles.detailText}>{item.age} years</Text>
              </View>
            )}
            {item.weight && (
              <View style={styles.detailItem}>
                <Icon name="weight" size={14} color={colors.textTertiary} />
                <Text style={styles.detailText}>{item.weight} kg</Text>
              </View>
            )}
            <View style={styles.detailItem}>
              <Icon
                name={item.gender === 'male' ? 'gender-male' : 'gender-female'}
                size={14}
                color={item.gender === 'male' ? colors.primary : colors.error}
              />
              <Text style={styles.detailText}>
                {item.gender === 'male' ? 'Male' : 'Female'}
              </Text>
            </View>
          </View>
        </View>
        <Icon name="chevron-right" size={24} color={colors.textTertiary} />
      </View>
    </Card>
  );

  if (isLoading) {
    return <Loading message="Loading your pets..." />;
  }

  if (pets.length === 0) {
    return (
      <EmptyState
        icon="paw-off"
        title="No Pets Yet"
        description="Add your first pet to get started with personalized care"
        actionLabel="Add Pet"
        onAction={() => navigation.navigate('AddPet')}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={pets}
        renderItem={renderPetCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddPet')}>
        <Icon name="plus" size={24} color={colors.white} />
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
    padding: spacing.lg,
  },
  petCard: {
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  petContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  petInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  petName: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.xs / 2,
  },
  petMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  petSpecies: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginLeft: spacing.xs / 2,
  },
  separator: {
    fontSize: typography.fontSize.sm,
    color: colors.textTertiary,
    marginHorizontal: spacing.xs,
  },
  petBreed: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  petDetails: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs / 2,
  },
  detailText: {
    fontSize: typography.fontSize.xs,
    color: colors.textTertiary,
  },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default MyPetsScreen;
