import { createAuthClient } from "better-auth/client";
export const authClient = createAuthClient({
  baseURL: process.env.BASE_URL as string,
});

authClient.signIn.social({
    provider: "google",
})
