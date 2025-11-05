import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '@navigation/types';
import {Button, Input} from '@components/common';
import {colors} from '@theme/colors';
import {spacing} from '@theme/spacing';
import {typography} from '@theme/typography';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

const SignupScreen: React.FC<Props> = ({navigation}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSignup = () => {
    // TODO: Implement signup logic
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>
        </View>

        <View style={styles.form}>
          <Input
            label="First Name"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChangeText={(text) => setFormData({...formData, firstName: text})}
            leftIcon="account"
          />

          <Input
            label="Last Name"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChangeText={(text) => setFormData({...formData, lastName: text})}
            leftIcon="account"
          />

          <Input
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={(text) => setFormData({...formData, email: text})}
            leftIcon="email"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="Phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChangeText={(text) => setFormData({...formData, phone: text})}
            leftIcon="phone"
            keyboardType="phone-pad"
          />

          <Input
            label="Password"
            placeholder="Create a password"
            value={formData.password}
            onChangeText={(text) => setFormData({...formData, password: text})}
            leftIcon="lock"
            secure
          />

          <Input
            label="Confirm Password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChangeText={(text) =>
              setFormData({...formData, confirmPassword: text})
            }
            leftIcon="lock"
            secure
          />

          <Button
            title="Sign Up"
            onPress={handleSignup}
            loading={loading}
            fullWidth
            style={styles.signupButton}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerLink}>Sign In</Text>
          </TouchableOpacity>
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
    flexGrow: 1,
    padding: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
  form: {
    flex: 1,
  },
  signupButton: {
    marginTop: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  footerText: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
  footerLink: {
    fontSize: typography.fontSize.md,
    color: colors.primary,
    fontWeight: typography.fontWeight.semiBold,
  },
});

export default SignupScreen;
