#!/bin/bash

# Function to create a placeholder screen
create_screen() {
    local file_path=$1
    local screen_name=$2
    local title=$3
    local description=$4
    
    cat > "$file_path" << SCREEN_EOF
import React from 'react';
import PlaceholderScreen from '@components/common/PlaceholderScreen';

const $screen_name = () => {
  return (
    <PlaceholderScreen
      title="$title"
      description="$description"
    />
  );
};

export default $screen_name;
SCREEN_EOF
}

# Home screens
create_screen "home/HomeScreen.tsx" "HomeScreen" "Home Dashboard" "Your pet care dashboard with quick actions and insights"
create_screen "pets/PetSetupScreen.tsx" "PetSetupScreen" "Add Your First Pet" "Set up your pet's profile to get started"
create_screen "emergency/EmergencyScreen.tsx" "EmergencyScreen" "Emergency Care" "Quick access to emergency veterinary services"

# Service screens
create_screen "services/ServicesListScreen.tsx" "ServicesListScreen" "Services" "Browse all available pet care services"
create_screen "services/ServiceProvidersScreen.tsx" "ServiceProvidersScreen" "Service Providers" "Find verified pet care providers"
create_screen "services/ProviderDetailScreen.tsx" "ProviderDetailScreen" "Provider Details" "View provider information and services"

# Appointment screens
create_screen "appointments/BookingFlowScreen.tsx" "BookingFlowScreen" "Book Appointment" "Schedule an appointment with a service provider"
create_screen "appointments/BookingConfirmationScreen.tsx" "BookingConfirmationScreen" "Booking Confirmed" "Your appointment has been confirmed"
create_screen "appointments/AppointmentsScreen.tsx" "AppointmentsScreen" "Appointments" "View and manage your appointments"
create_screen "appointments/AppointmentDetailScreen.tsx" "AppointmentDetailScreen" "Appointment Details" "View appointment information"
create_screen "appointments/MyAppointmentsScreen.tsx" "MyAppointmentsScreen" "My Appointments" "All your past and upcoming appointments"

# Consultation screens
create_screen "consultation/ConsultationScreen.tsx" "ConsultationScreen" "Video Consultation" "Connect with your veterinarian"

# Pet screens
create_screen "pets/MyPetsScreen.tsx" "MyPetsScreen" "My Pets" "Manage all your pet profiles"
create_screen "pets/AddPetScreen.tsx" "AddPetScreen" "Add Pet" "Add a new pet to your account"
create_screen "pets/EditPetScreen.tsx" "EditPetScreen" "Edit Pet" "Update your pet's information"
create_screen "pets/PetDetailScreen.tsx" "PetDetailScreen" "Pet Details" "View your pet's complete profile"
create_screen "pets/PetMedicalRecordsScreen.tsx" "PetMedicalRecordsScreen" "Medical Records" "View your pet's medical history"
create_screen "pets/AddMedicalRecordScreen.tsx" "AddMedicalRecordScreen" "Add Medical Record" "Add a new medical record"

# Community screens
create_screen "community/CommunityFeedScreen.tsx" "CommunityFeedScreen" "Community Feed" "Connect with other pet owners"
create_screen "community/CreatePostScreen.tsx" "CreatePostScreen" "Create Post" "Share your pet stories"
create_screen "community/PostDetailScreen.tsx" "PostDetailScreen" "Post Details" "View post and comments"
create_screen "community/EventsScreen.tsx" "EventsScreen" "Events" "Discover pet-related events"
create_screen "community/EventDetailScreen.tsx" "EventDetailScreen" "Event Details" "View event information"

# Marketplace screens
create_screen "marketplace/ShopHomeScreen.tsx" "ShopHomeScreen" "Shop" "Browse pet products and accessories"
create_screen "marketplace/ProductCategoryScreen.tsx" "ProductCategoryScreen" "Products" "View products by category"
create_screen "marketplace/ProductDetailScreen.tsx" "ProductDetailScreen" "Product Details" "View product information"
create_screen "marketplace/CartScreen.tsx" "CartScreen" "Shopping Cart" "Review your cart items"
create_screen "marketplace/CheckoutScreen.tsx" "CheckoutScreen" "Checkout" "Complete your purchase"
create_screen "marketplace/OrdersScreen.tsx" "OrdersScreen" "Orders" "View your order history"
create_screen "marketplace/OrderDetailScreen.tsx" "OrderDetailScreen" "Order Details" "Track your order"
create_screen "marketplace/TrackOrderScreen.tsx" "TrackOrderScreen" "Track Order" "Track your order status"
create_screen "marketplace/MyOrdersScreen.tsx" "MyOrdersScreen" "My Orders" "All your orders"

# Profile screens
create_screen "profile/ProfileHomeScreen.tsx" "ProfileHomeScreen" "Profile" "Manage your account"
create_screen "profile/EditProfileScreen.tsx" "EditProfileScreen" "Edit Profile" "Update your personal information"
create_screen "profile/SavedAddressesScreen.tsx" "SavedAddressesScreen" "Saved Addresses" "Manage your delivery addresses"
create_screen "profile/AddAddressScreen.tsx" "AddAddressScreen" "Add Address" "Add a new address"
create_screen "profile/EditAddressScreen.tsx" "EditAddressScreen" "Edit Address" "Update address information"
create_screen "profile/PaymentMethodsScreen.tsx" "PaymentMethodsScreen" "Payment Methods" "Manage your payment methods"
create_screen "profile/SettingsScreen.tsx" "SettingsScreen" "Settings" "App settings and preferences"
create_screen "profile/HelpSupportScreen.tsx" "HelpSupportScreen" "Help & Support" "Get help or contact support"
create_screen "profile/AboutScreen.tsx" "AboutScreen" "About" "About Pet Doc"

# Notifications screen
create_screen "notifications/NotificationsScreen.tsx" "NotificationsScreen" "Notifications" "View all your notifications"

echo "All placeholder screens created successfully!"
