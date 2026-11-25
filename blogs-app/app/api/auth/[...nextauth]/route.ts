import { handlers } from "@/auth"
console.log("--- DEBUG AUTH CONFIG ---");
console.log("AUTH_SECRET exists:", !!process.env.AUTH_SECRET || !!process.env.NEXTAUTH_SECRET);
console.log("AUTH_URL / NEXTAUTH_URL:", process.env.AUTH_URL || process.env.NEXTAUTH_URL);
console.log("NODE_ENV:", process.env.NODE_ENV);

export const { GET, POST } = handlers