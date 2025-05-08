import { mainApi } from "./main";

export const privateAPI = mainApi
    .enhanceEndpoints({ addTagTypes: [] })
    .injectEndpoints({
        endpoints: (build) => ({})
    })