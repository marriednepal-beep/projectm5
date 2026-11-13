"use client";
import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyB-P6GWyT-JU6UAKkRAazzVoIzcfNs91_g",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "marriednepal-282f5.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "marriednepal-282f5",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:629216705507:web:103dd25c806dd44ff6fed6",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "629216705507"
};
export const isConfigured = !!(config.apiKey && config.authDomain && config.projectId && config.appId);
let firebaseApp: FirebaseApp | null = null;
export let auth: Auth | null = null;
export let db: Firestore | null = null;
if (isConfigured && typeof window !== "undefined") {
  firebaseApp = getApps().length ? getApp() : initializeApp(config);
  auth = getAuth(firebaseApp);
  db = getFirestore(firebaseApp);
}
export function requireDb(): Firestore {
  if (!db) throw new Error("Online registration is temporarily unavailable. Please contact our office.");
  return db;
}
export function requireAuth(): Auth {
  if (!auth) throw new Error("Secure access is temporarily unavailable. Please try again or contact our office.");
  return auth;
}
