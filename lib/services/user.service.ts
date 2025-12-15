import { apiClient } from "../api/api-client";
import { API_ROUTES } from "../api/api-constants";


export const userService = {

    getAllUsers: () => {
        return apiClient.get(API_ROUTES.users.all);
    },

    getUsersDetails: () => {
        return apiClient.get(API_ROUTES.users.me);
    },

    getUserById: (userId: number) => {
        return apiClient.get(API_ROUTES.users.byId(userId));
    },

    updatePassword: (password: string) => {
        return apiClient.put(API_ROUTES.users.updatePassword, password);
    },

    uploadUserProfilePicture: (file: File) => {
        const formData = new FormData();
        formData.append('file', file);

        return apiClient.put(API_ROUTES.users.profilePicture, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }    
}