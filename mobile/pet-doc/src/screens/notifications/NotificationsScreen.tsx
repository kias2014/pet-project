import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '@theme/colors';
import {spacing} from '@theme/spacing';
import {typography} from '@theme/typography';

interface Notification {
  id: string;
  type: 'appointment' | 'health' | 'promotion' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionData?: {
    screen: string;
    params?: any;
  };
}

type Filter = 'all' | 'unread';

const NotificationsScreen = () => {
  const [filter, setFilter] = useState<Filter>('all');
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'appointment',
      title: 'Appointment Reminder',
      message: 'Your appointment with Happy Paws Veterinary Clinic is tomorrow at 10:00 AM',
      timestamp: '2024-11-09T10:00:00',
      read: false,
    },
    {
      id: '2',
      type: 'health',
      title: 'Vaccination Due',
      message: 'Max is due for rabies vaccination. Book an appointment soon.',
      timestamp: '2024-11-08T09:30:00',
      read: false,
    },
    {
      id: '3',
      type: 'promotion',
      title: '20% Off Grooming Services',
      message: 'Special offer this week! Get 20% off on all grooming services.',
      timestamp: '2024-11-07T14:00:00',
      read: true,
    },
    {
      id: '4',
      type: 'appointment',
      title: 'Appointment Confirmed',
      message: 'Your grooming appointment has been confirmed for Nov 12 at 2:00 PM',
      timestamp: '2024-11-06T16:20:00',
      read: true,
    },
    {
      id: '5',
      type: 'system',
      title: 'Profile Updated',
      message: 'Your profile information has been successfully updated.',
      timestamp: '2024-11-05T11:15:00',
      read: true,
    },
    {
      id: '6',
      type: 'health',
      title: 'Medical Record Added',
      message: 'A new medical record has been added for Luna.',
      timestamp: '2024-11-04T08:45:00',
      read: true,
    },
  ]);

  const getIconName = (type: string): string => {
    switch (type) {
      case 'appointment':
        return 'calendar-check';
      case 'health':
        return 'heart-pulse';
      case 'promotion':
        return 'tag';
      case 'system':
        return 'information';
      default:
        return 'bell';
    }
  };

  const getIconColor = (type: string): string => {
    switch (type) {
      case 'appointment':
        return colors.primary;
      case 'health':
        return colors.error;
      case 'promotion':
        return colors.warning;
      case 'system':
        return colors.info;
      default:
        return colors.textSecondary;
    }
  };

  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // TODO: Fetch notifications from API
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleNotificationPress = (notification: Notification) => {
    // Mark as read
    setNotifications(prev =>
      prev.map(n => (n.id === notification.id ? {...n, read: true} : n))
    );

    // TODO: Navigate to appropriate screen if actionData exists
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({...n, read: true})));
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const renderNotification = ({item}: {item: Notification}) => (
    <TouchableOpacity
      style={[
        styles.notificationCard,
        !item.read && styles.notificationCardUnread,
      ]}
      onPress={() => handleNotificationPress(item)}>
      <View style={styles.notificationLeft}>
        <View
          style={[
            styles.iconContainer,
            {backgroundColor: getIconColor(item.type) + '20'},
          ]}>
          <Icon
            name={getIconName(item.type)}
            size={24}
            color={getIconColor(item.type)}
          />
        </View>
      </View>
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          {!item.read && <View style={styles.unreadDot} />}
        </View>
        <Text style={styles.notificationMessage} numberOfLines={2}>
          {item.message}
        </Text>
        <Text style={styles.timestamp}>{formatTimestamp(item.timestamp)}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Icon name="bell-outline" size={80} color={colors.border} />
      <Text style={styles.emptyTitle}>
        {filter === 'unread' ? 'No Unread Notifications' : 'No Notifications'}
      </Text>
      <Text style={styles.emptyDescription}>
        {filter === 'unread'
          ? 'You are all caught up!'
          : 'Notifications will appear here'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header with Filter and Actions */}
      <View style={styles.header}>
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === 'all' && styles.filterButtonActive,
            ]}
            onPress={() => setFilter('all')}>
            <Text
              style={[
                styles.filterText,
                filter === 'all' && styles.filterTextActive,
              ]}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === 'unread' && styles.filterButtonActive,
            ]}
            onPress={() => setFilter('unread')}>
            <Text
              style={[
                styles.filterText,
                filter === 'unread' && styles.filterTextActive,
              ]}>
              Unread {unreadCount > 0 && `(${unreadCount})`}
            </Text>
          </TouchableOpacity>
        </View>
        {unreadCount > 0 && (
          <TouchableOpacity
            style={styles.markAllButton}
            onPress={handleMarkAllAsRead}>
            <Text style={styles.markAllText}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Notifications List */}
      <FlatList
        data={filteredNotifications}
        renderItem={renderNotification}
        keyExtractor={item => item.id}
        contentContainerStyle={[
          styles.listContent,
          filteredNotifications.length === 0 && styles.listContentEmpty,
        ]}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
    </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  filterButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.backgroundSecondary,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textSecondary,
  },
  filterTextActive: {
    color: colors.white,
  },
  markAllButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  markAllText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.primary,
  },
  listContent: {
    padding: spacing.lg,
  },
  listContentEmpty: {
    flexGrow: 1,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  notificationCardUnread: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    backgroundColor: colors.primary + '05',
  },
  notificationLeft: {
    marginRight: spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  notificationTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginLeft: spacing.sm,
  },
  notificationMessage: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.md,
    marginBottom: spacing.xs,
  },
  timestamp: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
  },
  emptyTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginTop: spacing.lg,
  },
  emptyDescription: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: typography.lineHeight.lg,
  },
});

export default NotificationsScreen;
