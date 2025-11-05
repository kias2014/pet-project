# Pet Doc - Pet Owner Mobile App

Pet Doc is the mobile application for pet owners to manage their pets' health, book appointments, connect with service providers, and access a community of pet lovers.

## 🏗️ Project Structure

```
pet-doc/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── common/         # Common components (Button, Input, Card, etc.)
│   │   ├── auth/           # Auth-specific components
│   │   ├── pet/            # Pet-related components
│   │   ├── appointment/    # Appointment components
│   │   ├── community/      # Community components
│   │   ├── marketplace/    # Marketplace components
│   │   └── profile/        # Profile components
│   │
│   ├── screens/            # Screen components
│   │   ├── auth/           # Authentication screens
│   │   ├── onboarding/     # Onboarding screens
│   │   ├── home/           # Home/Dashboard screens
│   │   ├── services/       # Service browsing screens
│   │   ├── appointments/   # Appointment management screens
│   │   ├── consultation/   # Video consultation screens
│   │   ├── pets/           # Pet management screens
│   │   ├── community/      # Community feed screens
│   │   ├── marketplace/    # Shopping screens
│   │   ├── profile/        # Profile & settings screens
│   │   ├── emergency/      # Emergency care screens
│   │   └── notifications/  # Notifications screens
│   │
│   ├── navigation/         # Navigation configuration
│   │   ├── types.ts        # Navigation type definitions
│   │   ├── RootNavigator.tsx      # Root navigation container
│   │   ├── AuthNavigator.tsx      # Auth stack navigator
│   │   ├── MainNavigator.tsx      # Main tab navigator
│   │   └── stacks/                # Stack navigators for each tab
│   │       ├── HomeStackNavigator.tsx
│   │       ├── ServicesStackNavigator.tsx
│   │       ├── CommunityStackNavigator.tsx
│   │       ├── MarketplaceStackNavigator.tsx
│   │       └── ProfileStackNavigator.tsx
│   │
│   ├── store/              # Redux state management
│   │   ├── store.ts        # Store configuration
│   │   └── slices/         # Redux slices
│   │       ├── authSlice.ts
│   │       ├── userSlice.ts
│   │       ├── petSlice.ts
│   │       ├── appointmentSlice.ts
│   │       ├── cartSlice.ts
│   │       └── notificationSlice.ts
│   │
│   ├── services/           # API services
│   │   ├── api.ts          # API client configuration
│   │   ├── authService.ts
│   │   ├── userService.ts
│   │   ├── petService.ts
│   │   └── ...
│   │
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── usePets.ts
│   │   └── ...
│   │
│   ├── utils/              # Utility functions
│   │   ├── validation.ts
│   │   ├── formatting.ts
│   │   └── ...
│   │
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   │
│   ├── constants/          # Constants and configuration
│   │   └── index.ts
│   │
│   ├── theme/              # Theme configuration
│   │   ├── colors.ts
│   │   ├── spacing.ts
│   │   ├── typography.ts
│   │   ├── theme.ts
│   │   └── ThemeContext.tsx
│   │
│   ├── assets/             # Static assets
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   └── App.tsx             # Root app component
│
├── android/                # Android native code
├── ios/                    # iOS native code
├── index.js                # App entry point
├── package.json
├── tsconfig.json
├── babel.config.js
└── metro.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- Yarn >= 1.22.0
- React Native development environment set up
- For iOS: Xcode 14+ (macOS only)
- For Android: Android Studio with Android SDK

### Installation

1. Install dependencies:
```bash
cd mobile/pet-doc
yarn install
```

2. Install iOS pods (macOS only):
```bash
cd ios && pod install && cd ..
```

### Running the App

#### iOS
```bash
yarn ios
```

#### Android
```bash
yarn android
```

#### Start Metro Bundler
```bash
yarn start
```

## 📱 Features

### Phase 1 (MVP) - Implemented Structure

1. **Authentication & Onboarding**
   - Splash screen
   - Onboarding carousel
   - Login/Sign up
   - Password recovery with OTP
   - Social login (Google, Apple)

2. **Home Dashboard**
   - Quick actions
   - Upcoming appointments widget
   - Health reminders
   - Nearby services

3. **Pet Management**
   - Add/Edit pet profiles
   - Pet medical records
   - Vaccination schedules
   - Pet photos

4. **Service Discovery**
   - Browse service categories
   - Find service providers
   - View provider details
   - Ratings and reviews

5. **Appointment Booking**
   - Book appointments
   - View upcoming/past appointments
   - Reschedule/Cancel appointments
   - Appointment reminders

6. **Profile & Settings**
   - User profile management
   - Address management
   - Payment methods
   - App settings
   - Help & Support

### Phase 2 (Future Features)

- Video/Audio consultations
- Community forum and posts
- Events and campaigns
- Marketplace and e-commerce
- Order tracking
- Referral system
- Push notifications

## 🎨 UI/UX Components

### Common Components

- **Button** - Versatile button with variants (primary, secondary, outline, ghost)
- **Input** - Text input with label, error, and icon support
- **Card** - Card container with shadow
- **Avatar** - User/Pet avatar with fallback
- **Badge** - Status/category badge
- **Loading** - Loading indicator with message
- **EmptyState** - Empty state placeholder
- **PlaceholderScreen** - Template for upcoming screens

### Navigation Structure

```
Root Navigator
├── Auth Stack (Unauthenticated)
│   ├── Splash
│   ├── Onboarding
│   ├── Login
│   ├── Signup
│   ├── ForgotPassword
│   ├── OTPVerification
│   └── ResetPassword
│
└── Main Stack (Authenticated)
    ├── Bottom Tabs
    │   ├── Home Tab
    │   ├── Services Tab
    │   ├── Community Tab
    │   ├── Marketplace Tab
    │   └── Profile Tab
    │
    └── Modal Screens
        ├── Consultation
        └── Notifications
