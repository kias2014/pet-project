import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '@navigation/types';
import {Button, Input} from '@components/common';
import {colors} from '@theme/colors';
import {spacing} from '@theme/spacing';
import {typography} from '@theme/typography';

type Props = NativeStackScreenProps<AuthStackParamList, 'ResetPassword'>;

const ResetPasswordScreen: React.FC<Props> = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = () => {
    // TODO: Implement password reset logic
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Login');
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>
          Create a new password for your account
        </Text>
      </View>

      <Input
        label="New Password"
        placeholder="Enter new password"
        value={password}
        onChangeText={setPassword}
        leftIcon="lock"
        secure
      />

      <Input
        label="Confirm Password"
        placeholder="Confirm new password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        leftIcon="lock"
        secure
      />

      <Button
        title="Reset Password"
        onPress={handleResetPassword}
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
  },
});

export default ResetPasswordScreen;
