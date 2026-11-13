"use client";
import Link from "next/link";
import {isConfigured} from "@/lib/firebase";
export function FirebaseNotice(){if(isConfigured)return null;return <div className="alert warning" role="status">Our online services are temporarily unavailable. Please contact Married Nepal on <a href="https://wa.me/9779740850390" target="_blank" rel="noopener noreferrer">WhatsApp</a> for assistance.</div>}
export function AuthRequired(){return <div className="empty-state"><h2>Administrator access required</h2><p>Private registration records are available only to authorized office staff.</p><Link href="/login" className="btn btn-maroon">Staff sign in →</Link></div>}
export function FriendlyError({message}:{message:string}){
 const raw=message.toLowerCase();
 const technical=/(firebase|firestore|next_public|permission-denied|missing or insufficient permissions|failed-precondition|unauthenticated|\(auth\/|\(firestore\/|network-request-failed)/.test(raw);
 const safe=technical?"We couldn't complete that request. Please try again or contact Married Nepal support.":message.replace(/^Error: /," ").trim();
 return <div className="alert error" role="alert">{safe||"Something went wrong. Please try again."}</div>
}
