import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '@navigation/types';
import {Button, Input} from '@components/common';
import {colors} from '@theme/colors';
import {spacing} from '@theme/spacing';
import {typography} from '@theme/typography';

type Props = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

const ForgotPasswordScreen: React.FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = () => {
    // TODO: Implement send OTP logic
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('OTPVerification', {
        email,
        type: 'password-reset',
      });
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subtitle}>
          Enter your email and we'll send you a verification code
        </Text>
      </View>

      <Input
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        leftIcon="email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Button
        title="Send Verification Code"
        onPress={handleSendOTP}
        loading={loading}
        fullWidth
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
    lineHeight: typography.lineHeight.lg,
  },
});

export default ForgotPasswordScreen;
