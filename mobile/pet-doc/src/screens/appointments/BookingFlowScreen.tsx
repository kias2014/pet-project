import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ServicesStackParamList} from '@navigation/types';
import {useAppSelector, useAppDispatch} from '@store/store';
import {addAppointment} from '@store/slices/appointmentSlice';
import {Card, Avatar, Button, Input} from '@components/common';
import {colors} from '@theme/colors';
import {spacing} from '@theme/spacing';
import {typography} from '@theme/typography';

type Props = NativeStackScreenProps<ServicesStackParamList, 'BookingFlow'>;

type Step = 1 | 2 | 3 | 4;

const BookingFlowScreen: React.FC<Props> = ({navigation, route}) => {
  const {vendorId, serviceId} = route.params;
  const dispatch = useAppDispatch();
  const {pets} = useAppSelector(state => state.pet);

  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [selectedPet, setSelectedPet] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [notes, setNotes] = useState('');

  // Mock data
  const service = {
    id: serviceId,
    name: 'General Checkup',
    price: 500,
    duration: 30,
  };

  const vendor = {
    id: vendorId,
    name: 'Dr. Sarah Johnson',
    photo: 'https://via.placeholder.com/60',
  };

  // Generate calendar dates (current month)
  const generateCalendarDates = () => {
    const today = new Date();
    const dates = [];
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  // Generate time slots
  const timeSlots = [
    {id: '1', time: '09:00 AM', available: true},
    {id: '2', time: '10:00 AM', available: true},
    {id: '3', time: '11:00 AM', available: false},
    {id: '4', time: '12:00 PM', available: true},
    {id: '5', time: '02:00 PM', available: true},
    {id: '6', time: '03:00 PM', available: true},
    {id: '7', time: '04:00 PM', available: false},
    {id: '8', time: '05:00 PM', available: true},
  ];

  const calendarDates = generateCalendarDates();

  const handleNext = () => {
    if (currentStep === 1 && !selectedPet) {
      Alert.alert('Error', 'Please select a pet');
      return;
    }
    if (currentStep === 2 && !selectedDate) {
      Alert.alert('Error', 'Please select a date');
      return;
    }
    if (currentStep === 3 && !selectedTimeSlot) {
      Alert.alert('Error', 'Please select a time slot');
      return;
    }

    if (currentStep < 4) {
      setCurrentStep((currentStep + 1) as Step);
    } else {
      handleConfirmBooking();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step);
    } else {
      navigation.goBack();
    }
  };

  const handleConfirmBooking = () => {
    const selectedPetData = pets.find(p => p.id === selectedPet);
    
    const newAppointment = {
      id: Date.now().toString(),
      userId: 'current-user-id',
      vendorId: vendor.id,
      petId: selectedPet,
      serviceId: service.id,
      date: selectedDate.toISOString().split('T')[0],
      startTime: selectedTimeSlot,
      endTime: '',
      status: 'pending' as const,
      notes,
      vendor: {
        id: vendor.id,
        name: vendor.name,
        type: 'Veterinary',
        description: '',
        photo: vendor.photo,
        rating: 4.9,
        reviewCount: 234,
        address: '',
        city: '',
        state: '',
        phone: '',
        email: '',
        isVerified: true,
        services: [],
        createdAt: '',
      },
      pet: selectedPetData!,
      service: {
        id: service.id,
        vendorId: vendor.id,
        name: service.name,
        description: '',
        price: service.price,
        duration: service.duration,
        category: '',
      },
      createdAt: new Date().toISOString(),
    };

    dispatch(addAppointment(newAppointment));

    navigation.navigate('BookingConfirmation', {
      appointmentId: newAppointment.id,
    });
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {[1, 2, 3, 4].map(step => (
        <View key={step} style={styles.stepItem}>
          <View
            style={[
              styles.stepCircle,
              currentStep >= step && styles.stepCircleActive,
            ]}>
            <Text
              style={[
                styles.stepNumber,
                currentStep >= step && styles.stepNumberActive,
              ]}>
              {step}
            </Text>
          </View>
          {step < 4 && (
            <View
              style={[
                styles.stepLine,
                currentStep > step && styles.stepLineActive,
              ]}
            />
          )}
        </View>
      ))}
    </View>
  );

  const renderStep1 = () => (
    <View>
      <Text style={styles.stepTitle}>Select Your Pet</Text>
      <Text style={styles.stepSubtitle}>
        Choose which pet needs this service
      </Text>
      {pets.map(pet => (
        <Card
          key={pet.id}
          style={[
            styles.petCard,
            selectedPet === pet.id && styles.petCardSelected,
          ]}
          onPress={() => setSelectedPet(pet.id)}>
          <View style={styles.petContent}>
            <Avatar source={pet.photo} name={pet.name} size={50} />
            <View style={styles.petInfo}>
              <Text style={styles.petName}>{pet.name}</Text>
              <Text style={styles.petMeta}>
                {pet.species} • {pet.breed}
              </Text>
            </View>
            {selectedPet === pet.id && (
              <Icon name="check-circle" size={24} color={colors.primary} />
            )}
          </View>
        </Card>
      ))}
    </View>
  );

  const renderStep2 = () => (
    <View>
      <Text style={styles.stepTitle}>Select Date</Text>
      <Text style={styles.stepSubtitle}>Choose your preferred date</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.calendarRow}>
          {calendarDates.map((date, index) => {
            const isSelected =
              selectedDate.toDateString() === date.toDateString();
            const isToday = new Date().toDateString() === date.toDateString();

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dateCard,
                  isSelected && styles.dateCardSelected,
                ]}
                onPress={() => setSelectedDate(date)}>
                <Text
                  style={[
                    styles.dateDay,
                    isSelected && styles.dateDaySelected,
                  ]}>
                  {date.toLocaleDateString('en-US', {weekday: 'short'})}
                </Text>
                <Text
                  style={[
                    styles.dateNumber,
                    isSelected && styles.dateNumberSelected,
                  ]}>
                  {date.getDate()}
                </Text>
                <Text
                  style={[
                    styles.dateMonth,
                    isSelected && styles.dateMonthSelected,
                  ]}>
                  {date.toLocaleDateString('en-US', {month: 'short'})}
                </Text>
                {isToday && !isSelected && (
                  <View style={styles.todayDot} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );

  const renderStep3 = () => (
    <View>
      <Text style={styles.stepTitle}>Select Time Slot</Text>
      <Text style={styles.stepSubtitle}>
        Available slots for {selectedDate.toLocaleDateString()}
      </Text>
      <View style={styles.timeSlotsGrid}>
        {timeSlots.map(slot => (
          <TouchableOpacity
            key={slot.id}
            style={[
              styles.timeSlot,
              selectedTimeSlot === slot.time && styles.timeSlotSelected,
              !slot.available && styles.timeSlotDisabled,
            ]}
            onPress={() => slot.available && setSelectedTimeSlot(slot.time)}
            disabled={!slot.available}>
            <Icon
              name="clock-outline"
              size={18}
              color={
                selectedTimeSlot === slot.time
                  ? colors.white
                  : !slot.available
                  ? colors.textTertiary
                  : colors.primary
              }
            />
            <Text
              style={[
                styles.timeSlotText,
                selectedTimeSlot === slot.time && styles.timeSlotTextSelected,
                !slot.available && styles.timeSlotTextDisabled,
              ]}>
              {slot.time}
            </Text>
            {!slot.available && (
              <Text style={styles.unavailableText}>Booked</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep4 = () => {
    const selectedPetData = pets.find(p => p.id === selectedPet);

    return (
      <View>
        <Text style={styles.stepTitle}>Review & Confirm</Text>
        <Text style={styles.stepSubtitle}>
          Please review your booking details
        </Text>

        <Card style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Booking Summary</Text>

          <View style={styles.summaryRow}>
            <Icon name="paw" size={20} color={colors.textSecondary} />
            <Text style={styles.summaryLabel}>Pet:</Text>
            <Text style={styles.summaryValue}>{selectedPetData?.name}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Icon name="briefcase" size={20} color={colors.textSecondary} />
            <Text style={styles.summaryLabel}>Service:</Text>
            <Text style={styles.summaryValue}>{service.name}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Icon name="calendar" size={20} color={colors.textSecondary} />
            <Text style={styles.summaryLabel}>Date:</Text>
            <Text style={styles.summaryValue}>
              {selectedDate.toLocaleDateString()}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Icon name="clock-outline" size={20} color={colors.textSecondary} />
            <Text style={styles.summaryLabel}>Time:</Text>
            <Text style={styles.summaryValue}>{selectedTimeSlot}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Icon name="timer" size={20} color={colors.textSecondary} />
            <Text style={styles.summaryLabel}>Duration:</Text>
            <Text style={styles.summaryValue}>{service.duration} min</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryRow}>
            <Icon name="cash" size={20} color={colors.primary} />
            <Text style={styles.summaryLabel}>Total:</Text>
            <Text style={styles.summaryPrice}>₹{service.price}</Text>
          </View>
        </Card>

        <Card style={styles.notesCard}>
          <Text style={styles.notesTitle}>Additional Notes (Optional)</Text>
          <Input
            placeholder="Add any special instructions or concerns..."
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={4}
            style={styles.notesInput}
          />
        </Card>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderStepIndicator()}

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}

        <View style={styles.bottomSpacing} />
      </ScrollView>

      <View style={styles.bottomBar}>
        <Button
          title="Back"
          onPress={handleBack}
          variant="outline"
          style={styles.backButton}
        />
        <Button
          title={currentStep === 4 ? 'Confirm Booking' : 'Next'}
          onPress={handleNext}
          style={styles.nextButton}
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
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.surface,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.backgroundTertiary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  },
  stepCircleActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  stepNumber: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textSecondary,
  },
  stepNumberActive: {
    color: colors.white,
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: colors.border,
    marginHorizontal: spacing.xs / 2,
  },
  stepLineActive: {
    backgroundColor: colors.primary,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.lg,
  },
  stepTitle: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  stepSubtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  petCard: {
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  petCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
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
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
  },
  petMeta: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs / 2,
  },
  calendarRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  dateCard: {
    width: 80,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  },
  dateCardSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dateDay: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.medium,
  },
  dateDaySelected: {
    color: colors.white,
  },
  dateNumber: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginVertical: spacing.xs / 2,
  },
  dateNumberSelected: {
    color: colors.white,
  },
  dateMonth: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
  dateMonthSelected: {
    color: colors.white,
  },
  todayDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
    marginTop: spacing.xs / 2,
  },
  timeSlotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  timeSlot: {
    width: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  timeSlotSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  timeSlotDisabled: {
    backgroundColor: colors.backgroundTertiary,
    opacity: 0.6,
  },
  timeSlotText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
  },
  timeSlotTextSelected: {
    color: colors.white,
  },
  timeSlotTextDisabled: {
    color: colors.textTertiary,
  },
  unavailableText: {
    fontSize: typography.fontSize.xs,
    color: colors.error,
    position: 'absolute',
    bottom: spacing.xs / 2,
  },
  summaryCard: {
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  summaryTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  summaryLabel: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
    flex: 1,
  },
  summaryValue: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  summaryPrice: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  notesCard: {
    padding: spacing.lg,
  },
  notesTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  notesInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  bottomSpacing: {
    height: spacing.xl,
  },
  bottomBar: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  backButton: {
    flex: 1,
  },
  nextButton: {
    flex: 2,
  },
});

export default BookingFlowScreen;
