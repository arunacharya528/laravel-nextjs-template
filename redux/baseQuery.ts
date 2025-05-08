import { authTokens, clearAuthTokens } from "@/lib/local-storage";
import { BaseQueryApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";

const customFetchBaseQuery = fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api`,
    prepareHeaders: (headers) => {
        if (authTokens.access_token) {
            headers?.set("Authorization", `Bearer ${authTokens.access_token}`);
            headers?.set("Accept", "application/json");
            headers?.set("Content-Type", "application/json");

            return headers;
        } else {
            headers?.set("Accept", "application/json");
            headers?.set("Content-Type", "application/json");
        }
    },
});

export const customBaseQuery = () => {
    return async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
        let result = await customFetchBaseQuery(args, api, extraOptions);

        if (result.error) {
            // @ts-ignore
            let errorMessage = result?.error?.data?.message;
            toast.error(errorMessage)
            if (result?.error?.status === 401) {
                toast.error(errorMessage);
                clearAuthTokens();
                window.location.replace("/login");
            }
            return result;
        }

        const isMutationRequest = ["post", "put", "delete"].includes(String(result.meta?.request.method).toLowerCase().trim());
        if (isMutationRequest) {
            // @ts-ignore
            toast.success(result.data.message)
        }
    
        return result;
    };
};