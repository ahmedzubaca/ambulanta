import { apiClient } from "../api/api-client";
import { Doctor } from "../types";
import { API_ROUTES } from "../api/api-constants";


export const doctorService = {
    getAllDoctors: () => {
        return apiClient.get(API_ROUTES.doctors.all); 
    },

    getDoctorProfile: () => {
        return apiClient.get(API_ROUTES.doctors.me)
    },

    updateDoctorPrifile: (body: Doctor) => {
        return apiClient.put(API_ROUTES.doctors.me, body);
    },
    
    getAllDoctorsSpecializations: () => {
        return apiClient.get(API_ROUTES.doctors.specializations);
    },

    searchDoctorsBySpecialization: (specialization: string) => {
        return apiClient.get(API_ROUTES.doctors.bySpecialization(specialization));
    }
}