```

## 🔧 Configuration

### Path Aliases

The app uses TypeScript path aliases for cleaner imports:

```typescript
import {Button} from '@components/common';
import {HomeScreen} from '@screens/home';
import {useAuth} from '@hooks/useAuth';
import {colors} from '@theme/colors';
import {User} from '@types/index';
```

### Theme

The app uses a centralized theme system with:
- Colors (primary, secondary, accent, semantic colors)
- Typography (font sizes, weights, families)
- Spacing (consistent padding/margin values)
- Shadows (elevation levels)

Access theme via `useTheme` hook:
```typescript
const {theme} = useTheme();
```

### State Management

Redux Toolkit is used for global state management:
- **authSlice**: Authentication state
- **userSlice**: User profile data
- **petSlice**: Pet data
- **appointmentSlice**: Appointments
- **cartSlice**: Shopping cart
- **notificationSlice**: Notifications

## 📝 Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Use functional components with hooks
- Keep components small and focused
- Write meaningful commit messages

### Component Guidelines

1. **Naming**: Use PascalCase for components
2. **Props**: Define prop interfaces with TypeScript
3. **Styling**: Use StyleSheet.create for styles
4. **Navigation**: Use typed navigation props

### Screen Template

```typescript
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {YourStackParamList} from '@navigation/types';
import {colors, spacing, typography} from '@theme';

type Props = NativeStackScreenProps<YourStackParamList, 'ScreenName'>;

const YourScreen: React.FC<Props> = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Screen Title</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
});

export default YourScreen;
```

## 🧪 Testing

```bash
# Run tests
yarn test

# Run tests with coverage
yarn test --coverage

# Type check
yarn type-check

# Lint
yarn lint
```

## 📦 Building for Production

### iOS

```bash
cd ios
xcodebuild -workspace PetDoc.xcworkspace -scheme PetDoc -configuration Release
```

### Android

```bash
cd android
./gradlew assembleRelease
```

## 🤝 Contributing

1. Follow the existing code structure
2. Write meaningful commit messages
3. Test your changes before committing
4. Update documentation as needed

## 📄 License

MIT License
