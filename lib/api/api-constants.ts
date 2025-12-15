export const ROLE_NAMES_ARRAY = ['PATIENT', 'DOCTOR', 'ADMIN'] as const;
export type RoleName = typeof ROLE_NAMES_ARRAY[number];
export const ROLE_NAMES: Record<RoleName, RoleName> = Object.fromEntries(
  ROLE_NAMES_ARRAY.map((r) => [r, r])
) as Record<RoleName, RoleName>;

export const API_BASE_URL = '/api'
export const API_ROUTES = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
  },

  users: {
    all: '/users',
    me: '/users/me',
    byId: (id: number) =>
      `/users/${id}`,
    updatePassword: '/users/update-password',
    profilePicture: '/users/profile-picture',
  },

  patients: {
    all: '/patients',
    me: '/patients/me',
    byId: (id: number) =>
      `/patients/${id}`,
    genotypes: '/patients/genotypes',
    bloodGroups: '/patients/bloodgroup',
  },

  doctors: {
    all: '/doctors',
    me: '/doctors/me',
    specializations: '/doctors/specializations',
    bySpecialization: (specialization: string) =>
      `/doctors/filter?specialization=${specialization}`,
  },

  appointments: {
    all: '/appointments',
    byId: (id: number) => `/appointments/${id}`,
    cancel: (id: number) => `/appointments/cancel/${id}`,    
    complete: (id: number) => `/appointments/complete/${id}`,
  },

  consultations: {
    all: '/consultations',
    byAppointmentId: (id:number) => `/consultations/appointment/${id}`,
    byPatientId: (id:number) => `/consultations/appointment/${id}`,
    myHistory: '/consultations/history',
  },
} as const;


