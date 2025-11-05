# Pet Care System - Project Structure

## Overview

This document outlines the complete structure of the Pet Care Management System monorepo.

## Repository Structure

```
pet-care-system/
├── mobile/                          # Mobile applications
│   ├── pet-doc/                    # Pet Owner App (React Native)
│   │   ├── src/
│   │   │   ├── components/        # Reusable UI components
│   │   │   ├── screens/           # Screen components
│   │   │   ├── navigation/        # Navigation configuration
│   │   │   ├── store/             # Redux state management
│   │   │   ├── services/          # API services
│   │   │   ├── hooks/             # Custom React hooks
│   │   │   ├── utils/             # Utility functions
│   │   │   ├── types/             # TypeScript types
│   │   │   ├── constants/         # Constants
│   │   │   ├── theme/             # Theme configuration
│   │   │   ├── assets/            # Static assets
│   │   │   └── App.tsx            # Root component
│   │   ├── android/               # Android native code
│   │   ├── ios/                   # iOS native code
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── README.md
│   │
│   ├── pet-connect/               # Service Provider App (React Native)
│   │   └── [Similar structure to pet-doc]
│   │
│   └── shared/                    # Shared mobile components
│       ├── components/
│       ├── utils/
│       ├── types/
│       └── theme/
│
├── web/                           # Web applications
│   └── back-office/              # Admin Dashboard (React JS)
│       ├── src/
│       │   ├── components/
│       │   ├── pages/
│       │   ├── layouts/
│       │   ├── services/
│       │   ├── store/
│       │   ├── hooks/
│       │   ├── utils/
│       │   ├── types/
│       │   ├── assets/
│       │   └── App.tsx
│       ├── public/
│       ├── package.json
│       ├── tsconfig.json
│       ├── vite.config.ts
│       └── README.md
│
├── backend/                       # Backend microservices
│   ├── api-gateway/              # API Gateway
│   │   ├── src/
│   │   │   ├── routes/
│   │   │   ├── middleware/
│   │   │   ├── config/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── README.md
│   │
│   ├── auth-service/             # Authentication Service
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   ├── middleware/
│   │   │   ├── utils/
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── user-service/             # User Management Service
│   ├── appointment-service/      # Appointment Service
│   ├── consultation-service/     # Consultation Service
│   ├── community-service/        # Community Service
│   ├── marketplace-service/      # Marketplace Service
│   ├── vendor-service/           # Vendor Service
│   ├── notification-service/     # Notification Service
│   │
│   └── shared/                   # Shared backend utilities
│       ├── middleware/
│       ├── utils/
│       ├── types/
│       └── constants/
│
├── database/                      # Database scripts
│   ├── migrations/               # Database migrations
│   │   ├── 001_create_users_table.sql
│   │   ├── 002_create_pets_table.sql
│   │   └── ...
│   │
│   └── seeds/                    # Seed data
│       ├── users.sql
│       ├── service_categories.sql
│       └── ...
│
├── docs/                         # Documentation
│   ├── api/                      # API documentation
│   ├── architecture/             # Architecture diagrams
│   └── user-guides/              # User guides
│
├── .github/                      # GitHub configuration
│   └── workflows/                # GitHub Actions
│       ├── ci.yml
│       └── deploy.yml
│
├── docker-compose.yml            # Docker compose configuration
├── package.json                  # Root package.json (monorepo)
├── .gitignore
├── .prettierrc
├── .eslintrc.js
├── CLAUDE.md                     # AI assistant guidelines
├── PET_DOC_USER_JOURNEY.md       # User journey documentation
├── PROJECT_STRUCTURE.md          # This file
└── README.md                     # Project overview
```

## Component Organization

### Mobile Apps (React Native)

#### Components Structure
```
components/
├── common/              # Reusable UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   ├── Avatar.tsx
│   ├── Badge.tsx
│   ├── Loading.tsx
│   ├── EmptyState.tsx
│   └── PlaceholderScreen.tsx
│
├── auth/               # Authentication components
├── pet/                # Pet-related components
├── appointment/        # Appointment components
├── community/          # Community components
├── marketplace/        # Marketplace components
└── profile/            # Profile components
```

#### Screens Structure
```
screens/
├── auth/               # Authentication flows
│   ├── SplashScreen.tsx
│   ├── LoginScreen.tsx
│   ├── SignupScreen.tsx
│   ├── ForgotPasswordScreen.tsx
│   ├── OTPVerificationScreen.tsx
│   └── ResetPasswordScreen.tsx
│
├── onboarding/         # Onboarding flows
│   └── OnboardingScreen.tsx
│
├── home/               # Home/Dashboard
├── services/           # Service browsing
├── appointments/       # Appointment management
├── consultation/       # Video consultations
├── pets/               # Pet management
├── community/          # Community features
├── marketplace/        # Shopping features
├── profile/            # Profile & settings
├── emergency/          # Emergency care
└── notifications/      # Notifications
```

