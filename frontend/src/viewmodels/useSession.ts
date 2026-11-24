"use client";

import { useSyncExternalStore } from "react";
import { sessionStore } from "@/models/services/sessionStore";

export function useSession() {
  return useSyncExternalStore(sessionStore.subscribe, sessionStore.get, () => null);
}
