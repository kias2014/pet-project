import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {colors} from '@theme/colors';
import {spacing} from '@theme/spacing';
import {typography} from '@theme/typography';

interface PlaceholderScreenProps {
  title: string;
  description?: string;
}

const PlaceholderScreen: React.FC<PlaceholderScreenProps> = ({
  title,
  description,
}) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>🚧</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Coming Soon</Text>
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
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  iconContainer: {
    marginBottom: spacing.lg,
  },
  icon: {
    fontSize: 80,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    maxWidth: '80%',
    marginBottom: spacing.lg,
  },
  badge: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    marginTop: spacing.lg,
  },
  badgeText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.primary,
  },
});

export default PlaceholderScreen;
