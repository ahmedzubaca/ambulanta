//import { apiClient } from "../api/api-client";
import { User } from "@prisma/client";
import { api } from "../api/api";
import { ROLE_NAMES, RoleName, API_ROUTES } from "../api/api-constants";


export const userService = {
    getUsersDetails: () => api.get<User>(API_ROUTES.users.me),
    getUserById: (userId: number) => api.get<User>(API_ROUTES.users.byId(userId)),
    getAllUsers: () => api.get<User[]>(API_ROUTES.users.all),
    updatePassword: (body: { password: string }) => api.put(API_ROUTES.users.updatePassword, body),
    uploadUserProfilePicture: (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        return api.put(API_ROUTES.users.profilePicture, formData, { 
            headers: { 
                'Content-Type': 'multipart/form-data'
            } 
        });
    },
    hasRole: (role: RoleName) =>
        api.get<{ roles: { name: string }[] }>(API_ROUTES.users.me).then(res => {
        const roles = res.roles?.map(r => r.name) || [];
        return roles.includes(role);
        }),
        
    isDoctor: () => userService.hasRole(ROLE_NAMES.DOCTOR),
    isPatient: () => userService.hasRole(ROLE_NAMES.PATIENT),
};


// export const userService = {

//     getAllUsers: () => {
//         return apiClient.get(API_ROUTES.users.all);
//     },

//     getUsersDetails: () => {
//         return apiClient.get(API_ROUTES.users.me);
//     },

//     getUserById: (userId: number) => {
//         return apiClient.get(API_ROUTES.users.byId(userId));
//     },

//     updatePassword: (password: string) => {
//         return apiClient.put(API_ROUTES.users.updatePassword, password);
//     },

//     uploadUserProfilePicture: (file: File) => {
//         const formData = new FormData();
//         formData.append('file', file);

//         return apiClient.put(API_ROUTES.users.profilePicture, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data'
//             }
//         });
//     }    
// }