# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Pet Doc – Pet Care Management System** is a comprehensive pet care platform consisting of:
- **Pet Doc App** (React Native): Mobile app for pet owners
- **Pet Connect App** (React Native): Mobile app for service providers (vets, groomers, trainers, etc.)
- **Back-Office Dashboard** (React JS): Web-based admin panel

The system uses a **microservices architecture** in a **monorepo structure**.

## Architecture

### Monorepo Structure
```
pet-care-system/
├── mobile/
│   ├── pet-doc/           # Pet Owner App (React Native)
│   ├── pet-connect/       # Service Provider App (React Native)
│   └── shared/            # Shared components, utilities, types
├── web/
│   └── back-office/       # Admin Dashboard (React JS)
├── backend/
│   ├── api-gateway/       # Main entry point, routing, rate limiting
│   ├── auth-service/      # Authentication & Authorization (JWT)
│   ├── user-service/      # User & Pet profiles
│   ├── appointment-service/
│   ├── consultation-service/
│   ├── community-service/
│   ├── marketplace-service/
│   ├── vendor-service/
│   ├── notification-service/
│   └── shared/            # Shared middleware, utilities, types
├── database/
│   ├── migrations/
│   └── seeds/
└── docker-compose.yml
```

### Technology Stack

**Mobile Apps:**
- React Native (iOS & Android)
- React Navigation
- Redux Toolkit / Context API
- Axios

**Web Dashboard:**
- React JS with Vite
- React Router
- Redux / Context API
- Material-UI / Ant Design / Tailwind CSS

**Backend:**
- Node.js with Express.js
- RESTful APIs
- JWT authentication
- Microservices architecture

**Database:**
- PostgreSQL
- Prisma / TypeORM / Sequelize (ORM to be selected)
- pgBouncer for connection pooling

**DevOps:**
- Docker
- Git (monorepo)
- GitHub Actions / GitLab CI

## Microservices Overview

1. **API Gateway** - Routes all requests, handles rate limiting and authentication validation
2. **Auth Service** - Manages user authentication, JWT tokens, role-based access control (RBAC)
3. **User Service** - Handles pet owner profiles, pet profiles, medical records
4. **Appointment Service** - Booking system, schedule management, availability
5. **Consultation Service** - Video/audio calls, chat consultations, prescriptions
6. **Community Service** - Forum posts, comments, events, blood donation campaigns
7. **Marketplace Service** - Product catalog, shopping cart, orders
8. **Vendor Service** - Service provider profiles, services, pricing, availability
9. **Notification Service** - Email, SMS, push notifications, reminders

### Service Communication
- External clients communicate with API Gateway via REST over HTTPS
- API Gateway routes to microservices via internal REST or message queue
- Inter-service communication uses HTTP or event-driven messaging

## Database Schema

### Key Entities
- **Users & Auth**: users, user_roles, sessions, refresh_tokens
- **Pets**: pets, pet_medical_records, vaccination_schedules, pet_photos
- **Vendors**: vendors, vendor_services, service_categories, vendor_schedules, vendor_ratings
- **Appointments**: appointments, appointment_slots, booking_status_history
- **Consultations**: consultations, consultation_sessions, prescriptions
- **Marketplace**: products, product_categories, orders, order_items, cart_items
- **Community**: forum_posts, post_comments, post_likes, events, blood_donation_campaigns
- **Financial**: transactions, vendor_earnings, commission_settings, reward_points, referrals, payouts
- **Notifications**: notification_templates, notification_logs, user_notifications

### Important Relationships
- Users → Pets (One-to-Many)
- Users/Vendors → Appointments (Many-to-Many)
- Appointments → Consultations (One-to-One)
- Consultations → Prescriptions (One-to-Many)

## Development Phases

**Phase 1: MVP (12-16 weeks)**
- Core authentication and user management
- Pet profile management
- Service provider browsing and registration
- Appointment booking system
- Basic notifications
- Admin dashboard with provider approval workflow

**Phase 2: Extended Features (16-20 weeks)**
- Online video consultations
- Community forum
- Marketplace and e-commerce
- Medicine delivery
- Vaccination reminders
- Referral and points system
- Hospital management features

## API Structure

All API routes follow pattern: `/api/v1/{service}/*`

Key route groups:
- `/api/v1/auth/*` → Auth Service
- `/api/v1/users/*` → User Service
- `/api/v1/appointments/*` → Appointment Service
- `/api/v1/vendors/*` → Vendor Service
- `/api/v1/consultations/*` → Consultation Service
- `/api/v1/marketplace/*` → Marketplace Service
- `/api/v1/community/*` → Community Service
- `/api/v1/notifications/*` → Notification Service
- `/api/v1/admin/*` → Various Services (Admin only)

### Authentication Flow
1. User registers/logs in → Auth Service validates
2. Auth Service generates JWT access token + refresh token
3. Access token in Authorization header for authenticated requests
4. API Gateway validates token before routing
5. Refresh token used to obtain new access token when expired

## Security Requirements

- JWT-based authentication with secure token storage
- Refresh token rotation
- Role-based access control (RBAC): owner, provider, admin
- Password encryption with bcrypt
- HTTPS/TLS for all communications
- Rate limiting on API Gateway
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CORS configuration
- Secure token storage in mobile apps (Keychain/Keystore)

## Performance Considerations

- Database indexing on frequently queried columns
- Connection pooling for database
- Caching strategy (Redis) for frequently accessed data
- Load balancing for API Gateway
- Horizontal scaling of microservices
- Image compression and lazy loading in mobile apps
- API response caching

## Third-Party Integrations (TBD)

- Payment Gateway: Stripe, PayPal (TBD)
- Video/Audio: Twilio, Agora, or WebRTC (TBD)
- SMS: Twilio, AWS SNS (TBD)
- Email: SendGrid, AWS SES (TBD)
- Push Notifications: Firebase Cloud Messaging (FCM)
- File Storage: AWS S3, Google Cloud Storage (TBD)
- Maps: Google Maps API, Mapbox (TBD)

## Important Notes

- This is a **monorepo**: all applications and services live in a single repository
- Follow **microservices best practices**: each service should be independently deployable
- Use **shared** directories for common code between services/apps to avoid duplication
- All services should log consistently using Winston/Morgan
- Database migrations should be versioned and reversible
- API responses should follow consistent format across all services
- Mobile apps must support both iOS and Android
- All new features require unit tests and integration tests
- Refer to TECHNICAL_SCOPE.md for complete feature specifications and detailed requirements
