import type { Creator, Session } from "../entities";

const KEY = "cafezinho.session";
const listeners = new Set<() => void>();
let cache: Session | null | undefined;

function read(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "null");
  } catch {
    return null;
  }
}

function emit() {
  cache = read();
  listeners.forEach((l) => l());
}

export const sessionStore = {
  get(): Session | null {
    if (cache === undefined) cache = read();
    return cache;
  },
  set(session: Session) {
    localStorage.setItem(KEY, JSON.stringify(session));
    emit();
  },
  updateUser(user: Creator) {
    const current = sessionStore.get();
    if (current) sessionStore.set({ ...current, user });
  },
  clear() {
    localStorage.removeItem(KEY);
    emit();
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    const onStorage = (e: StorageEvent) => e.key === KEY && emit();
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  },
};
