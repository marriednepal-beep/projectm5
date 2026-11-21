"use client";
import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

/**
 * Pin this deployment to the existing Married Nepal Firebase project.
 * Do not allow stale Vercel NEXT_PUBLIC_* overrides to silently point this
 * custom domain at another Firebase project/API key.
 */
const config = {
  apiKey: "AIzaSyB-P6GWyT-JU6UAKkRAazzVoIzcfNs91_g",
  authDomain: "marriednepal-282f5.firebaseapp.com",
  projectId: "marriednepal-282f5",
  storageBucket: "marriednepal-282f5.firebasestorage.app",
  messagingSenderId: "629216705507",
  appId: "1:629216705507:web:103dd25c806dd44ff6fed6",
};

export const isConfigured = true;
const APP_NAME = "married-nepal-production";
let firebaseApp: FirebaseApp | null = null;
export let auth: Auth | null = null;
export let db: Firestore | null = null;

if (typeof window !== "undefined") {
  firebaseApp =
    getApps().find((app) => app.name === APP_NAME) ??
    initializeApp(config, APP_NAME);
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
