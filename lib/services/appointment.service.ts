//import { apiClient } from "../api/api-client";
import { api } from "../api/api";
import { Appointment } from "../types";
import { API_ROUTES } from "../api/api-constants";

export const appointmentService = {
    bookAppointment: (appointmentDTO: Appointment) => api.post(API_ROUTES.appointments.all, appointmentDTO),
    getAllAppointments: () => api.get<Appointment[]>(API_ROUTES.appointments.all),
    cancelAppointment: (appointmentId: number) => api.delete(API_ROUTES.appointments.cancel(appointmentId)),
    completeAppointment: (appointmentId: number) => api.put(API_ROUTES.appointments.complete(appointmentId)),
    getAppointmentById: (appointmentId: number) => api.get<Appointment>(API_ROUTES.appointments.byId(appointmentId)),
};


// export const appointmentService = {

//     bookAppointment: (apointmentDTO: Appointment) => {
//         apiClient.post(API_ROUTES.appointments.all, apointmentDTO);
//     },

//     getAllApointments: () => {
//         return apiClient.get(API_ROUTES.appointments.all);
//     },

//     cancelAppointment: (appointmentId: number) => {
//         return apiClient.delete(API_ROUTES.appointments.cancel(appointmentId));
//     },

//     completeAppointment: (appointmentId: number) => {
//         return apiClient.put(API_ROUTES.appointments.complete(appointmentId));
//     },

//     getAppointmentById: (appointmentId: number) => {
//         return apiClient.get(API_ROUTES.appointments.byId(appointmentId))
//     }
// }