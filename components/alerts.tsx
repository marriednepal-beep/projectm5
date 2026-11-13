"use client";
import Link from "next/link";
import {isConfigured} from "@/lib/firebase";
export function FirebaseNotice(){if(isConfigured)return null;return <div className="alert warning"><b>Firebase connection not yet configured.</b> Add the Firebase web app values to <code>.env.local</code> or Vercel's environment variables, then restart. See <code>README.md</code>.</div>}
export function AuthRequired(){return <div className="empty-state"><h2>Administrator access required</h2><p>Private registration records are available only to authorized office staff.</p><Link href="/login" className="btn btn-maroon">Staff sign in →</Link></div>}
export function FriendlyError({message}:{message:string}){return <div className="alert error" role="alert">{message.replace(/^Firebase: /,"").replace(/\(auth\/[^)]+\)\.?/,"").trim()||"Something went wrong. Please try again."}</div>}
