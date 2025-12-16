import { api } from "../api/api";
//import { apiClient } from "../api/api-client";
//import { Role } from "@prisma/client";
//import { ROLE_NAMES, RoleName, API_ROUTES } from "../api/api-constants";
import { API_ROUTES } from "../api/api-constants";
import { LoginRequest, RegistrationRequest } from "../types";


export const authService = {
    login: (body: LoginRequest) => api.post(API_ROUTES.auth.login, body),
    register: (body: RegistrationRequest) => api.post(API_ROUTES.auth.register, body),
    logout: () => api.post(API_ROUTES.auth.logout),
    forgotPassword: (body: { email: string }) => api.post(API_ROUTES.auth.forgotPassword, body),
    resetPassword: (body: { token: string; password: string }) => api.post(API_ROUTES.auth.resetPassword, body),

    isAuthenticated: async (): Promise<boolean> => {
        try {
          await api.get(API_ROUTES.users.me); 
          return true; 
        } catch (error) {
          void error;
          return false; 
        }
    },
};

// export const authService = {
//     isAuthenticated: async (): Promise<boolean> => {
//         try{
//             await apiClient.get(API_ROUTES.users.me);
//             return true;

//         }catch (error) {
//             console.error('Error checking user:', error);
//             return false;       
//         }
//     },

//     hasRole: async (role: RoleName): Promise<boolean> => {
//         try{
//             const user = await apiClient.get(API_ROUTES.users.me);            
//             const userRoles = user?.data?.data?.roles?.map((r: Role) => r.name) ?? [];
//             return userRoles.includes(role);

//         }catch (error) {
//             console.error('Error checking role:', error);
//             return false;       
//         }
//     },

//     isDoctor: () => {
//         return authService.hasRole(ROLE_NAMES.DOCTOR);
//     },

//     isPatient: () => {
//         return authService.hasRole(ROLE_NAMES.PATIENT);
//     },

//     login: (body: LoginRequest) => {
//         return apiClient.post(API_ROUTES.auth.login, body);
//     },

//     register: (body: RegistrationRequest) => {
//         return apiClient.post(API_ROUTES.auth.register, body);
//     },

//     logout: () => {
//         return apiClient.post(API_ROUTES.auth.logout);
//     },

//     forgotPassword: (body: LoginRequest) => {
//         return apiClient.post(API_ROUTES.auth.forgotPassword, body)
//     },

//     resetPassword: (body: LoginRequest) => {
//         return apiClient.post(API_ROUTES.auth.resetPassword, body);
//     }    
// }