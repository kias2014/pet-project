import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Notification} from '@types/index';

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
}

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  isLoading: false,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    fetchNotificationsStart: state => {
      state.isLoading = true;
    },
    fetchNotificationsSuccess: (
      state,
      action: PayloadAction<Notification[]>
    ) => {
      state.notifications = action.payload;
      state.unreadCount = action.payload.filter(n => !n.isRead).length;
      state.isLoading = false;
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload);
      if (!action.payload.isRead) {
        state.unreadCount += 1;
      }
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(
        n => n.id === action.payload
      );
      if (notification && !notification.isRead) {
        notification.isRead = true;
        state.unreadCount -= 1;
      }
    },
    markAllAsRead: state => {
      state.notifications.forEach(n => {
        n.isRead = true;
      });
      state.unreadCount = 0;
    },
  },
});

export const {
  fetchNotificationsStart,
  fetchNotificationsSuccess,
  addNotification,
  markAsRead,
  markAllAsRead,
} = notificationSlice.actions;

export default notificationSlice.reducer;
