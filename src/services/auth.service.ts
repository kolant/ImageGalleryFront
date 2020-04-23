import { AuthResponse } from "./../models/auth/auth-response";
import { SessionStorage } from "@/models/storages/session-storage-factory";
import { isNull } from "@/utils/utils";
import axios, { AxiosInstance } from "axios";

class AuthService implements IAuthenticationProvider {
    private baseUrl: string = "http://interview.agileengine.com/auth";
    private readonly SessionTokenKey = "auth_token";
    private http: AxiosInstance = null;

    constructor() {
        this.http = axios.create({
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        });
    }

    get token(): string {
        return SessionStorage.get(this.SessionTokenKey);
    }

    isLoggedIn(): boolean {
        return !isNull(SessionStorage.get(this.SessionTokenKey));
    }

    async logIn(): Promise<AuthResponse> {
        const data = { apiKey: "23567b218376f79d9415" };

        return this.http.post<any>("http://interview.agileengine.com/auth", data)
            .then((response: any) => {
                if (!isNull(response) && !isNull(response.data) && response.data.auth) {
                    SessionStorage.set(this.SessionTokenKey, response.data.token)
                }

                return response.data;
            })
            .catch((error: any) => {
                console.log(error);
            });
    }

    async logOut(): Promise<any> {
        SessionStorage.delete(this.SessionTokenKey);

        return Promise.resolve()
    }
}

export interface IAuthenticationProvider {
    logIn(): Promise<any>;
    logOut(): Promise<any>;
    isLoggedIn(): boolean;
    token: string;
}

export const authService = new AuthService();
