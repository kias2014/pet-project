import React from 'react';
import {View, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {colors} from '@theme/colors';
import {spacing} from '@theme/spacing';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  padding?: keyof typeof spacing;
}

const Card: React.FC<CardProps> = ({
  children,
  onPress,
  style,
  padding = 'md',
}) => {
  const cardStyle = [
    styles.card,
    {padding: spacing[padding]},
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyle}
        onPress={onPress}
        activeOpacity={0.7}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default Card;