#### Navigation Structure
```
navigation/
├── types.ts                        # Navigation type definitions
├── RootNavigator.tsx              # Root navigator
├── AuthNavigator.tsx              # Auth stack
├── MainNavigator.tsx              # Main tabs
└── stacks/                        # Stack navigators
    ├── HomeStackNavigator.tsx
    ├── ServicesStackNavigator.tsx
    ├── CommunityStackNavigator.tsx
    ├── MarketplaceStackNavigator.tsx
    └── ProfileStackNavigator.tsx
```

#### State Management
```
store/
├── store.ts                       # Store configuration
├── slices/                        # Redux slices
│   ├── authSlice.ts
│   ├── userSlice.ts
│   ├── petSlice.ts
│   ├── appointmentSlice.ts
│   ├── cartSlice.ts
│   └── notificationSlice.ts
└── middleware/                    # Custom middleware
```

## Backend Services

### Service Structure (Template)

Each microservice follows this structure:

```
service-name/
├── src/
│   ├── controllers/               # Request handlers
│   ├── services/                  # Business logic
│   ├── models/                    # Data models
│   ├── routes/                    # Route definitions
│   ├── middleware/                # Service middleware
│   ├── utils/                     # Helper functions
│   ├── types/                     # TypeScript types
│   ├── config/                    # Configuration
│   └── index.ts                   # Entry point
│
├── tests/                         # Tests
│   ├── unit/
│   └── integration/
│
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

### API Routes Structure

```
/api/v1/
├── auth/
│   ├── POST /register
│   ├── POST /login
│   ├── POST /logout
│   ├── POST /refresh
│   ├── POST /forgot-password
│   └── POST /reset-password
│
├── users/
│   ├── GET /profile
│   ├── PUT /profile
│   ├── GET /pets
│   └── POST /pets
│
├── appointments/
│   ├── GET /
│   ├── POST /
│   ├── GET /:id
│   ├── PUT /:id
│   └── DELETE /:id
│
├── vendors/
│   ├── GET /
│   ├── GET /:id
│   └── GET /:id/services
│
└── ...
```

## Database Structure

### Tables Overview

```
Users & Auth:
- users
- user_roles
- sessions
- refresh_tokens

Pets:
- pets
- pet_medical_records
- vaccination_schedules
- pet_photos

Vendors:
- vendors
- vendor_services
- service_categories
- vendor_schedules
- vendor_ratings

Appointments:
- appointments
- appointment_slots
- booking_status_history

Consultations:
- consultations
- consultation_sessions
- prescriptions

Community:
- forum_posts
- post_comments
- post_likes
- events
- blood_donation_campaigns

Marketplace:
- products
- product_categories
- orders
- order_items
- cart_items

Financial:
- transactions
- vendor_earnings
- commission_settings
- reward_points
- referrals
- payouts

Notifications:
- notification_templates
- notification_logs
- user_notifications
```

## Development Workflow

### Monorepo Scripts

From root directory:

```bash
# Install all dependencies
yarn install

# Run specific workspace
yarn pet-doc start
yarn pet-connect start
yarn back-office dev

# Run all tests
yarn test

# Lint all packages
yarn lint

# Clean all node_modules
yarn clean
```

### Git Workflow

```
main                    # Production branch
├── develop            # Development branch
├── feature/*          # Feature branches
├── bugfix/*           # Bug fix branches
└── release/*          # Release branches
```

## File Naming Conventions

- **Components**: PascalCase (e.g., `Button.tsx`, `UserProfile.tsx`)
- **Screens**: PascalCase with "Screen" suffix (e.g., `LoginScreen.tsx`)
- **Utilities**: camelCase (e.g., `validation.ts`, `formatting.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- **Types/Interfaces**: PascalCase (e.g., `User`, `Pet`, `Appointment`)

## Code Organization Best Practices

1. **Keep components small and focused** - Single responsibility principle
2. **Use TypeScript for type safety** - Define interfaces for all data structures
3. **Centralize theme and constants** - No hard-coded values
4. **Implement proper error handling** - Try-catch blocks and error boundaries
5. **Write meaningful comments** - Explain "why", not "what"
6. **Follow consistent naming** - Use conventions across the codebase
7. **Separate concerns** - Business logic, UI, and data fetching
8. **Use custom hooks** - Extract reusable logic
9. **Optimize performance** - Memoization, lazy loading, code splitting
10. **Write tests** - Unit tests for logic, integration tests for flows

## Current Status

✅ **Completed:**
- Monorepo structure setup
- Pet Doc App (React Native) - UI/UX structure
- Complete navigation architecture
- Redux state management setup
- TypeScript configuration
- Theme system
- Common UI components library
- All screen placeholders (40+ screens)
- Documentation

🚧 **In Progress:**
- Backend microservices implementation
- API integration
- Real-time features

📋 **Planned:**
- Pet Connect App (Service Provider)
- Back Office Dashboard
- Database migrations
- Docker configuration
- CI/CD pipelines
- Testing suite

## Resources

- [React Native Documentation](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
