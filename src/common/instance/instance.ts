import axios from "axios";

const token = "ce2a389c-959e-4f19-a632-2c55ee336c57"
const apiKey = "7bfe4383-41a9-4115-811b-1d150babe2b6"

export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    headers: {
        Authorization: `Bearer ${token}`,
        "API-KEY": apiKey
    }
})