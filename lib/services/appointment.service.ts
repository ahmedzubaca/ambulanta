import { apiClient } from "../api/api-client";
import { Appointment } from "../types";
import { API_ROUTES } from "../api/api-constants";


export const appointmentService = {

    bookAppointment: (apointmentDTO: Appointment) => {
        apiClient.post(API_ROUTES.appointments.all, apointmentDTO);
    },

    getAllApointments: () => {
        return apiClient.get(API_ROUTES.appointments.all);
    },

    cancelAppointment: (appointmentId: number) => {
        return apiClient.delete(API_ROUTES.appointments.cancel(appointmentId));
    },

    completeAppointment: (appointmentId: number) => {
        return apiClient.put(API_ROUTES.appointments.complete(appointmentId));
    },

    getAppointmentById: (appointmentId: number) => {
        return apiClient.get(API_ROUTES.appointments.byId(appointmentId))
    }
}