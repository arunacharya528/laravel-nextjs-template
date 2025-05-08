"use server"

import { User } from "@/types/user";

export async function authenticate(email: string, password: string) {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "grant_type": "password",
        "client_id": process.env.API_CLIENT_ID,
        "client_secret": process.env.API_CLIENT_SECRET,
        "username": email,
        "password": password,
        "scope": "*"
    });

    return fetch(`${process.env.API_URL}/oauth/token`,
        {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        })
        .then(async (response) => {
            const data: {
                success: boolean,
                message: string,
                data?: {
                    message?: string,
                    access_token?: string,
                    refresh_token?: string
                }
            } = {
                "success": true,
                "message": "",
            };

            const json = await response.json();

            const authenticationIsSuccess = (response.status >= 200 && response.status < 300);
            if (!authenticationIsSuccess) {
                data["success"] = false;
                data["message"] = json.message;
            } else {
                data["message"] = "Successfully authenticated";
                data["data"] = json;
            }

            return data;
        })
}

export async function getAuthUser(access_token: string): Promise<User> {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${access_token}`);

    return fetch(`${process.env.API_URL}/api/user`, {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    }).then(async (response: Response) => {
        const json: User = await response.json()

        return json;
    })
}