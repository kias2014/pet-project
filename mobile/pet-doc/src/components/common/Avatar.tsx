import React from 'react';
import {View, Image, Text, StyleSheet, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '@theme/colors';
import {typography} from '@theme/typography';

interface AvatarProps {
  source?: string;
  name?: string;
  size?: number;
  style?: ViewStyle;
  icon?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  source,
  name,
  size = 40,
  style,
  icon = 'account',
}) => {
  const initials = name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const avatarStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  if (source) {
    return (
      <Image
        source={{uri: source}}
        style={[styles.avatar, avatarStyle, style]}
      />
    );
  }

  return (
    <View style={[styles.avatar, styles.placeholder, avatarStyle, style]}>
      {initials ? (
        <Text style={[styles.initials, {fontSize: size * 0.4}]}>{initials}</Text>
      ) : (
        <Icon name={icon} size={size * 0.6} color={colors.white} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    overflow: 'hidden',
  },
  placeholder: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: colors.white,
    fontWeight: typography.fontWeight.bold,
  },
});

export default Avatar;
