export type UserType = 'PREGNANT' | 'SUPPORT_NETWORK';

export interface SupportNetworkMember {
  id: string;
  relationship: string;
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  createdAt: string;
  support: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    avatar?: string;
  };
}

export interface SupportLink {
  id: string;
  relationship: string;
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  createdAt: string;
  pregnant: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    avatar?: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  userType: UserType;
  shareCode: string | null;
  createdAt: string;
  updatedAt: string;
  avatar?: string;
  pregnantWeeks?: number;
  supportNetwork?: SupportNetworkMember[];
  supportingPregnant?: SupportLink | null;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  rating?: number;
  availableSlots?: TimeSlot[];
}

export interface TimeSlot {
  id: string;
  date: string;
  time: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctor: Doctor;
  date: string;
  time: string;
  type: string;
  location: string;
  status: 'SCHEDULED' | 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  observations?: string;
}

export interface AppointmentBooking {
  doctorId: string;
  date: string;
  time: string;
  type?: string;
  notes?: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  instructions?: string;
}

export interface Supplement {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  purpose?: string;
}

export interface Treatment {
  medications: Medication[];
  supplements: Supplement[];
}

export interface Payment {
  id: string;
  appointmentId: string;
  amount: number;
  serviceName: string;
  date: string;
  status: 'pending' | 'completed' | 'failed';
  method?: 'pix' | 'credit_card' | 'debit_card';
}

export interface PaymentMethod {
  type: 'pix' | 'credit_card' | 'debit_card';
  label: string;
  icon: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  userType: UserType;
  shareCode?: string;
  relationship?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
