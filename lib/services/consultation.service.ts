//import { apiClient } from "../api/api-client";
import { api } from "../api/api";
import { Consultation} from "../types";
import { API_ROUTES } from "../api/api-constants";

export const consultationService = {
    getAllConsultations: () => api.get<Consultation[]>(API_ROUTES.consultations.all),
    createConsultation: (consultationDTO: Consultation) => api.post(API_ROUTES.consultations.all, consultationDTO),
    getConsultationByAppointmentId: (appointmentId: number) =>
        api.get<Consultation>(API_ROUTES.consultations.byAppointmentId(appointmentId)),
    getConsultationByPatientId: (patientId: number) =>
        api.get<Consultation[]>(API_ROUTES.consultations.byPatientId(patientId)),
    getMyConsultationHistory: () => api.get<Consultation[]>(API_ROUTES.consultations.myHistory),
};


// export const consultationService = {

//     getAllConsultations: () => {
//         return apiClient.get(API_ROUTES.consultations.all)
//     },

//     createConsultation: (consultationDTO: Consultation) => {
//         return apiClient.post(API_ROUTES.consultations.all, consultationDTO);
//     },

//     getConsultationByAppointmentId: (appointmentId: number) => {
//         return apiClient.get(API_ROUTES.consultations.byAppointmentId(appointmentId));
//     },
    
//     getConsultationBPatientId: (patientId: number) => {
//         return apiClient.get(API_ROUTES.consultations.byPatientId(patientId));
//     },

//     getMyConsultationHistory: () => {
//         return apiClient.get(API_ROUTES.consultations.myHistory);
//     }
// }


