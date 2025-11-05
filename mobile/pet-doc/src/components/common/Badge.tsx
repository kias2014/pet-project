import React from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import {colors} from '@theme/colors';
import {spacing} from '@theme/spacing';
import {typography} from '@theme/typography';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  style?: ViewStyle;
}

const Badge: React.FC<BadgeProps> = ({label, variant = 'primary', style}) => {
  return (
    <View style={[styles.badge, styles[`badge_${variant}`], style]}>
      <Text style={[styles.text, styles[`text_${variant}`]]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  badge_primary: {
    backgroundColor: colors.primary + '20',
  },
  badge_success: {
    backgroundColor: colors.successLight,
  },
  badge_warning: {
    backgroundColor: colors.warningLight,
  },
  badge_error: {
    backgroundColor: colors.errorLight,
  },
  badge_info: {
    backgroundColor: colors.infoLight,
  },
  text: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semiBold,
  },
  text_primary: {
    color: colors.primary,
  },
  text_success: {
    color: colors.success,
  },
  text_warning: {
    color: colors.warning,
  },
  text_error: {
    color: colors.error,
  },
  text_info: {
    color: colors.info,
  },
});

export default Badge;
