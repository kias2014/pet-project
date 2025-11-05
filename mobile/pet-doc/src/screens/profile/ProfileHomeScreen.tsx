import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProfileStackParamList} from '@navigation/types';
import {Avatar} from '@components/common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '@theme/colors';
import {spacing} from '@theme/spacing';
import {typography} from '@theme/typography';
import {useSelector} from 'react-redux';
import {RootState} from '@store/store';

type Props = NativeStackScreenProps<ProfileStackParamList, 'ProfileHome'>;

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  screen?: keyof ProfileStackParamList;
  onPress?: () => void;
  badge?: string | number;
  color?: string;
}

const ProfileHomeScreen: React.FC<Props> = ({navigation}) => {
  // Mock user data - in real app, this would come from Redux
  const user = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    avatar: 'https://via.placeholder.com/100',
    memberSince: '2024-01',
  };

  // Mock stats
  const stats = {
    pets: 3,
    appointments: 5,
    orders: 12,
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement logout logic
            console.log('User logged out');
          },
        },
      ]
    );
  };

  const menuSections: {title: string; items: MenuItem[]}[] = [
    {
      title: 'My Account',
      items: [
        {
          id: 'my-pets',
          title: 'My Pets',
          icon: 'paw',
          screen: 'MyPets',
          badge: stats.pets,
          color: colors.primary,
        },
        {
          id: 'my-appointments',
          title: 'My Appointments',
          icon: 'calendar-check',
          screen: 'MyAppointments',
          badge: stats.appointments,
          color: colors.secondary,
        },
        {
          id: 'my-orders',
          title: 'My Orders',
          icon: 'package-variant',
          screen: 'MyOrders',
          badge: stats.orders,
          color: colors.warning,
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          id: 'saved-addresses',
          title: 'Saved Addresses',
          icon: 'map-marker',
          screen: 'SavedAddresses',
          color: colors.info,
        },
        {
          id: 'payment-methods',
          title: 'Payment Methods',
          icon: 'credit-card',
          screen: 'PaymentMethods',
          color: colors.success,
        },
        {
          id: 'settings',
          title: 'Settings',
          icon: 'cog',
          screen: 'Settings',
          color: colors.textSecondary,
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          id: 'help-support',
          title: 'Help & Support',
          icon: 'help-circle',
          screen: 'HelpSupport',
          color: colors.primary,
        },
        {
          id: 'about',
          title: 'About',
          icon: 'information',
          screen: 'About',
          color: colors.textSecondary,
        },
      ],
    },
    {
      title: 'Account Actions',
      items: [
        {
          id: 'logout',
          title: 'Logout',
          icon: 'logout',
          onPress: handleLogout,
          color: colors.error,
        },
      ],
    },
  ];

  const handleMenuPress = (item: MenuItem) => {
    if (item.onPress) {
      item.onPress();
    } else if (item.screen) {
      navigation.navigate(item.screen as any);
    }
  };

  const renderMenuItem = (item: MenuItem) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={() => handleMenuPress(item)}>
      <View style={styles.menuItemLeft}>
        <View
          style={[
            styles.menuItemIcon,
            {backgroundColor: (item.color || colors.primary) + '20'},
          ]}>
          <Icon
            name={item.icon}
            size={24}
            color={item.color || colors.primary}
          />
        </View>
        <Text style={styles.menuItemTitle}>{item.title}</Text>
      </View>
      <View style={styles.menuItemRight}>
        {item.badge !== undefined && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
        )}
        <Icon name="chevron-right" size={24} color={colors.textSecondary} />
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <Avatar source={user.avatar} name={user.name} size={80} />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
            <Text style={styles.phone}>{user.phone}</Text>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('EditProfile')}>
            <Icon name="pencil" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Member Badge */}
        <View style={styles.memberBadge}>
          <Icon name="shield-star" size={16} color={colors.warning} />
          <Text style={styles.memberText}>
            Member since {new Date(user.memberSince).toLocaleDateString('en-US', {month: 'short', year: 'numeric'})}
          </Text>
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Icon name="paw" size={28} color={colors.primary} />
          <Text style={styles.statValue}>{stats.pets}</Text>
          <Text style={styles.statLabel}>Pets</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="calendar-check" size={28} color={colors.secondary} />
          <Text style={styles.statValue}>{stats.appointments}</Text>
          <Text style={styles.statLabel}>Appointments</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="package-variant" size={28} color={colors.warning} />
          <Text style={styles.statValue}>{stats.orders}</Text>
          <Text style={styles.statLabel}>Orders</Text>
        </View>
      </View>

      {/* Menu Sections */}
      {menuSections.map((section, index) => (
        <View key={section.title} style={styles.menuSection}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.menuCard}>
            {section.items.map((item, itemIndex) => (
              <View key={item.id}>
                {renderMenuItem(item)}
                {itemIndex < section.items.length - 1 && (
                  <View style={styles.divider} />
                )}
              </View>
            ))}
          </View>
        </View>
      ))}

      {/* App Version */}
      <View style={styles.footer}>
        <Text style={styles.versionText}>Pet Doc App v1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  profileInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  name: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xxs,
  },
  email: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xxs,
  },
  phone: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.warning + '10',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  memberText: {
    fontSize: typography.fontSize.xs,
    color: colors.warning,
    fontWeight: typography.fontWeight.medium,
    marginLeft: spacing.xs,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: spacing.lg,
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statValue: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginTop: spacing.xs,
  },
  statLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginTop: spacing.xxs,
  },
  menuSection: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    marginHorizontal: spacing.lg,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  menuCard: {
    backgroundColor: colors.white,
    marginHorizontal: spacing.lg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemTitle: {
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
    marginLeft: spacing.md,
    fontWeight: typography.fontWeight.medium,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  badge: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    paddingHorizontal: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: typography.fontSize.xs,
    color: colors.white,
    fontWeight: typography.fontWeight.bold,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 64,
  },
  footer: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  versionText: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
});

export default ProfileHomeScreen;
