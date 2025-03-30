import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isIos() {
  return (
    /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase())
  )
}

export function isStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches
}