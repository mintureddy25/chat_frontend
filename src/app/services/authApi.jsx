import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        userSignup: builder.mutation({
            query: (credentials) => ({
                url: '/api/auth/local/register',
                method: 'POST',
                body: credentials,
            }),
        }),
        userLogin: builder.mutation({
            query: (credentials) => ({
                url: '/api/auth/local',
                method: 'POST',
                body: credentials,
            }),
        }),
        

        }),
        overrideExisting: false,

    });

    export const {useUserLoginMutation, useUserSignupMutation} = authApi;