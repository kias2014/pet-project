import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '@navigation/types';
import {Button, Input} from '@components/common';
import {colors} from '@theme/colors';
import {spacing} from '@theme/spacing';
import {typography} from '@theme/typography';

type Props = NativeStackScreenProps<AuthStackParamList, 'OTPVerification'>;

const OTPVerificationScreen: React.FC<Props> = ({navigation, route}) => {
  const {email, type} = route.params;
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = () => {
    // TODO: Implement OTP verification logic
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (type === 'password-reset') {
        navigation.navigate('ResetPassword', {token: otp});
      }
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Enter Verification Code</Text>
        <Text style={styles.subtitle}>
          We've sent a code to {email}
        </Text>
      </View>

      <Input
        label="Verification Code"
        placeholder="Enter 6-digit code"
        value={otp}
        onChangeText={setOtp}
        leftIcon="lock"
        keyboardType="number-pad"
        maxLength={6}
      />

      <Button
        title="Verify"
        onPress={handleVerify}
        loading={loading}
        fullWidth
      />

      <Button
        title="Resend Code"
        onPress={() => {}}
        variant="ghost"
        fullWidth
        style={styles.resendButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  header: {
    marginVertical: spacing.xl,
  },
  title: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
  resendButton: {
    marginTop: spacing.md,
  },
});

export default OTPVerificationScreen;
