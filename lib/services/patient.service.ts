//import { apiClient } from "../api/api-client";
import { api } from "../api/api";
import { API_ROUTES } from "../api/api-constants";
import { Patient } from "../types";

export const patientService = {
    getAllPatients: () => api.get<Patient[]>(API_ROUTES.patients.all),
    getPatientProfile: () => api.get<Patient>(API_ROUTES.patients.me),
    updatePatientProfile: (body: Patient) => api.put(API_ROUTES.patients.me, body),
    getPatientById: (patientId: number) => api.get<Patient>(API_ROUTES.patients.byId(patientId)),
    getPatientsGenotypes: () => api.get<string[]>(API_ROUTES.patients.genotypes),
    getPatientsBloodGroups: () => api.get<string[]>(API_ROUTES.patients.bloodGroups),
};


// export const patientService = {
//     getAllPatients: () => {
//         return apiClient.get(API_ROUTES.patients.all);
//     },

//     getPatientProfile: () => {
//         return apiClient.get(API_ROUTES.patients.me);
//     },

//     updatePatientProfile: (body: Patient) => {
//         return apiClient.put(API_ROUTES.patients.me, body);
//     },

//     getPatientById: (patientId: number) => {
//         return apiClient.get(API_ROUTES.patients.byId(patientId));
//     },

//     getPatientsGenotypes: () => {
//         return apiClient.get(API_ROUTES.patients.genotypes);
//     },

//     getPatientsBlooGroups: () => {
//         return apiClient.get(API_ROUTES.patients.bloodGroups);
//     }
// }