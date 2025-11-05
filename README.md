# Pet Care Management System

A comprehensive pet care platform with mobile apps and web dashboard built using a monorepo architecture.

## 📱 Applications

- **Pet Doc App** (React Native) - Mobile app for pet owners
- **Pet Connect App** (React Native) - Mobile app for service providers
- **Back-Office Dashboard** (React JS) - Web-based admin panel

## 🏗️ Architecture

This is a **monorepo** containing:
- Mobile applications (React Native)
- Web applications (React JS)
- Backend microservices (Node.js)
- Shared libraries and utilities

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- Yarn >= 1.22.0
- React Native development environment
- iOS: Xcode 14+ (macOS only)
- Android: Android Studio with Android SDK

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kias2014/pet-project.git
cd pet-project
```

2. Install all dependencies:
```bash
yarn install
```

### Running Applications

#### Pet Doc App (Mobile)
```bash
# iOS
cd mobile/pet-doc
yarn ios

# Android
cd mobile/pet-doc
yarn android
```

#### Pet Connect App (Mobile)
```bash
# iOS
cd mobile/pet-connect
yarn ios

# Android
cd mobile/pet-connect
yarn android
```

#### Back Office Dashboard (Web)
```bash
cd web/back-office
yarn dev
```

## 📁 Project Structure

```
pet-care-system/
├── mobile/
│   ├── pet-doc/           # Pet Owner App
│   ├── pet-connect/       # Service Provider App
│   └── shared/            # Shared mobile components
├── web/
│   └── back-office/       # Admin Dashboard
├── backend/
│   ├── api-gateway/       # API Gateway
│   ├── auth-service/      # Authentication Service
│   ├── user-service/      # User Management Service
│   └── shared/            # Shared backend utilities
├── database/
│   ├── migrations/        # Database migrations
│   └── seeds/             # Seed data
└── docs/                  # Documentation
```

## 🛠️ Technology Stack

- **Mobile**: React Native, React Navigation, Redux Toolkit, TypeScript
- **Web**: React JS, Vite, React Router, TypeScript
- **Backend**: Node.js, Express.js, PostgreSQL, Prisma
- **DevOps**: Docker, GitHub Actions

## 📚 Documentation

- [CLAUDE.md](./CLAUDE.md) - Development guidelines and architecture
- [PET_DOC_USER_JOURNEY.md](./PET_DOC_USER_JOURNEY.md) - User journey and screen flows
- [TECHNICAL_SCOPE.md](./TECHNICAL_SCOPE.md) - Technical specifications (TBD)

## 🤝 Contributing

This is a private project. Please follow the development guidelines in CLAUDE.md.

## 📄 License

MIT License - see LICENSE file for details
