import axios from 'axios';
import type {
  ApiResponse,
  User,
  Doctor,
  Appointment,
  AppointmentBooking,
  Treatment,
  Payment,
  LoginCredentials,
  RegisterData,
  AuthResponse,
} from '@/types';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('eros_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('eros_token');
      localStorage.removeItem('eros_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await api.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
    return data.data;
  },

  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const { data } = await api.post<ApiResponse<AuthResponse>>('/auth/register', userData);
    return data.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
    localStorage.removeItem('eros_token');
    localStorage.removeItem('eros_user');
  },

  getCurrentUser: async (): Promise<User> => {
    const { data } = await api.get<ApiResponse<User>>('/auth/me');
    return data.data;
  },
};

// Doctors API
export const doctorsApi = {
  getAll: async (): Promise<Doctor[]> => {
    const { data } = await api.get<ApiResponse<Doctor[]>>('/doctors');
    return data.data;
  },

  getById: async (id: string): Promise<Doctor> => {
    const { data } = await api.get<ApiResponse<Doctor>>(`/doctors/${id}`);
    return data.data;
  },

  getAvailableSlots: async (doctorId: string, date: string): Promise<Doctor> => {
    const { data } = await api.get<ApiResponse<Doctor>>(
      `/doctors/${doctorId}/slots?date=${date}`
    );
    return data.data;
  },
};

// Appointments API
export const appointmentsApi = {
  getAll: async (): Promise<Appointment[]> => {
    const { data } = await api.get<ApiResponse<Appointment[]>>('/appointments');
    return data.data;
  },

  getById: async (id: string): Promise<Appointment> => {
    const { data } = await api.get<ApiResponse<Appointment>>(`/appointments/${id}`);
    return data.data;
  },

  create: async (booking: AppointmentBooking): Promise<Appointment> => {
    const { data } = await api.post<ApiResponse<Appointment>>('/appointments', booking);
    return data.data;
  },

  cancel: async (id: string): Promise<void> => {
    await api.delete(`/appointments/${id}`);
  },
};

// Treatments API
export const treatmentsApi = {
  getAll: async (): Promise<Treatment> => {
    const { data } = await api.get<ApiResponse<Treatment>>('/treatments');
    return data.data;
  },

  addMedication: async (medication: any): Promise<void> => {
    await api.post('/treatments/medications', medication);
  },

  addSupplement: async (supplement: any): Promise<void> => {
    await api.post('/treatments/supplements', supplement);
  },
};

// Payments API
export const paymentsApi = {
  getAll: async (): Promise<Payment[]> => {
    const { data } = await api.get<ApiResponse<Payment[]>>('/payments');
    return data.data;
  },

  create: async (appointmentId: string, method: string): Promise<Payment> => {
    const { data } = await api.post<ApiResponse<Payment>>('/payments', {
      appointmentId,
      method,
    });
    return data.data;
  },

  getById: async (id: string): Promise<Payment> => {
    const { data } = await api.get<ApiResponse<Payment>>(`/payments/${id}`);
    return data.data;
  },
};

export default api;
