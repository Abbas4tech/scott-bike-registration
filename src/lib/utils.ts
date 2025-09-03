import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const BASE_URL = "/api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
