"use client";
import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
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
  if (!db) throw new Error("Firebase is not configured. Add NEXT_PUBLIC_FIREBASE_* variables in Vercel Project Settings.");
  return db;
}
export function requireAuth(): Auth {
  if (!auth) throw new Error("Firebase Authentication is not configured.");
  return auth;
}
