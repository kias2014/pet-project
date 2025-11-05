import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CommunityStackParamList} from '../types';

// Import screens
import CommunityFeedScreen from '@screens/community/CommunityFeedScreen';
import CreatePostScreen from '@screens/community/CreatePostScreen';
import PostDetailScreen from '@screens/community/PostDetailScreen';
import EventsScreen from '@screens/community/EventsScreen';
import EventDetailScreen from '@screens/community/EventDetailScreen';

const Stack = createNativeStackNavigator<CommunityStackParamList>();

const CommunityStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CommunityFeed"
        component={CommunityFeedScreen}
        options={{title: 'Community'}}
      />
      <Stack.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={{title: 'Create Post', presentation: 'modal'}}
      />
      <Stack.Screen
        name="PostDetail"
        component={PostDetailScreen}
        options={{title: 'Post'}}
      />
      <Stack.Screen
        name="Events"
        component={EventsScreen}
        options={{title: 'Events'}}
      />
      <Stack.Screen
        name="EventDetail"
        component={EventDetailScreen}
        options={{title: 'Event Details'}}
      />
    </Stack.Navigator>
  );
};

export default CommunityStackNavigator;
