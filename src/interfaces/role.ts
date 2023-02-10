import { type } from "os"

interface IRoles {
  ADMIN: string
  SUPER_ADMIN: string
  STAFF: string
  HEAD_OFFICE: string
}
export type Role = 'ADMIN' | 'SUPER_ADMIN'|"STAFF"|"HEAD_OFFICE";
export const ROLES :IRoles = {
  ADMIN: "ADMIN",
  SUPER_ADMIN: 'SUPER_ADMIN',
  STAFF: "STAFF",
  HEAD_OFFICE: "HEAD_OFFICE"
}
 