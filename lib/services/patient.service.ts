import { apiClient } from "../api/api-client";
import { API_ROUTES } from "../api/api-constants";
import { Patient } from "../types";


export const patientService = {
    getAllPatients: () => {
        return apiClient.get(API_ROUTES.patients.all);
    },

    getPatientProfile: () => {
        return apiClient.get(API_ROUTES.patients.me);
    },

    updatePatientProfile: (body: Patient) => {
        return apiClient.put(API_ROUTES.patients.me, body);
    },

    getPatientById: (patientId: number) => {
        return apiClient.get(API_ROUTES.patients.byId(patientId));
    },

    getPatientsGenotypes: () => {
        return apiClient.get(API_ROUTES.patients.genotypes);
    },

    getPatientsBlooGroups: () => {
        return apiClient.get(API_ROUTES.patients.bloodGroups);
    }
}