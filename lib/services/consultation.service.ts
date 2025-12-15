import { apiClient } from "../api/api-client";
import { Consultation} from "../types";
import { API_ROUTES } from "../api/api-constants";


export const consultationService = {

    getAllConsultations: () => {
        return apiClient.get(API_ROUTES.consultations.all)
    },

    createConsultation: (consultationDTO: Consultation) => {
        return apiClient.post(API_ROUTES.consultations.all, consultationDTO);
    },

    getConsultationByAppointmentId: (appointmentId: number) => {
        return apiClient.get(API_ROUTES.consultations.byAppointmentId(appointmentId));
    },
    
    getConsultationBPatientId: (patientId: number) => {
        return apiClient.get(API_ROUTES.consultations.byPatientId(patientId));
    },

    getMyConsultationHistory: () => {
        return apiClient.get(API_ROUTES.consultations.myHistory);
    }
}


