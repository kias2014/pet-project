import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '@theme/colors';
import {spacing} from '@theme/spacing';
import {typography} from '@theme/typography';
import Button from './Button';

interface EmptyStateProps {
  icon: string;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <View style={styles.container}>
      <Icon name={icon} size={64} color={colors.textTertiary} />
      <Text style={styles.title}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
      {actionLabel && onAction && (
        <Button
          title={actionLabel}
          onPress={onAction}
          variant="primary"
          style={styles.button}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
  description: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    textAlign: 'center',
    maxWidth: '80%',
  },
  button: {
    marginTop: spacing.lg,
  },
});

export default EmptyState;
