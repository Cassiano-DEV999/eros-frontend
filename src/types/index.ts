// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'gestante' | 'rede_apoio';
  avatar?: string;
  pregnantWeeks?: number;
  dueDate?: string;
}

// Doctor Types
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

// Appointment Types
export interface Appointment {
  id: string;
  doctorId: string;
  doctor: Doctor;
  date: string;
  time: string;
  type: string;
  location: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  observations?: string;
}

export interface AppointmentBooking {
  doctorId: string;
  date: string;
  time: string;
  type: string;
}

// Treatment Types
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

// Payment Types
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

// API Response Types
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

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'gestante' | 'rede_apoio';
  pregnantWeeks?: number;
}

export interface AuthResponse {
  user: User;
  token: string;
}
