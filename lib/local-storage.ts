import secureLocalStorage from "react-secure-storage";

export const authTokens = {
    access_token: secureLocalStorage.getItem('access_token'),
    refresh_token: secureLocalStorage.getItem('refresh_token')
}

export function clearAuthTokens() {
    secureLocalStorage.removeItem('access_token');
    secureLocalStorage.removeItem('refresh_token');
}