import { initAuth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

const auth = await initAuth();

export const { POST, GET } = toNextJsHandler(auth);