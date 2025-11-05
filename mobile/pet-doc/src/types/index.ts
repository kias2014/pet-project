// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatar?: string;
  role: 'owner' | 'provider' | 'admin';
  createdAt: string;
  updatedAt: string;
}

// Pet Types
export interface Pet {
  id: string;
  userId: string;
  name: string;
  species: string;
  breed?: string;
  age?: number;
  birthDate?: string;
  gender: 'male' | 'female';
  photo?: string;
  weight?: number;
  color?: string;
  medicalHistory?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MedicalRecord {
  id: string;
  petId: string;
  recordType: 'vaccination' | 'checkup' | 'surgery' | 'prescription' | 'other';
  title: string;
  description: string;
  date: string;
  veterinarian?: string;
  attachments?: string[];
  createdAt: string;
}

// Vendor/Provider Types
export interface Vendor {
  id: string;
  name: string;
  type: string;
  description: string;
  photo?: string;
  rating: number;
  reviewCount: number;
  address: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  isVerified: boolean;
  services: VendorService[];
  availableSlots?: TimeSlot[];
  createdAt: string;
}

export interface VendorService {
  id: string;
  vendorId: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: string;
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

// Appointment Types
export interface Appointment {
  id: string;
  userId: string;
  vendorId: string;
  petId: string;
  serviceId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  vendor: Vendor;
  pet: Pet;
  service: VendorService;
  createdAt: string;
}

// Consultation Types
export interface Consultation {
  id: string;
  appointmentId: string;
  type: 'video' | 'audio' | 'chat';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  startTime: string;
  endTime?: string;
  prescription?: Prescription;
  notes?: string;
}

export interface Prescription {
  id: string;
  consultationId: string;
  medications: Medication[];
  instructions: string;
  validUntil: string;
  createdAt: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

// Community Types
export interface Post {
  id: string;
  userId: string;
  author: User;
  content: string;
  images?: string[];
  petTags?: Pet[];
  likes: number;
  comments: number;
  isLiked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  author: User;
  content: string;
  likes: number;
  isLiked: boolean;
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  type: 'adoption' | 'vaccination' | 'blood-donation' | 'meetup' | 'other';
  date: string;
  location: string;
  organizer: string;
  imageUrl?: string;
  attendees: number;
  isRegistered: boolean;
}

// Marketplace Types
export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  discountPrice?: number;
  images: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  brand?: string;
  tags?: string[];
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  deliveryAddress: Address;
  paymentMethod: string;
  createdAt: string;
  estimatedDelivery?: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: 'appointment' | 'consultation' | 'order' | 'community' | 'reminder' | 'promotional';
  title: string;
  message: string;
  data?: any;
  isRead: boolean;
  createdAt: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
