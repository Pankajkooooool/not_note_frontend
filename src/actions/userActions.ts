/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from '../config/axios';

export type UserDetailsType = {
    fName: string,
    lName?: string,
    password?: string,
    email?: string
}

export type LoginType = {
    email: string,
    password: string
}

export const register = async (userDetails: UserDetailsType) => {
    try {
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        const response = await axios.post("/auth/register", userDetails, config);
        return response
    } catch (error) {
        throw error
    }
}
export const login = async (formData: LoginType) => {
    try {
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        const response=  await axios.post("/auth/login", formData, config)
        return response;
    } catch (error: any) {
        throw error;
    }
};

export const compareOtp = async (id: any, otp:string|number) => {
    try {
        const data = {
            userId:id,
            otp
        }
        const response= await axios.post("/auth/fetch-otp", data)
        return response
    } catch (error) {
        throw error
    }
}

