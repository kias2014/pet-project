# Pet Doc App - User Journey & Screen Structure

## User Flow Overview

### 1. Onboarding Flow (First-time Users)
- **Splash Screen** - App branding and loading
- **Welcome/Intro Screens** (3-4 slides)
  - Benefits of Pet Doc
  - Key features showcase
  - How it works
- **Get Started** - Choice to Login or Sign Up

### 2. Authentication Flow
- **Login Screen**
  - Email/Password
  - Social login options (Google, Apple)
  - Forgot password link
  - Sign up link
- **Sign Up Screen**
  - Personal details (Name, Email, Phone)
  - Password creation
  - Terms & conditions
- **Forgot Password**
  - Email input
  - OTP verification
  - New password setup
- **OTP Verification**
  - Phone/Email verification

### 3. Pet Profile Setup (First-time Post-Auth)
- **Add First Pet Screen**
  - Pet name
  - Species (Dog, Cat, Bird, etc.)
  - Breed
  - Age/Birth date
  - Gender
  - Photo upload
  - Medical history (optional)

### 4. Main Navigation Structure

#### Bottom Tab Navigator:
1. **Home**
2. **Services**
3. **Community**
4. **Marketplace**
5. **Profile**

---

## Main Screen Flows

### HOME TAB
- **Dashboard/Home Screen**
  - Welcome message with pet info
  - Quick actions (Book appointment, Emergency, etc.)
  - Upcoming appointments widget
  - Health reminders (Vaccinations due, etc.)
  - Nearby services
  - Featured articles/tips

### SERVICES TAB
- **Services List Screen**
  - Service categories grid:
    - Veterinary Care
    - Grooming
    - Training
    - Pet Sitting
    - Walking
    - Emergency Care

- **Service Providers List**
  - Filter and sort options
  - Provider cards with:
    - Photo, Name, Rating
    - Services offered
    - Distance
    - Availability indicator

- **Service Provider Detail**
  - Full profile
  - About/Bio
  - Services & pricing
  - Reviews & ratings
  - Gallery
  - Available time slots
  - "Book Now" CTA

- **Booking Flow**
  - Select service
  - Choose pet
  - Select date & time
  - Add notes/special requests
  - Booking summary
  - Payment (if required)
  - Confirmation

- **Appointments Screen**
  - Upcoming appointments
  - Past appointments
  - Cancelled appointments
  - Appointment detail view
  - Actions: Reschedule, Cancel, Start Consultation

### COMMUNITY TAB
- **Community Feed**
  - Posts from pet owners
  - Stories/experiences
  - Q&A section
  - Filter by topics

- **Create Post Screen**
  - Text editor
  - Add photos/videos
  - Select pet tag
  - Post privacy settings

- **Post Detail**
  - Full post view
  - Comments
  - Like/Share/Report

- **Events**
  - Local pet events
  - Adoption drives
  - Vaccination camps
  - Blood donation campaigns

- **Event Detail**
  - Event info
  - Register/RSVP
  - Location on map
  - Share event

### MARKETPLACE TAB
- **Shop Home**
  - Categories (Food, Toys, Accessories, Medicine, etc.)
  - Featured products
  - Deals & offers
  - Recently viewed

- **Product Category**
  - Product grid/list
  - Filters (Price, Brand, Rating)
  - Sort options

- **Product Detail**
  - Product images gallery
  - Description
  - Price & offers
  - Reviews & ratings
  - Add to cart
  - Buy now

- **Cart**
  - Cart items
  - Quantity adjustment
  - Remove items
  - Apply coupon
  - Price summary
  - Checkout

- **Checkout Flow**
  - Delivery address
  - Select pet (for pet-specific items)
  - Payment method
  - Order review
  - Place order

- **Orders**
  - Active orders
  - Order history
  - Track order
  - Order details
  - Reorder option

### PROFILE TAB
- **Profile Screen**
  - User info & photo
  - My Pets section
  - My Appointments
  - My Orders
  - Saved addresses
  - Payment methods
  - Notifications settings
  - Help & support
  - About
  - Logout

- **My Pets**
  - List of all pets
  - Add new pet
  - Edit pet profile
  - Pet medical records
  - Vaccination schedule
  - Pet documents

- **Pet Detail**
  - Pet info & photos
  - Medical history
  - Vaccination records
  - Prescriptions
  - Appointment history
  - Weight tracking
  - Notes

- **Edit Profile**
  - Personal details
  - Contact info
  - Profile photo
  - Change password

- **Notifications**
  - Notification list
  - Mark as read
  - Notification settings

- **Settings**
  - Account settings
  - Privacy settings
  - Notification preferences
  - Language
  - Theme (Light/Dark)
  - Biometric login

- **Help & Support**
  - FAQs
  - Contact support
  - Chat with support
  - Report issue

### CONSULTATION FLOW (Accessible from Appointments)
- **Consultation Waiting Room**
  - Provider info
  - Start consultation button
  - Timer/scheduled time

- **Video Consultation Screen**
  - Video call interface
  - Controls (Mute, Camera, End call)
  - Chat option
  - Share files/images

- **Post-Consultation**
  - Consultation summary
  - Prescription view/download
  - Follow-up booking
  - Rate & review

### EMERGENCY FLOW
- **Emergency Screen**
  - Emergency contact list
  - Nearby emergency vets
  - Quick call/directions
  - First aid tips
  - Upload pet condition photos

### NOTIFICATIONS
- **Notification Center**
  - Appointment reminders
  - Vaccination due
  - Prescription refill
  - Order updates
  - Community activity
  - Promotional offers

---

## Priority for MVP (Phase 1)

### Must Have:
1. Authentication (Login, Signup, Forgot Password)
2. Home Dashboard
3. Pet Profile Management
4. Service Provider Browse
5. Service Provider Detail
6. Appointment Booking
7. Appointments List
8. Basic Notifications
9. User Profile & Settings

### Phase 2:
1. Video Consultations
2. Community Forum
3. Marketplace & Orders
4. Emergency Services
5. Advanced Features (Reminders, Tracking, etc.)

---

## Screen Count Estimate

**Phase 1 (MVP):** ~30-35 screens
**Phase 2 (Full):** ~60-70 screens

---

## Navigation Architecture

```
Root Navigator (Stack)
├── Auth Stack (if not authenticated)
│   ├── Splash
│   ├── Onboarding
│   ├── Login
│   ├── Signup
│   ├── ForgotPassword
│   └── OTPVerification
│
└── Main Stack (if authenticated)
    ├── Bottom Tab Navigator
    │   ├── Home Tab → Home Stack
    │   ├── Services Tab → Services Stack
    │   ├── Community Tab → Community Stack
    │   ├── Marketplace Tab → Marketplace Stack
    │   └── Profile Tab → Profile Stack
    │
    └── Modal Screens (Overlays)
        ├── Booking Modal
        ├── Consultation Screen
        ├── Notifications
        └── Filter/Sort Modals
```
