import React from 'react';
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';
import {colors} from '@theme/colors';
import {spacing} from '@theme/spacing';
import {typography} from '@theme/typography';

interface LoadingProps {
  message?: string;
  size?: 'small' | 'large';
}

const Loading: React.FC<LoadingProps> = ({message, size = 'large'}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={colors.primary} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  message: {
    marginTop: spacing.md,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
});

export default Loading;
