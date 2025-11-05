import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {colors} from '@theme/colors';
import {spacing} from '@theme/spacing';
import {typography} from '@theme/typography';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const buttonStyles = [
    styles.button,
    styles[`button_${variant}`],
    styles[`button_${size}`],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`text_${variant}`],
    styles[`text_${size}`],
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}>
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' ? colors.primary : colors.white}
        />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  // Variants
  button_primary: {
    backgroundColor: colors.primary,
  },
  button_secondary: {
    backgroundColor: colors.secondary,
  },
  button_outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  button_ghost: {
    backgroundColor: 'transparent',
  },
  // Sizes
  button_small: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    minHeight: 36,
  },
  button_medium: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    minHeight: 44,
  },
  button_large: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    minHeight: 52,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  // Text styles
  text: {
    fontWeight: typography.fontWeight.semiBold,
  },
  text_primary: {
    color: colors.white,
  },
  text_secondary: {
    color: colors.white,
  },
  text_outline: {
    color: colors.primary,
  },
  text_ghost: {
    color: colors.primary,
  },
  text_small: {
    fontSize: typography.fontSize.sm,
  },
  text_medium: {
    fontSize: typography.fontSize.md,
  },
  text_large: {
    fontSize: typography.fontSize.lg,
  },
});

export default Button;
