import { customBaseQuery } from "@/redux/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

// initialize an empty api service that we'll inject endpoints into later as needed
export const mainApi = createApi({
    reducerPath: "privateAPI",
    baseQuery: customBaseQuery(),
    endpoints: () => ({}),
    keepUnusedDataFor: 1,
    tagTypes: []
});