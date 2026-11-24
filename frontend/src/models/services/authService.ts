import type { Session } from "../entities";
import { http } from "./httpClient";
import { sessionStore } from "./sessionStore";

export const authService = {
  async register(payload: unknown) {
    const session = await http<Session>("/auth/register", { method: "POST", body: payload });
    sessionStore.set(session);
    return session;
  },
  async login(email: string, password: string) {
    const session = await http<Session>("/auth/login", { method: "POST", body: { email, password } });
    sessionStore.set(session);
    return session;
  },
  logout() {
    sessionStore.clear();
  },
};
