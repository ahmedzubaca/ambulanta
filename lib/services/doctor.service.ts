//import { apiClient } from "../api/api-client";
import { api } from "../api/api";
import { Doctor } from "../types";
import { API_ROUTES } from "../api/api-constants";


export const doctorService = {
    getAllDoctors: () => api.get<Doctor[]>(API_ROUTES.doctors.all),
    getDoctorProfile: () => api.get<Doctor>(API_ROUTES.doctors.me),
    updateDoctorProfile: (body: Doctor) => api.put(API_ROUTES.doctors.me, body),
    getAllDoctorsSpecializations: () => api.get<string[]>(API_ROUTES.doctors.specializations),
    searchDoctorsBySpecialization: (specialization: string) =>
        api.get<Doctor[]>(API_ROUTES.doctors.bySpecialization(specialization)),
};


// export const doctorService = {
//     getAllDoctors: () => {
//         return apiClient.get(API_ROUTES.doctors.all); 
//     },

//     getDoctorProfile: () => {
//         return apiClient.get(API_ROUTES.doctors.me)
//     },

//     updateDoctorPrifile: (body: Doctor) => {
//         return apiClient.put(API_ROUTES.doctors.me, body);
//     },
    
//     getAllDoctorsSpecializations: () => {
//         return apiClient.get(API_ROUTES.doctors.specializations);
//     },

//     searchDoctorsBySpecialization: (specialization: string) => {
//         return apiClient.get(API_ROUTES.doctors.bySpecialization(specialization));
//     }
// }