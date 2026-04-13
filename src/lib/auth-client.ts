import { createAuthClient } from "better-auth/react";
import { BACKEND_BASE_URL } from "@/constants";

// BACKEND_BASE_URL = "http://localhost:8000/api"
// better-auth endpoint'i: "http://localhost:8000/api/auth"
export const authClient = createAuthClient({
    baseURL: BACKEND_BASE_URL.replace("/api", ""),
    user: {
        additionalFields: {
            role: {
                type: "string" as const,
                required: true,
                defaultValue: "student",
                input: true,
            },
            imageCldPubId: {
                type: "string" as const,
                required: false,
                input: true,
            },
        },
    },
});